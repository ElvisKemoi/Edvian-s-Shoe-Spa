const Newsletter = require("../models/newsletter.model");

const addPerson = async (req, res) => {
	try {
		const { newsletterEmail } = req.body;
		const email = newsletterEmail;

		if (!email) {
			return res.redirect("/");
			// return res
			// 	.status(400)
			// 	.json({ success: false, error: "Email is required" });
		}

		const foundEmail = await Newsletter.findOne({ email });

		if (foundEmail) {
			return res.redirect("/");
			// return res.status(400).json({
			// 	success: false,
			// 	error: "Email already exists in the mailing list!",
			// });
		}

		const newEmail = await Newsletter.create({ email });

		return res.status(201).redirect("/");

		// return res.status(201).json({ success: true, data: newEmail });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

module.exports = addPerson;
