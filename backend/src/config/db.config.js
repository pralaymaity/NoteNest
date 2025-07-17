const sequelize = require("./sequelize");
const { User, Note, Permission } = require("../models/association"); 

(async function () {
  try {
    await sequelize.authenticate();
    console.log("✅ Database created successfully");

    // Sync all models with defined associations
    await sequelize.sync({ alter: true });
    console.log("✅ All models synced successfully.");

  } catch (err) {
    console.log("❌ Database connection failed", err);
  }

})();
