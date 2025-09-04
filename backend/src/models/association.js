const User = require("../models/authUser");
const Note = require("../models/note");
const Permission = require("../models/permission");

User.hasMany(Note, { foreignKey: "ownerId" });
Note.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

// User ↔ Note (sharing via Permission)
User.belongsToMany(Note, {
  through: Permission,
  foreignKey: "UserId", // column in Permission
  otherKey: "NoteId", // column in Permission
});

Note.belongsToMany(User, {
  through: Permission,
  foreignKey: "NoteId", // column in Permission
  otherKey: "UserId", // column in Permission
});

module.exports = { User, Note, Permission };
