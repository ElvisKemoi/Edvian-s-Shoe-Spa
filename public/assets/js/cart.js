let productGrid = document.getElementById("product-grid");
const cartDisplay = document.getElementById("cart");

// ? Cart functionality
let cart = [];

// Fetch all products from backend
const fetchAllProducts = async () => {
	const response = await fetch("/products/all");
	if (response.ok) {
		const data = await response.json();
		if (!data.success) {
			Swal.fire({
				icon: "error",
				title: "Network Error",
				text: "Failed to fetch products. Please try again later.",
				timer: 2000,
				timerProgressBar: true,
			});
		}
		return data.data;
	} else {
		Swal.fire({
			icon: "error",
			title: "Network Error",
			text: "Failed to fetch products. Please try again later.",
			timer: 2000,
			timerProgressBar: true,
		});
	}
};

(async () => {
	allProducts = await fetchAllProducts();

	await allProducts.forEach((product) => {
		productGrid.innerHTML =
			productGrid.innerHTML +
			`
		<div class="showcase">
		
		<div class="showcase-banner">
		<img loading="lazy" src="${
			product.images[0]
		}" width="300" class="product-img default">
		<img loading="lazy" src="${product.images[1]}" alt="${
				product.title
			}" width="300" class="product-img hover">
		
		<p class="showcase-badge">-${calculatePercentageDiscount(
			product.price,
			product.pricewas
		)}%</p>
		
		<div class="showcase-actions">
		
			<button class="btn-action addToCart" id="${
				product.id
			}" style="display:flex; justify-content:center; flex-direction: column; align-items: center;">
			<small>Add</small>
			<ion-icon name="bag-add-outline"></ion-icon>
			
			</button>
			</div>
		</div>
		
		<div class="showcase-content">
		<a  class="showcase-category">${product.category}</a>
		
		<a >
			<h3 class="showcase-title">
			${product.title}
			</h3>
		</a>
		
		<div class="showcase-rating">
		<ion-icon name="star"></ion-icon>
		<ion-icon name="star"></ion-icon>
		<ion-icon name="star"></ion-icon>
		<ion-icon name="star-outline"></ion-icon>
		<ion-icon name="star-outline"></ion-icon>
		</div>
		
		<div class="price-box">
		<p class="price">Ksh ${product.price}</p>
		<del>Ksh ${product.pricewas}</del>
		</div>
		</div>
		
		</div>
		`;
	});

	const addToCartButtons = document.querySelectorAll(".addToCart");

	//1. INSERTING AN ITEM INTO THE CART ARRAY
	addToCartButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const toCart = btn.id;
			const alreadyInCart = cart.some((item) => item.id === toCart);

			updateCartCount(cart);

			if (!alreadyInCart) {
				const productToAdd = findByKey(allProducts, "id", toCart);
				if (productToAdd) {
					cart.push(productToAdd);
					updateCart(cart);

					Swal.fire({
						title: `${productToAdd.title}`,
						text: "Added to your cart!",
						imageUrl: `${productToAdd.images[0]}`,
						timer: 2000,
						timerProgressBar: true,

						imageWidth: 150,
						imageHeight: 150,
						imageAlt: "Custom image",
					});

					updateCartCount(cart);
				} else {
					Swal.fire({
						title: "Product Not Found!",
						timer: 2000,
						timerProgressBar: true,
					});
				}
			} else {
				Swal.fire({
					title: "Product is already in the cart!",
					timer: 2000,
					timerProgressBar: true,
				});
			}
		});
	});
})();

//  MAKE FUNCTIONS FOR THE FOLLOWING

function findByKey(array, key, value) {
	return array.find((obj) => obj[key] === value);
}

function calculatePercentageDiscount(currentPrice, previousPrice) {
	if (currentPrice <= 0 || previousPrice <= 0) {
		throw new Error("Prices must be positive numbers.");
	}
	return Math.round(((previousPrice - currentPrice) / previousPrice) * 100);
}

