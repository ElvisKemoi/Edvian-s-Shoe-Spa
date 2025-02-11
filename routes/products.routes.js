const router = require("express").Router();
const {
	getAll,
	deleteProduct,
} = require("../controllers/products.controllers");
const { v4: uuidv4 } = require("uuid");

// GET ALL PRODUCTS

router.get("/all", getAll);

router.post("/delete/:id", deleteProduct);

const multer = require("multer");
const path = require("path");
const Product = require("../models/products.model"); // Assuming the product model is in the models folder

// Set up storage for images
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads/"); // This will save images in the 'uploads' folder
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname)); // Renaming the file to avoid conflicts
	},
});

const upload = multer({ storage: storage });

// Handle the POST request from the Add Product form
router.post("/add-product", upload.array("images", 5), async (req, res) => {
	try {
		const {
			title,
			price,
			rating = 4.6,
			sizes,
			category,
			pricewas,
			color,
		} = req.body;
		const id = uuidv4();

		const images = req.files.map((file) => file.path.replace("public/", "")); // Get the file paths of the uploaded images

		// Convert sizes string into an array of numbers
		const sizeArray = sizes.split(",").map((size) => parseInt(size.trim()));

		// Create a new product
		const newProduct = new Product({
			id,
			title,
			price,
			rating,
			images,
			sizes: sizeArray,
			category,
			pricewas,
			color,
		});

		// Save the product to the database
		await newProduct.save();

		return res.redirect("/admin");
	} catch (error) {
		console.error(error);
		res.status(500).send("Error adding product");
	}
});

module.exports = router;
