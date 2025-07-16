const Note = require("../models/note");

exports.createNote = async (data) => {
  return await Note.create(data);
};

exports.getAllNotes = async () => {
  return await Note.findAll();
};

exports.getNoteById = async (id) => {
  return await Note.findByPk(id);
};

exports.updateNote = async (id, updateData) => {
  const note = await Note.findByPk(id);
  if (!note) return null;
  return await note.update(updateData);
};

exports.deleteNote = async (id) => {
  const note = await Note.findByPk(id);
  if (!note) return null;
  return await note.destroy();
};