//3. UPDATING THE CART DISPLAY
async function updateCart(cart1) {
	cartDisplay.innerHTML = ``;

	cart1.forEach((car, index) => {
		let sizeOptions = `<option value="" style="background-color:red;">Pick a size</option>`; // Add the default "Pick a size" option
		sizeOptions += car.sizes
			.map((size) => `<option value="${size}">${size}</option>`)
			.join(""); // Add other size options
		cartDisplay.innerHTML =
			cartDisplay.innerHTML +
			`<li class="sidebar-menu-category card">
				<button class="sidebar-accordion-menu active" data-accordion-btn>
					<div class="menu-title-flex">
						<img src="${car.images[0]}" alt="clothes" width="100" height="100" class="menu-title-img">
						<p class="menu-title">Ksh ${car.price} </p>
					</div>
					<div>
						<ion-icon name="add-outline" class="add-icon md hydrated" role="img" aria-label="add outline"></ion-icon>
						<ion-icon name="remove-outline" class="remove-icon md hydrated" role="img" aria-label="remove outline"></ion-icon>
					</div>
				</button>
				<ul class="sidebar-submenu-category-list active my-3" data-accordion>
					<li class="sidebar-submenu-category">
						<a href="#" class="sidebar-submenu-title">
							<p class="product-name">${car.title}</p>
						</a>
					</li>
					
					<li class="sidebar-submenu-category">
						<a class="sidebar-submenu-title">
							<p>Size</p>
							
							<form class="sizeForms">

							<select name="${car.id}" class="shoeSize">${sizeOptions}</select>
							</form>
							
						</a>
					</li>
					<li class="sidebar-submenu-category" style="margin:.9rem;">
						<a  class="sidebar-submenu-title">
							<button class="bg-warning remove" id="${car.id}">
							<i class="fa fa-trash"></i>
							Remove</button>
						</a>
					</li>
				</ul>
			</li>`;
	});

	cartDisplay.innerHTML =
		cartDisplay.innerHTML +
		`<li id="checkoutBtn" class="sidebar-menu-category bg-warning">
			<p>Checkout</p>
			
		</li>`;

	addCartTogglers();
	rmFrmCart(document.querySelectorAll(".remove"), cart1);
	cartCheckout(cart1);
}

//2. REMOVING AN ITEM INTO THE CART ARRAY

function rmFrmCart(items, arr) {
	items.forEach((rmBtn) => {
		rmBtn.addEventListener("click", () => {
			cart = arr.filter((item) => item.id !== rmBtn.id);
			updateCart(cart);
			Swal.fire({
				title: "Product was removed from your cart!",
				timer: 2000,
				timerProgressBar: true,
			});
			updateCartCount(cart);
		});
	});
}

function addCartTogglers() {
	const accordionBtn = document.querySelectorAll("[data-accordion-btn]");
	const accordion = document.querySelectorAll("[data-accordion]");
	for (let i = 0; i < accordionBtn.length; i++) {
		accordionBtn[i].addEventListener("click", function () {
			const clickedBtn = this.nextElementSibling.classList.contains("active");
			for (let i = 0; i < accordion.length; i++) {
				if (clickedBtn) break;
				if (accordion[i].classList.contains("active")) {
					accordion[i].classList.remove("active");
					accordionBtn[i].classList.remove("active");
				}
			}
			this.nextElementSibling.classList.toggle("active");
			this.classList.toggle("active");
		});
	}
}

function updateCartCount(cart) {
	// Select the specific elements with class .cartCount1 and .cartCount2
	let cartCountElement1 = document.querySelector(".cartCount1");
	let cartCountElement2 = document.querySelector(".cartCount2");

	// Update the text content of each element with the length of the cart array
	if (cartCountElement1 && cartCountElement2) {
		cartCountElement1.textContent = cart.length;
		cartCountElement2.textContent = cart.length;
	} else {
		console.error("One or both cart count elements not found");
	}
}

