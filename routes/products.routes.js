const router = require("express").Router();
const { getAll } = require("../controllers/products.controllers");

// GET ALL PRODUCTS

router.get("/all", getAll);

module.exports = router;
