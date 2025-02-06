const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./products.model");

const productsSchema = new Schema({
	item: {
		type: mongoose.Types.ObjectId,
		ref: Product,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const orderSchema = new Schema(
	{
		customerName: {
			type: String,
			required: true,
		},
		customerEmail: {
			type: String,
			required: true,
		},
		products: {
			type: [productsSchema],
		},
		totalPrice: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "completed", "cancelled"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Order", orderSchema);
