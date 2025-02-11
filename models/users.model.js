const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const _ = require("lodash");

const User = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required"],
			unique: true,
			trim: true,
			validate: {
				validator: function (value) {
					// Check if the username is lowercase, contains no spaces, and only valid characters
					return (
						_.isString(value) &&
						_.isEqual(value, _.toLower(value)) && // Ensure it's lowercase
						/^[a-z0-9._]+$/.test(value) // Valid characters only
					);
				},
				message:
					"Invalid username format. Only lowercase letters, numbers, periods, and underscores are allowed. No spaces or special characters.",
			},
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);
User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);

// Check on date of birth relevalnce and if it should be required or not
