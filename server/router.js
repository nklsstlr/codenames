const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

var niklas = {id:1,name:"Niklas 1"};
var antony = {id:2,name:"Antony 2"};
let users = [niklas,antony];
router.get("/users",(req,res) => {
res.send({response: users});
})

module.exports = router;