const passport = require("passport");
const { getAllArray } = require("../controllers/products.controllers");
function calculatePercentageDiscount(price, pricewas) {
	if (pricewas === 0 || pricewas === null || pricewas === undefined) {
		throw new Error("Original price cannot be zero or undefined");
	}

	const discount = ((pricewas - price) / pricewas) * 100;
	return discount.toFixed(2); // Return the discount percentage rounded to 2 decimal places
}
const auth = {
	loginUser: async (req, res) => {
		req.session.save(() => {
			res.redirect("/admin");
		});
		// res.json({ message: "Login successful", user: req.user });
	},
	loginUserPage: async (req, res, next) => {
		res.render("login", { title: "Login" });
	},
	adminPage: async (req, res, next) => {
		try {
			const products = await getAllArray();
			res.render("admin", {
				products: products.data,
				calculatePercentageDiscount,
			});
		} catch (error) {
			return res.status(500).json({ error });
		}
	},
	logout: async (req, res) => {
		req.session.destroy((err) => {
			if (err) {
				return res.status(500).json({ error: "Could not log out" });
			}
			// Redirect to the login page or home after logging out
			res.redirect("/login");
		});
	},
};

module.exports = auth;
