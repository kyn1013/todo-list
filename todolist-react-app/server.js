const jsonServer = require("json-server");
const app = jsonServer.create();
const path = require("path");
const express = require("express");
const middlewares = jsonServer.defaults();
const router = jsonServer.router("src/db/data.json");

app.use("/api", middlewares, router);
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(3000);
console.log(`Start server with port 3000`);