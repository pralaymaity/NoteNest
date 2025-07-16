const User = require("../models/authUser");
const Note = require("../models/note");

User.hasMany(Note, { foreignKey: "ownerId" });
Note.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

module.exports = { User, Note };