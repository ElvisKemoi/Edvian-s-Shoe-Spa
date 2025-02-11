require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/users.model"); // Adjust the path based on your structure

const createAdminUser = async () => {
	try {
		const adminEmail = process.env.ADMIN_EMAIL;
		const adminPassword = process.env.ADMIN_PASSWORD || "admin123"; // Default password if not set

		if (!adminEmail) {
			console.error("ADMIN_EMAIL is not set in the .env file");
			return;
		}

		// Check if an admin user with the email already exists
		const existingAdmin = await User.findOne({
			email: adminEmail,
			role: "admin",
		});

		if (existingAdmin) {
			console.log("Admin user already exists");
			return;
		}

		// Create a new admin user
		const adminUser = new User({ email: adminEmail, role: "admin" });

		// Set the password using Passport-Local Mongoose's method
		await User.register(adminUser, adminPassword);
		console.log("Admin user created successfully");
	} catch (error) {
		console.error("Error creating admin user:", error);
	}
};

module.exports = createAdminUser;
