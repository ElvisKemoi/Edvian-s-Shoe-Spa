const User = require("../models/users.model");
async function testUser() {
	const usr = new User({
		username: "user",
		email: "test@email.com",
		name: "Test Name",
	});
	await usr.setPassword("password");
	await usr.save();
	const { user } = await User.authenticate()("user", "password");
	console.log(user);
}

module.exports = testUser;
