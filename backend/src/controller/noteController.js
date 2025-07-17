const noteService = require("../service/noteService");

exports.createNote = async (req, res) => {
  try {
    const { title, content, ownerId, tags, isArchived  } = req.body;

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
  const { title, content, tags, isArchived } = req.body;

  const imagePaths = req.files["images"]?.map((file) => file.path) || [];
  const filePaths = req.files["files"]?.map((file) => file.path) || [];

  const updated = await noteService.updateNote(req.params.id, {
    title,
    content,
    tags: tags ? JSON.parse(tags) : [],
    isArchived,
    imagePaths,
    filePaths,
  });

  if (!updated) return res.status(404).json({ message: "Note not found" });

  res.json({ message: "Note updated", updated });
};

exports.deleteNote = async (req, res) => {
  const deleted = await noteService.deleteNote(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Note not found" });

  res.json({ message: "Note deleted" });
};

exports.shareNote = async (req, res) => {
  try {
    const result = await noteService.shareNote({
      noteId: req.params.id,
      userId: req.body.userId,
      type: req.body.type
    });
    res.json(result);
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 400;
    res.status(status).json({ error: error.message });
  }
};

