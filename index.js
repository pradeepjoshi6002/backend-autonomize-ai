const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db/sequelize");

const PORT = process.env.PORT || 4004;

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

sequelize
  .sync()
  .then(() => {
    console.log("db connected");
    http.createServer(app).listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error connecting to the database"));
