const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsletterSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Newsletter = new mongoose.model("Newsletter", newsletterSchema);

module.exports = Newsletter;
