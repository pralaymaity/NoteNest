// models/Note.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Note = sequelize.define("Note", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users", // Your user table name
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  isArchived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  imagePaths: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  filePaths: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

module.exports = Note;
