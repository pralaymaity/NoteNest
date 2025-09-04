const Note = require("../models/note");
const User = require("../models/authUser");
const Permission = require("../models/permission");

exports.createNote = async (data) => {
  return await Note.create(data);
};

exports.getAllNotes = async () => {
  return await Note.findAll();
};

exports.getNoteById = async (id) => {
  return await Note.findByPk(id);
};

exports.getNotesByUser = async (ownerId) => {

  const ownedNotes = await Note.findAll({
    where: { ownerId: ownerId },
  });

  // Notes shared with the user
  const sharedNotes = await Note.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"], // info about sharer
        through: { attributes: ["type"] },   // include read/write from Permission
        where: { id: ownerId },              // filter: shared to this user
      },
    ],
  });

  return [...ownedNotes, ...sharedNotes];
};

exports.updateNote = async (noteId, userId, updateData) => {
  const note = await Note.findByPk(noteId);
  if (!note) throw new Error("Note not found");

  // Owner can always edit
  if (note.ownerId !== userId) {
    // Check permission for shared users
    const permission = await Permission.findOne({
      where: { NoteId: noteId, UserId: userId },
    });

    if (!permission) throw new Error("Access denied");
    if (permission.type !== "write") throw new Error("Read-only access");
  }

  // If no images/files are sent, retain old data
  updateData.imagePaths = updateData.imagePaths || note.imagePaths;
  updateData.filePaths = updateData.filePaths || note.filePaths;

  return await note.update(updateData);
};

exports.deleteNote = async (id) => {
  const note = await Note.findByPk(id);
  if (!note) return null;
  return await note.destroy();
};

exports.getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ["id", "name", "email"],
  });
  return users;
};

exports.shareNote = async ({ noteId, users }) => {
  const note = await Note.findByPk(noteId);
  if (!note) throw new Error("Note not found");

  const results = [];
  for (const { userId, type } of users) {
    if (!userId || !["read", "write"].includes(type)) {
      throw new Error("Invalid input");
    }

    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    const shared = await Permission.upsert({
      UserId: userId,
      NoteId: note.id,
      type,
    });
    results.push(shared);
  }

  return { message: "Note shared successfully", count: results.length };
};
