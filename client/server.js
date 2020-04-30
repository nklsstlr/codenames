const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

const distPath = path.join(__dirname, "dist");
// the __dirname is the current directory from where the script is running
app.use(express.static(distPath));

// app.get("/ping", function (req, res) {
//   return res.send("pong");
// });
app.get("*", function (req, res) {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port);
