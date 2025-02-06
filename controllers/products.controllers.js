const Product = require("../models/products.model");

// GET ALL PRODUCTS
const getAll = async (req, res) => {
	try {
		const products = await Product.find().lean();

		if (!products) {
			throw new Error("An error occurred while fetching products!");
		}

		res.status(200).json({ success: true, data: products });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

module.exports = { getAll };
