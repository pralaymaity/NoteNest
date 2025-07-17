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
  return await Note.findAll({
    where: { ownerId },
    order: [['createdAt', 'DESC']], // optional: newest first
  });
};


exports.updateNote = async (id, updateData) => {
  const note = await Note.findByPk(id);
  if (!note) return null;

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

exports.shareNote = async ({ noteId, userId, type }) => {

  const note = await Note.findByPk(noteId);

  if (!note) throw new Error("Note not found");

  if (!userId || !["read", "write"].includes(type)) {
    throw new Error("Invalid input");
  }

  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  await Permission.upsert({ UserId: userId, NoteId: note.id, type });
  return { message: "Note shared successfully" };
};
