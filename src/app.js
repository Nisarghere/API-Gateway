const cors = require("cors");
const express = require("express");
const authRouter = require("./routes/auth.route");
const apiRouter = require("./routes/api.route");
const cookieParser = require("cookie-parser");
const counsumerRouter = require("./routes/consumer.route");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use("/api", counsumerRouter);

module.exports = app;