function cartCheckout(cart) {
	const checkoutBtn = document.getElementById("checkoutBtn");
	checkoutBtn.addEventListener("click", () => {
		if (cart.length === 0) {
			Swal.fire({
				icon: "error",
				title: "Oops... You can't complete the purchase!",
				text: "Your Cart is empty!",
			});
		} else {
			const allFormValues = getAllFormValues();
			if (allFormValues.length !== 0) {
				// Iterate over cart
				const newArray1 = cart.map((item) => {
					// Find the corresponding object in allFormValues based on the id
					const correspondingObj = allFormValues.find((obj) => obj[item.id]);

					// Append the value to the item in cart
					const size = correspondingObj ? correspondingObj[item.id] : null;
					return { ...item, size };
				});
				displayLastStage(newArray1);
			} else {
				Swal.fire({
					title: "Please select a shoe size!",
					timer: 2000,
					timerProgressBar: true,
				});
			}
		}
	});
}

function getAllFormValues() {
	const forms = document.querySelectorAll(".sizeForms");
	const allFormValues = [];
	const emptyValues = [];

	// Cache length to avoid reevaluation in loop
	const formsLength = forms.length;

	for (let i = 0; i < formsLength; i++) {
		const form = forms[i];
		const formData = new FormData(form);
		const emptyFormValues = {};
		const formValues = {};
		let hasEmptyValue = false; // Flag to check if empty values exist

		for (const [name, value] of formData.entries()) {
			// Check if value is empty or whitespace
			if (!value.trim()) {
				emptyFormValues[name] = value;
				hasEmptyValue = true;
			}
			formValues[name] = value;
		}

		allFormValues.push(formValues);

		if (hasEmptyValue) {
			emptyValues.push({ id: form.id, values: emptyFormValues });
		}
	}

	if (emptyValues.length !== 0) {
		Swal.fire({
			title: "Please select a shoe size!",
			timer: 2000,
			timerProgressBar: true,
		});
	} else {
		return allFormValues.filter(
			(form) => !emptyValues.some((emptyForm) => emptyForm.id === form.id)
		);
	}

	return [];
}

function displayLastStage(cart) {
	const productTable = document.querySelector(".product-table");
	productTable.innerHTML = "";

	const createTableHeader = () => {
		const tHead = document.createElement("thead");
		tHead.innerHTML = `<tr>
			<th>Product</th>
			<th>Price</th>
			<th>Description</th>
			<th>Size</th>
		</tr>`;
		return tHead;
	};

	const createTableBody = () => {
		const tBody = document.createElement("tbody");
		cart.forEach((item) => {
			const row = document.createElement("tr");
			row.innerHTML = `<td>${item.title}</td><td>Ksh ${item.price}</td><td>${item.color}</td><td>${item.size}</td>`;
			tBody.appendChild(row);
		});
		return tBody;
	};

	const createTableFooter = () => {
		const tFoot = document.createElement("tfoot");
		const tFootTr = document.createElement("tr");

		const calculateTotalPrice = (arr) => {
			return arr
				.map((item) => Number(item.price)) // Convert price values to numbers
				.reduce((acc, curr) => acc + curr, 0); // Calculate sum
		};

		const totalPrice = calculateTotalPrice(cart);
		tFootTr.innerHTML = `<td class="montserrat">Totals</td><td id="CartTotal ">Ksh &nbsp;${totalPrice}</td>`;
		tFoot.appendChild(tFootTr);
		document.querySelectorAll("#CartTotal").forEach((item) => {
			item.innerHTML = `Ksh ${totalPrice}`;
		});
		return tFoot;
	};

	productTable.appendChild(createTableHeader());
	productTable.appendChild(createTableBody());
	productTable.appendChild(createTableFooter());

	// console.log(cart);

	// document.querySelector(".open-btn").click();
	document.querySelector(".offcanvas").classList.add("active");
	getOrderDetails(cart);
}

function getOrderDetails(cart) {
	const confirmButton = document.querySelector("#confirmBtn");
	confirmButton.addEventListener("click", function (event) {
		event.preventDefault(); // Prevent the default behavior of the button

		const fullNameInput = document.querySelector('input[name="fullName"]');
		const userEmailInput = document.querySelector('input[name="userEmail"]');
		const phoneNumberInput = document.querySelector(
			'input[name="phoneNumber"]'
		);
		const deliveryLocationInput = document.querySelector(
			'input[name="deliveryLocation"]'
		);

		// Check if all inputs are present and have values
		if (
			fullNameInput &&
			userEmailInput &&
			phoneNumberInput &&
			deliveryLocationInput &&
			fullNameInput.value &&
			userEmailInput.value &&
			phoneNumberInput.value &&
			deliveryLocationInput.value
		) {
			const orderDetails = {
				name: fullNameInput.value,
				email: userEmailInput.value,
				phone: phoneNumberInput.value,
				location: deliveryLocationInput.value,
				items: cart,
			};

			// Call a function to handle the retrieved order details
			handleOrderDetails(orderDetails);
		} else {
			// Handle error if any input is missing or empty
			console.error("Some input fields are missing or empty.");
		}
	});
}

