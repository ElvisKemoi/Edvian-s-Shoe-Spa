const Order = require("../models/orders.model");
const Product = require("../models/products.model");

const verifyTotalPrice = async (req, res, next) => {
	try {
		const { totalPrice, products } = req.body;

		// Extract item IDs
		const itemIds = products.map((product) => product.item);

		// Fetch product details from the database
		const items = await Product.find({ _id: { $in: itemIds } });

		if (items.length !== products.length) {
			return res
				.status(400)
				.json({ error: "Some products were not found in the database." });
		}

		// Calculate the actual total price
		let calculatedTotal = 0;
		products.forEach((product) => {
			const item = items.find((i) => i._id.toString() === product.item);
			if (item) {
				calculatedTotal += item.price * product.quantity;
			}
		});

		// Compare the calculated total price with the one provided in the request
		if (calculatedTotal !== totalPrice) {
			return res.status(400).json({
				error: "Total price mismatch",
				expectedTotal: calculatedTotal,
				providedTotal: totalPrice,
			});
		}

		next(); // Proceed if the prices match
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// CREATE NEW ORDER
const newOrder = async (req, res, next) => {
	try {
		const {
			products,
			customerName,
			customerEmail,
			customerLocation,
			totalPrice,
		} = req.body;

		if (
			!products ||
			!customerName ||
			!customerEmail ||
			!customerLocation ||
			!totalPrice
		) {
			return res
				.status(400)
				.json({ success: false, error: "All fields are required" });
		}

		const order = new Order({
			products,
			customerName,
			customerEmail,
			customerLocation,
			totalPrice,
		});

		await order.save();

		return res.status(201).json({ success: true, data: order });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

// TODO UPDATE ORDER STATUS (BY ADMIN)

module.exports = { newOrder, verifyTotalPrice };
