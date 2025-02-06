const router = require("express").Router();
const {
	newOrder,
	verifyTotalPrice,
} = require("../controllers/orders.controllers");

router.post("/new", verifyTotalPrice, newOrder);
module.exports = router;
