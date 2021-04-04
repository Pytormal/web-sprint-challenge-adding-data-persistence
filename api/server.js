// build your server here and require it from index.js
const express = require("express");
const helmet = require('helmet');


const server = express();
// const pRouter = require("./project/router.js");
// const rRouter = require("./resource/router.js");
// const tRouter = require("./task/router.js");

server.use(helmet());
server.use(express.json());
// server.use("/api/project", pRouter);
// server.use("/api/resource", rRouter);
// server.use("/api/task", tRouter);

server.get("/", (req, res) => {
  res.json({ hello: "Sprint Project 4.2" });
});

module.exports = server;