const express = require("express");
const path = require("path");
const auth = require("basic-auth");

const app = express();
const PORT = 3000;

const users = {
  friend1: "password1",
  friend2: "password2",
  friend3: "password3",
};

const authenticate = (req, res, next) => {
  const credentials = auth(req);
  if (!credentials || users[credentials.name] !== credentials.pass) {
    res.status(401).send("Access denied");
  } else {
    next();
  }
};

app.use(authenticate);
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
});
