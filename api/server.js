// build your server here and require it from index.js
const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ hello: "Sprint Project 4.2" });
});

module.exports = server;
