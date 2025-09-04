const noteService = require("../service/noteService");

exports.createNote = async (req, res) => {
  try {
    const { title, content, tags, isArchived } = req.body;
    const ownerId = req.user.id;

    const imagePaths = req.files["images"]?.map((file) => file.path) || [];
    const filePaths = req.files["files"]?.map((file) => file.path) || [];

    const note = await noteService.createNote({
      title,
      content,
      ownerId,
      tags: tags ? JSON.parse(tags) : [],
      isArchived,
      imagePaths,
      filePaths,
    });

    res.status(201).json({ message: "Note created", note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating note" });
  }
};

exports.getAllNotes = async (req, res) => {
  const notes = await noteService.getAllNotes();
  res.json(notes);
};

exports.getNoteById = async (req, res) => {
  const note = await noteService.getNoteById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
};

exports.getNotesByUser = async (req, res) => {
  const ownerId = req.params.userId;

  try {
    const notes = await noteService.getNotesByUser(ownerId);

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No notes found for this user." });
    }

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content, tags, isArchived } = req.body;
    const id = req.params.id;
    const userId = req.user.id; // 👈 from JWT middleware

    // Fetch existing note first
    const existingNote = await noteService.getNoteById(id);
    if (!existingNote) return res.status(404).json({ message: "Note not found" });

    // If new uploads exist, take them; otherwise keep old
    const imagePaths = req.files?.["images"]
      ? req.files["images"].map((file) => file.path)
      : existingNote.imagePaths;

    const filePaths = req.files?.["files"]
      ? req.files["files"].map((file) => file.path)
      : existingNote.filePaths;

    const updated = await noteService.updateNote(id, userId, {
      title,
      content,
      tags: tags ? JSON.parse(tags) : existingNote.tags,
      isArchived,
      imagePaths,
      filePaths,
    });

    res.json({ message: "Note updated", updated });
  } catch (err) {
    console.error("Update note error:", err);
    res.status(403).json({ message: err.message }); // 403 for permission issues
  }
};


exports.deleteNote = async (req, res) => {
  const deleted = await noteService.deleteNote(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Note not found" });

  res.json({ message: "Note deleted" });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await noteService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.shareNote = async (req, res) => {
  try {
    const { users } = req.body; // [{ userId, type }]
    const noteId = req.params.id;

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const result = await noteService.shareNote({ noteId, users });
    res.json(result);
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 400;
    res.status(status).json({ error: error.message });
  }
};

