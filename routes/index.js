var express = require("express");
var router = express.Router();
const passport = require("passport");
const auth = require("../controllers/auth.controllers");
const isAuthenticated = require("../middleware/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

// LOGINS
router.get("/login", auth.loginUserPage);
router.post("/login", passport.authenticate("local"), auth.loginUser);

router.get("/admin", isAuthenticated, auth.adminPage);

router.get("/logout", auth.logout);

module.exports = router;
