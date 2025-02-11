const passport = require("passport");

const isAuthenticated = async (req, res, next) => {
	try {
		if (req.isAuthenticated()) {
			return next(); // Ensure function execution stops here
		}
		return res.redirect("/login");
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

module.exports = isAuthenticated;
