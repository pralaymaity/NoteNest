const noteService = require("../service/noteService");

exports.createNote = async (req, res) => {
  try {
    const { title, content, ownerId, tags } = req.body;

    const imagePaths = req.files["images"]?.map((file) => file.path) || [];
    const filePaths = req.files["files"]?.map((file) => file.path) || [];

    const note = await noteService.createNote({
      title,
      content,
      ownerId,
      tags: tags ? JSON.parse(tags) : [],
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

exports.updateNote = async (req, res) => {
  const { title, content, tags } = req.body;

  const imagePaths = req.files["images"]?.map((file) => file.path) || [];
  const filePaths = req.files["files"]?.map((file) => file.path) || [];

  const updated = await noteService.updateNote(req.params.id, {
    title,
    content,
    tags: tags ? JSON.parse(tags) : [],
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
