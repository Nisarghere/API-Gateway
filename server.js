require("dotenv").config();

const express = require("express");
const app = require("./src/app");
const connectDb = require("./src/db/db");

const { apiReference } = require("@scalar/express-api-reference");

connectDb();

app.use(express.static(__dirname));

// app.get('/docs/:apiId', (req, res, next)=>{
//   const apiId = req.params.apiId

//   apiReference({
//     spec:{
//       url:`/api/openapi/${apiId}`
//     }
//   })(req, res, next);
// })

app.listen(5000, () => {
  console.log("app is listening on port 5000...");
});
