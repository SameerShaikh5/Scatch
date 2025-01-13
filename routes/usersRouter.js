const express = require("express");
const app = express();
const router = express.Router();
const {registerUser, loginUser, logoutUser} = require('../controller/authController')


router.get("/", (req, res) => {
  res.send("users Router");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get('/logout', logoutUser)

module.exports = router;
