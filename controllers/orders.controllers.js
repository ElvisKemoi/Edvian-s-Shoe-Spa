const Order = require("../models/orders.model");
const Product = require("../models/products.model");
const sendEmail = require("./notification.controllers");

const verifyTotalPrice = async (req, res, next) => {
	try {
		const { totalPrice, products } = req.body;

		// Extract item IDs
		const itemIds = products.map((product) => product.item);

		// Fetch product details from the database
		const items = await Product.find({ _id: { $in: itemIds } });

		if (items.length !== products.length) {
			return res
				.status(400)
				.json({ error: "Some products were not found in the database." });
		}

		// Calculate the actual total price
		let calculatedTotal = 0;
		products.forEach((product) => {
			const item = items.find((i) => i._id.toString() === product.item);
			if (item) {
				calculatedTotal += item.price * product.quantity;
			}
		});

		// Compare the calculated total price with the one provided in the request
		if (calculatedTotal !== totalPrice) {
			return res.status(400).json({
				error: "Total price mismatch",
				expectedTotal: calculatedTotal,
				providedTotal: totalPrice,
			});
		}

		next(); // Proceed if the prices match
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// CREATING ROWS FOR THE ORDER DETAILS
const createRows = async (orderId) => {
	const theOrder = await Order.findById(orderId).populate("products.item");
	let products;
	if (theOrder) {
		products = theOrder.products;
	}

	let initialString = "";
	products.forEach((item, index) => {
		let itemTotalPrice = item.quantity * item.item.price;
		initialString += `
			<tr>
				<td>${index + 1}</td>
				<td>${item.item.title}</td>
				<td>${item.quantity}</td>
				<td>${item.item.price}</td>
				<td>${itemTotalPrice}</td>
			</tr>`;
	});
	return initialString;
};

// CREATE NEW ORDER
const newOrder = async (req, res, next) => {
	try {
		const {
			products,
			customerName,
			customerEmail,
			customerLocation,
			totalPrice,
		} = req.body;

		if (
			!products ||
			!customerName ||
			!customerEmail ||
			!customerLocation ||
			!totalPrice
		) {
			return res
				.status(400)
				.json({ success: false, error: "All fields are required" });
		}

		const order = new Order({
			products,
			customerName,
			customerEmail,
			customerLocation,
			totalPrice,
		});

		await order.save();

		const theRows = await createRows(order._id);

		const response = await sendEmail({
			to: customerEmail,
			subject: `Order Confirmation #${order._id}`,
			text: `Congratulations! \nYou have successfully placed an order.\nYour product will be delivered within 2 business days.`,
			html: `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Order Confirmation</title>
				<style>
					body {
						font-family: Arial, sans-serif;
						background-color: #f4f4f4;
						margin: 0;
						padding: 0;
					}
					.container {
						max-width: 600px;
						background: #ffffff;
						margin: 20px auto;
						padding: 20px;
						border-radius: 8px;
						box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
					}
					.header {
						text-align: center;
						color: #007bff;
						font-size: 24px;
						font-weight: bold;
					}
					.content {
						margin-top: 20px;
						font-size: 16px;
						color: #333;
					}
					.order-details {
						background: #f8f8f8;
						padding: 15px;
						border-radius: 5px;
						margin-top: 10px;
					}
					.order-id {
						font-weight: bold;
						color: #007bff;
					}
					.order-table {
						width: 100%;
						border-collapse: collapse;
						margin-top: 10px;
					}
					.order-table th, .order-table td {
						border: 1px solid #ddd;
						padding: 8px;
						text-align: left;
					}
					.order-table th {
						background-color: #007bff;
						color: white;
					}
					.footer {
						margin-top: 20px;
						text-align: center;
						font-size: 14px;
						color: #666;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">Gift's Closet</div>
					<div class="content">
						<p>Thank you for your order! Below are your order details:</p>
						<div class="order-details">
							<p><strong>Order Confirmation</strong></p>
							<p>Order ID: <span class="order-id">#${order._id}</span></p>
							<table class="order-table">
								<thead>
									<tr>
										<th>NO.</th>
										<th>Item</th>
										<th>Quantity</th>
										<th>Unit Price</th>
										<th>Item Total</th>
									</tr>
								</thead>
								<tbody>
								${theRows}
								</tbody>
							</table>
							<p>Total Amount: <span class="order-id">#${order.totalPrice}</span></p>
						</div>
						<p>If you have any questions, feel free to contact us.</p>
					</div>
					<div class="footer">
						&copy; 2025 Gift's Closet. All rights reserved.
					</div>
				</div>
			</body>
			</html>`,
		});
		console.log("Success:", response);

		return res.status(201).json({ success: true, data: order });
	} catch (error) {
		return res.status(500).json({ success: false, error: error.message });
	}
};

// TODO UPDATE ORDER STATUS (BY ADMIN)

module.exports = { newOrder, verifyTotalPrice };
