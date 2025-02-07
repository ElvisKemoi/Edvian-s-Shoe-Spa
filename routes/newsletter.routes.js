const router = require("express").Router();
const addPerson = require("../controllers/newsletter.controllers");

// ADD PERSON TO NEWSLETTER
router.post("/add", addPerson);
module.exports = router;