// Define a function to handle the retrieved order details
function handleOrderDetails(details) {
	let orderProducts = [];
	const productList = details.items
		.map(function (item) {
			orderProducts = [
				...orderProducts,
				{ item: item._id, quantity: 1, price: item.price },
			];
			return (
				"<tr><td>" +
				item.id +
				"</td><td>" +
				item.title +
				"</td><td>" +
				item.price +
				"</td><td>" +
				item.size +
				"</td><td>" +
				item.color +
				"</td></tr>"
			);
		})
		.join("");

	let bodyMessage =
		"<strong>Full Name:</strong> " +
		details.name +
		"<br>" +
		"<strong>Email:</strong> " +
		details.email +
		"<br>" +
		"<strong>Phone Number:</strong> " +
		details.phone +
		"<br>" +
		"<strong>Location:</strong> " +
		details.location +
		"<br>" +
		"<strong>Order Details:</strong><table border='1' style='width: 100%'>" +
		"<tr><th>ID</th><th>Title</th><th>Price</th><th>Size</th><th>Color</th></tr>" +
		productList +
		"</table>";
	// sendMail(bodyMessage);
	const totalPrice = (arr) => {
		const sum = arr.reduce(
			(accumulator, currentValue) => accumulator + currentValue.price,
			0
		);
		return sum;
	};
	const thesum = totalPrice(orderProducts);

	createOrder(
		orderProducts,
		document.querySelector('input[name="fullName"]').value,
		document.querySelector('input[name="userEmail"]').value,
		document.querySelector('input[name="deliveryLocation"]').value,
		thesum
	);
}

//SENDING THE ACTUAL EMAIL USING SMTP SERVERS
const secureToken = ""; //create a secure token from your smtp server provider
const to = ""; // insert email that you created the smtp server with
const from = ""; // same as (to) above ;
const subject = "New Order";

function sendMail(bodyMessage) {
	Email.send({
		SecureToken: secureToken,
		To: to,
		From: from,
		Subject: subject,

		Body: bodyMessage,
	}).then((message) => {
		cancelConfirmation();

		if (message === "OK") {
			Swal.fire({
				position: "center",
				icon: "success",
				title:
					"Message sent successfully! Confirmation will be sent to your email.",
				showConfirmButton: false,
				timer: 2000,
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!",
			});
		}
	});
}

async function createOrder(
	products,
	customerName,
	customerEmail,
	customerLocation,
	totalPrice
) {
	try {
		const response = await fetch("/order/new", {
			method: "POST",
			body: JSON.stringify({
				products,
				customerName,
				customerEmail,
				customerLocation,
				totalPrice,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		if (!data.success) {
			throw new Error(data.error);
		}
		document.querySelector(".offcanvas").classList.remove("active");
		await Swal.fire({
			position: "center",
			icon: "success",
			title:
				"Order Created Successfully! Details will be sent to your email " +
				data.data.customerEmail,
			showConfirmButton: false,
		});
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Something went wrong!" + error.message,
		});
	}
}
// Test data for createOrder function
const testProducts = [
	{
		item: "67a484f2cbe678815a189df8",
		quantity: 1,
	},
	{
		item: "67a484f2cbe678815a189df9",
		quantity: 1,
	},
];
const testCustomerName = "John Doe";
const testCustomerEmail = "john.doe@example.com";
const testCustomerLocation = "123 Main St, Anytown, USA";
const testTotalPrice = 5400;

// Call the createOrder function with test data
// createOrder(
// 	testProducts,
// 	testCustomerName,
// 	testCustomerEmail,
// 	testCustomerLocation,
// 	testTotalPrice
// );
