require("dotenv").config();

const express = require("express");
const app = require("./src/app");
const connectDb = require("./src/db/db");

const { apiReference } = require("@scalar/express-api-reference");

connectDb();

app.use(express.static(__dirname));

 
const PORT = process.env.PORT || 5000

app.listen(5000, () => {
  console.log(`app is listening on port ${PORT}...`);
});
