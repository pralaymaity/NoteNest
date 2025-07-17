const User = require("../models/authUser");
const Note = require("../models/note");
const Permission = require("../models/permission")

User.hasMany(Note, { foreignKey: "ownerId" });
Note.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

// permission 
User.belongsToMany(Note, { through: Permission });
Note.belongsToMany(User, { through: Permission });

module.exports = { User, Note, Permission };