let productGrid = document.getElementById("product-grid");
const cartDisplay = document.getElementById("cart");

// ? Cart functionality
let cart = [];

// ?All Products
const allProducts = [
	{
		id: "prod1",
		title: "Airforce Shadow Restocked",
		price: 2700,
		rating: 9,
		images: [
			"./shoeImages/Airforce Shadow Restocked,size37to41,price27000,colorful.jpg",
			"./shoeImages/Airforce Shadow Restocked,size37to41,price27000,colorful2.jpg",
		],
		sizes: [37, 38, 39, 40, 41],
		category: "Womens",
		pricewas: 3000,
		color: "colorful",
	},
	{
		id: "prod2",
		title: "Airforce Shadow Restocked",
		price: 2700,
		rating: 9,
		images: [
			"/shoeImages/Airforce Shadow Restocked,size37to41,price27000,pink.jpg",
			"/shoeImages/Airforce Shadow Restocked,size37to41,price27000,pink2.jpg",
		],
		sizes: [37, 38, 39, 40, 41],
		category: "Womens",
		pricewas: 3000,
		color: "pink",
	},
	{
		id: "prod3",
		title: "Airmax 95",
		price: 3800,
		rating: 9,
		images: [
			"/shoeImages/Airmax 95,size40to45,price38000,black2.jpg",
			"/shoeImages/Airmax 95,size40to45,price38000,black3.jpg",
		],
		sizes: [40, 41, 42, 43, 44, 45],
		category: "Mens",
		pricewas: 4000,
		color: "black",
	},
	{
		id: "prod4",
		title: "Airmax 95",
		price: 3800,
		rating: 9,
		images: [
			"/shoeImages/Airmax 95,size40to45,price38000,colorful.jpg",
			"/shoeImages/Airmax 95,size40to45,price38000,colorful2.jpg",
		],
		sizes: [40, 41, 42, 43, 44, 45],
		category: "Mens",
		pricewas: 4000,
		color: "grey-blue",
	},
	{
		id: "prod5",
		title: "Ladies Boots",
		price: 2150,
		rating: 9,
		images: [
			"/shoeImages/Ladies Boots,size37to42,price2150,black2.jpg",
			"/shoeImages/Ladies Boots,size37to42,price2150,black.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42],
		category: "Womens",
		pricewas: 2500,
		color: "black",
	},
	{
		id: "prod6",
		title: "Ladies Boots",
		price: 2150,
		rating: 9,
		images: [
			"/shoeImages/Ladies Boots,size37to42,price2150,brown.jpg",
			"/shoeImages/Ladies Boots,size37to42,price2150,blackbrown.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42],
		category: "Womens",
		pricewas: 2500,
		color: "brown",
	},
	{
		id: "prod7",
		title: "NB_Sneakers Restocked fully",
		price: 2500,
		rating: 9,
		images: [
			"/shoeImages/NB_Sneakers Restocked fully,size39-44,price2500,brown.jpg",
			"/shoeImages/NB_Sneakers Restocked fully,size39-44,price2500,brown2.jpg",
		],
		sizes: [39, 40, 41, 42, 43, 44],
		category: "Mens",
		pricewas: 2800,
		color: "white-brown",
	},
	{
		id: "prod8",
		title: "NB_Sneakers Restocked fully",
		price: 2500,
		rating: 9,
		images: [
			"/shoeImages/NB_Sneakers Restocked fully,size39-44,price2500,brownblack.jpg",
			"/shoeImages/NB_Sneakers Restocked fully,size39-44,price2500,brownblack.jpg",
		],
		sizes: [39, 40, 41, 42, 43, 44],
		category: "Mens",
		pricewas: 2800,
		color: "white-brown",
	},
	{
		id: "prod9",
		title: "NoName",
		price: 2000,
		rating: 9,
		images: [
			"/shoeImages/NoName,Size36to41,price2000,womens,black.jpg",
			"/shoeImages/NoName,Size36to41,price2000,womens,black.jpg",
		],
		sizes: [39, 40, 41, 42, 43, 44],
		category: "Womens",
		pricewas: 2400,
		color: "black",
	},
	{
		id: "pro10",
		title: "NoName",
		price: 2000,
		rating: 9,
		images: [
			"/shoeImages/NoName,Size36to41,price2000,womens,white,2.jpg",
			"/shoeImages/NoName,Size36to41,price2000,womens,white,3.jpg",
		],
		sizes: [36, 37, 38, 39, 40, 41],
		category: "Womens",
		pricewas: 2400,
		color: "white",
	},
	{
		id: "pro11",
		title: "Quality double sole Skater vans",
		price: 2000,
		rating: 9,
		images: [
			"/shoeImages/Quality double sole Skater vans,size39to45,price2000,black2.jpg",
			"/shoeImages/Quality double sole Skater vans,size39to45,price2000,black3.jpg",
		],
		sizes: [39, 40, 41, 42, 43, 44, 45],
		category: "Mens",
		pricewas: 2300,
		color: "black",
	},
	{
		id: "pro12",
		title: "Quality double sole Skater vans",
		price: 2000,
		rating: 9,
		images: [
			"/shoeImages/Quality double sole Skater vans,size39to45,price2000,blackblue.jpg",
			"/shoeImages/Quality double sole Skater vans,size39to45,price2000,blackblue2.jpg",
		],
		sizes: [39, 40, 41, 42, 43, 44, 45],
		category: "Mens",
		pricewas: 2300,
		color: "blakc-blue",
	},
	{
		id: "pro13",
		title: "Quality double sole Skater vans",
		price: 2000,
		rating: 9,
		images: [
			"/shoeImages/Quality double sole Skater vans,size39to45,price2000,blue.jpg",
			"/shoeImages/Quality double sole Skater vans,size39to45,price2000,blue.jpg",
		],
		sizes: [39, 40, 41, 42, 43, 44, 45],
		category: "Mens",
		pricewas: 2300,
		color: "blue",
	},
	{
		id: "pro14",
		title: "Quality double sole Skater vans",
		price: 2000,
		rating: 9,
		images: [
			"/shoeImages/Quality double sole Skater vans,size39to45,price2000,red.jpg",
			"/shoeImages/Quality double sole Skater vans,size39to45,price2000,red.jpg",
		],
		sizes: [39, 40, 41, 42, 43, 44, 45],
		category: "Mens",
		pricewas: 2300,
		color: "red",
	},
	{
		id: "pro15",
		title: "Quality double sole Skater vans",
		price: 2000,
		rating: 9,
		images: [
			"/shoeImages/Quality double sole Skater vans,size39to45,price2000,red.jpg",
			"/shoeImages/Quality double sole Skater vans,size39to45,price2000,red.jpg",
		],
		sizes: [39, 40, 41, 42, 43, 44, 45],
		category: "Mens",
		pricewas: 2300,
		color: "red",
	},
	{
		id: "pro16",
		title: "Quality Open wedge",
		price: 1950,
		rating: 9,
		images: [
			"/shoeImages/Quality Open wedge,size37to43,price1950,black.jpg",
			"/shoeImages/Quality Open wedge,size37to43,price1950,black.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42, 43],
		category: "Womens",
		pricewas: 2200,
		color: "black",
	},
	{
		id: "pro17",
		title: "Quality Open wedge",
		price: 1950,
		rating: 9,
		images: [
			"/shoeImages/Quality Open wedge,size37to43,price1950,blue.jpg",
			"/shoeImages/Quality Open wedge,size37to43,price1950,blue.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42, 43],
		category: "Womens",
		pricewas: 2200,
		color: "blue",
	},
	{
		id: "pro18",
		title: "Quality Open wedge",
		price: 1950,
		rating: 9,
		images: [
			"/shoeImages/Quality Open wedge,size37to43,price1950,cream.jpg",
			"/shoeImages/Quality Open wedge,size37to43,price1950,cream.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42, 43],
		category: "Womens",
		pricewas: 2200,
		color: "cream",
	},
	{
		id: "pro19",
		title: "Quality Open wedge",
		price: 1950,
		rating: 9,
		images: [
			"/shoeImages/Quality Open wedge,size37to43,price1950,leopardpattern.jpg",
			"/shoeImages/Quality Open wedge,size37to43,price1950,leopardpattern.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42, 43],
		category: "Womens",
		pricewas: 2200,
		color: "leopardpattern",
	},
	{
		id: "pro20",
		title: "Strapped leather sandals",
		price: 1900,
		rating: 9,
		images: [
			"/shoeImages/Strapped leather sandals,size37to42,price1900,black.jpg",
			"/shoeImages/Strapped leather sandals,size37to42,price1900,black.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42, 43],
		category: "Womens",
		pricewas: 2000,
		color: "black",
	},
	{
		id: "pro21",
		title: "Strapped leather sandals",
		price: 1900,
		rating: 9,
		images: [
			"/shoeImages/Strapped leather sandals,size37to42,price1900,brown.jpg",
			"/shoeImages/Strapped leather sandals,size37to42,price1900,brown.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42, 43],
		category: "Womens",
		pricewas: 2000,
		color: "brown",
	},
	{
		id: "pro22",
		title: "Strapped leather sandals",
		price: 1900,
		rating: 9,
		images: [
			"/shoeImages/Strapped leather sandals,size37to42,price1900,cream.jpg",
			"/shoeImages/Strapped leather sandals,size37to42,price1900,cream.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42, 43],
		category: "Womens",
		pricewas: 2000,
		color: "cream",
	},
	{
		id: "pro23",
		title: "Strapped leather sandals",
		price: 1900,
		rating: 9,
		images: [
			"/shoeImages/Strapped leather sandals,size37to42,price1900,green.jpg",
			"/shoeImages/Strapped leather sandals,size37to42,price1900,green.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42, 43],
		category: "Womens",
		pricewas: 2000,
		color: "green",
	},
	{
		id: "pro24",
		title: "Sued Loafers",
		price: 2500,
		rating: 9,
		images: [
			"/shoeImages/Sued Loafers,size37to42,price25000,darkblue.jpg",
			"/shoeImages/Sued Loafers,size37to42,price25000,darkblue.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42],
		category: "Womens",
		pricewas: 2700,
		color: "blue",
	},
	{
		id: "pro25",
		title: "Sued Loafers",
		price: 2500,
		rating: 9,
		images: [
			"/shoeImages/Sued Loafers,size37to42,price25000,grey.jpg",
			"/shoeImages/Sued Loafers,size37to42,price25000,grey.jpg",
		],
		sizes: [37, 38, 39, 40, 41, 42],
		category: "Womens",
		pricewas: 2700,
		color: "grey",
	},
	{
		id: "pro26",
		title: "Tommy Hilliger sneakers",
		price: 2050,
		rating: 9,
		images: [
			"/shoeImages/Tommy Hilliger sneakers,size37to41,price2050,black.jpg",
			"/shoeImages/Tommy Hilliger sneakers,size37to41,price2050,black.jpg",
		],
		sizes: [37, 38, 39, 40, 41],
		category: "Womens",
		pricewas: 2200,
		color: "black",
	},
	{
		id: "pro27",
		title: "Tommy Hilliger sneakers",
		price: 2050,
		rating: 9,
		images: [
			"/shoeImages/Tommy Hilliger sneakers,size37to41,price2050,blue.jpg",
			"/shoeImages/Tommy Hilliger sneakers,size37to41,price2050,blue.jpg",
		],
		sizes: [37, 38, 39, 40, 41],
		category: "Womens",
		pricewas: 2200,
		color: "blue",
	},
	{
		id: "pro28",
		title: "Tommy Hilliger sneakers",
		price: 2050,
		rating: 9,
		images: [
			"/shoeImages/Tommy Hilliger sneakers,size37to41,price2050,red.jpg",
			"/shoeImages/Tommy Hilliger sneakers,size37to41,price2050,red.jpg",
		],
		sizes: [37, 38, 39, 40, 41],
		category: "Womens",
		pricewas: 2200,
		color: "red",
	},
	{
		id: "pro29",
		title: "Tommy Hilliger sneakers",
		price: 2050,
		rating: 9,
		images: [
			"/shoeImages/Tommy Hilliger sneakers,size37to41,price2050,white.jpg",
			"/shoeImages/Tommy Hilliger sneakers,size37to41,price2050,white.jpg",
		],
		sizes: [37, 38, 39, 40, 41],
		category: "Womens",
		pricewas: 2200,
		color: "white",
	},
	{
		id: "pro30",
		title: "Vip Men's Sneakers",
		price: 2000,
		rating: 9,
		images: [
			"/shoeImages/Vip Men's Sneakers,size40to44,price2000,black.jpg",
			"/shoeImages/Vip Men's Sneakers,size40to44,price2000,black.jpg",
		],
		sizes: [40, 41, 42, 43, 44],
		category: "Mens",
		pricewas: 2250,
		color: "black",
	},
	{
		id: "pro31",
		title: "Vip Men's Sneakers",
		price: 2000,
		rating: 9,
		images: [
			"/shoeImages/Vip Men's Sneakers,size40to44,price2000,grey.jpg",
			"/shoeImages/Vip Men's Sneakers,size40to44,price2000,grey.jpg",
		],
		sizes: [40, 41, 42, 43, 44],
		category: "Mens",
		pricewas: 2250,
		color: "grey",
	},
	{
		id: "pro32",
		title: "Vip Men's Sneakers",
		price: 2000,
		rating: 9,
		images: [
			"/shoeImages/Vip Men's Sneakers,size40to44,price2000,beige.jpg",
			"/shoeImages/Vip Men's Sneakers,size40to44,price2000,beige.jpg",
		],
		sizes: [40, 41, 42, 43, 44],
		category: "Mens",
		pricewas: 2250,
		color: "beige",
	},
];

allProducts.forEach((product) => {
	productGrid.innerHTML =
		productGrid.innerHTML +
		`
	<div class="showcase">
	
	<div class="showcase-banner">
	<img src="${product.images[0]}" width="300" class="product-img default">
	<img src="${
		product.images[1]
	}" alt="Mens Winter Leathers Jackets" width="300" class="product-img hover">
	
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

const checkoutBtn = document.getElementById("checkoutBtn");
const addToCartButtons = document.querySelectorAll(".addToCart");

//TODO1. INSERTING AN ITEM INTO THE CART ARRAY
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
					imageWidth: 150,
					imageHeight: 150,
					imageAlt: "Custom image",
				});

				updateCartCount(cart);
				console.log("Product added to cart:", productToAdd);
			} else {
				console.log("Product not found.");
				// Potential improvement: Notify the user that the product is not available.
			}
		} else {
			console.log("Product is already in the cart.");
			// Potential improvement: Notify the user that the product is already in the cart.
		}
		console.table(cart);
	});
});

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

//TODO3. UPDATING THE CART DISPLAY
async function updateCart(cart1) {
	cartDisplay.innerHTML = "";

	cart1.forEach((car) => {
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
				<a href="#" class="sidebar-submenu-title">
					<p>Price</p>
		<p>Ksh ${car.price}</p>
				</a>
			</li>
			<li class="sidebar-submenu-category">
				<a class="sidebar-submenu-title">
					<p>Size</p>
		<select name="Size" id="shoeSize">
		<option value="" style="background-color:red;">Pick a size</option>
		<option value="37">37</option>
		<option value="38">38</option>
		<option value="39">39</option>
		<option value="40">40</option>
		<option value="41">41</option>
		<option value="42">42</option>
		</select>
				</a>
			</li>
		<li class="sidebar-submenu-category " style="margin:.9rem;">
				<a href="#" class="sidebar-submenu-title">
					
				
		<button class=" bg-warning remove" id="${car.id}">Remove</button>
		
				</a>
			</li>
		</ul>
		</li>`;
	});
	cartDisplay.innerHTML =
		cartDisplay.innerHTML +
		`<li id="checkoutBtn" class="sidebar-menu-category bg-warning " >
			<p >Checkout </p>
	</li>`;

	addCartTogglers();

	rmFrmCart(document.querySelectorAll(".remove"), cart1);
}

//TODO2. REMOVING AN ITEM INTO THE CART ARRAY

function rmFrmCart(items, arr) {
	items.forEach((rmBtn) => {
		rmBtn.addEventListener("click", () => {
			cart = arr.filter((item) => item.id !== rmBtn.id);
			updateCart(cart);
			updateCartCount(cart);
			console.log(cart);
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
		console.log("Cart count updated: ", cart.length);
	} else {
		console.error("One or both cart count elements not found");
	}
}
