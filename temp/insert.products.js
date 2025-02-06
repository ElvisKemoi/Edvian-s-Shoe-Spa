const Product = require("../models/products.model");
const products = require("./test.products");

const addTest = async () => {
	const result = await Product.insertMany(products);
	console.log(result);
};

module.exports = addTest;
