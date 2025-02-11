const Product = require("../models/products.model");
const path = require("path");
const fs = require("fs");

// GET ALL PRODUCTS
const getAll = async (req, res) => {
	try {
		const products = await Product.find().lean().sort({ createdAt: -1 });

		if (!products) {
			throw new Error("An error occurred while fetching products!");
		}

		res.status(200).json({ success: true, data: products });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

const getAllArray = async () => {
	try {
		const products = await Product.find().lean().sort({ createdAt: -1 });

		if (!products) {
			throw new Error("An error occurred while fetching products!");
		}

		return { success: true, data: products };
	} catch (error) {
		return { error: error.message };
	}
};
// TODO TEXT DELETE PRODUCT
const deleteProduct = async (req, res) => {
	try {
		const productId = req.params.id;

		// Find the product by ID
		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Delete images from the filesystem
		product.images.forEach((image) => {
			const imagePath = path.join(__dirname, "uploads", image); // Replace 'path/to/images' with the actual directory path where images are stored
			if (fs.existsSync(imagePath)) {
				fs.unlinkSync(imagePath);
			}
		});

		// Delete the product from the database
		await Product.findByIdAndDelete(productId);

		return res.redirect("/admin");
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

module.exports = { getAll, getAllArray, deleteProduct };
