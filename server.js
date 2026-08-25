require("dotenv").config();

const express = require("express");
const app = require("./src/app");
const connectDb = require("./src/db/db");

const { apiReference } = require("@scalar/express-api-reference");

connectDb();

app.use(express.static(__dirname));

app.use("/docs",apiReference({
  spec: {
      url: "/api/6a835760362c8ed3b3f35f1e/openapi",
    },
  }),
);

app.listen(5000, () => {
  console.log("app is listening on port 5000...");
});
