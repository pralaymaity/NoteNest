const sequelize = require("./sequelize");
require("../models/authUser");
require("../models/note");

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
