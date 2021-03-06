const express = require("express");
const router = express.Router();

const { getUsers } = require("./users");

router.get("/api", (req, res) => {
  res.send({ response: "API is up and running." }).status(200);
});

var niklas = { id: 1, name: "Niklas 3" };
var antony = { id: 2, name: "Antony 4" };
let users = [niklas, antony];
router.get("/users", (req, res) => {
  res.send({ response: getUsers() });
});

module.exports = router;
