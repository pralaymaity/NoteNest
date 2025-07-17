const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Permission = sequelize.define("Permission", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM("read", "write"),
    allowNull: false,
  },
});

module.exports = Permission;
