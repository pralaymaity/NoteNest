
require('./src/config/db.config')

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend!!');
});

const authRoute = require("./src/routes/auth.route")

app.use("/api" , authRoute);




app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} port`);
});
