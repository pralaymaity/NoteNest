
require('./src/config/db.config')

const express = require('express');
const cors = require('cors');
const authRoute = require("./src/routes/authRoute");
const noteRoute = require("./src/routes/noteRoutes")

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse the frontend form data
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
  res.send('Hello from backend!!');
});


app.use("/api" , authRoute);
app.use("/api" , noteRoute);




app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} port`);
});
