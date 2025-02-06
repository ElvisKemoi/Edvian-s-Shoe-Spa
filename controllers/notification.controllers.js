const nodemailer = require("nodemailer");

// Create the transporter once and reuse it
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
});

/**
 * Sends an email notification.
 * @param {string} to - Recipient's email address.
 * @param {string} subject - Email subject.
 * @param {string} text - Plain text version of the email.
 * @param {string} [html] - HTML version of the email (optional).
 * @param {string} [cc] - CC email address (optional).
 * @param {string} [bcc] - BCC email address (optional).
 * @returns {Promise<string>} - Resolves with success message or rejects with an error.
 */
const sendEmail = async ({
	to,
	subject,
	text,
	html = null,
	cc = null,
	bcc = null,
}) => {
	try {
		const mailOptions = {
			from: process.env.EMAIL,
			to,
			subject,
			text,
			html, // Allows sending HTML content
			cc,
			bcc,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent:", info.response);
		return info.response;
	} catch (error) {
		console.error("Email sending failed:", error);
		throw new Error(error.message);
	}
};

// ? Implementation of the sendEmail function
// (async () => {
// 	try {
// 		const response = await sendEmail({
// 			to: "recipient@example.com",
// 			subject: "Important Notification",
// 			text: "This is a plain text email.",
// 			html: "<h1>This is an HTML email</h1><p>Styled email content</p>",
// 			cc: "cc@example.com",
// 			bcc: "bcc@example.com",
// 		});
// 		console.log("Success:", response);
// 	} catch (error) {
// 		console.error("Error:", error.message);
// 	}
// })();

module.exports = sendEmail;
