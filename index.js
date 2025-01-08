const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db/sequelize");
const userRoutes = require("./routers/userRoutes");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./swagger.yaml");

const PORT = process.env.PORT || 4004;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));

app.use("/users", userRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("db connected");
    http.createServer(app).listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error connecting to the database"));
