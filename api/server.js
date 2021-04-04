// build your server here and require it from index.js
const express = require("express");
const helmet = require('helmet');


const server = express();
const pRouter = require("./project/router.js");
const rRouter = require("./resource/router.js");
const tRouter = require("./task/router.js");

server.use(helmet());
server.use(express.json());
server.use("/api/projects", pRouter);
server.use("/api/resources", rRouter);
server.use("/api/tasks", tRouter);

server.get("/", (req, res) => {
  res.json({ hello: "Sprint Project 4.2" });
});

module.exports = server;