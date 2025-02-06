const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		images: {
			type: [String],
			required: true,
		},
		sizes: {
			type: [Number],
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		pricewas: {
			type: Number,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
