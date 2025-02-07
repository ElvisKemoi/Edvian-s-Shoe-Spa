("use strict");

// modal variables
const modal = document.querySelector("[data-modal]");
const modalCloseBtn = document.querySelector("[data-modal-close]");
const modalCloseOverlay = document.querySelector("[data-modal-overlay]");

// modal function
const modalCloseFunc = function () {
	modal.classList.add("closed");
};

// modal eventListener
modalCloseOverlay.addEventListener("click", modalCloseFunc);
modalCloseBtn.addEventListener("click", modalCloseFunc);

// notification toast variables
const notificationToast = document.querySelector("[data-toast]");
const toastCloseBtn = document.querySelector("[data-toast-close]");

// notification toast eventListener
toastCloseBtn.addEventListener("click", function () {
	notificationToast.classList.add("closed");
});

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll(
	"[data-mobile-menu-open-btn]"
);
const mobileMenu = document.querySelectorAll("[data-mobile-menu]");
const mobileMenuCloseBtn = document.querySelectorAll(
	"[data-mobile-menu-close-btn]"
);
const overlay = document.querySelector("[data-overlay]");

// Loop through each mobile menu open button
for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
	// Create a separate scope for each iteration
	(function (index) {
		// mobile menu function
		const mobileMenuCloseFunc = function () {
			mobileMenu[index].classList.remove("active");
			overlay.classList.remove("active");
		};

		mobileMenuOpenBtn[index].addEventListener("click", function () {
			mobileMenu[index].classList.add("active");
			overlay.classList.add("active");
		});

		mobileMenuCloseBtn[index].addEventListener("click", mobileMenuCloseFunc);
		overlay.addEventListener("click", mobileMenuCloseFunc);
	})(i); // Pass the current value of i to the IIFE
}

// accordion variables
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

function cancelConfirmation() {
	document.querySelector(".offcanvas").classList.remove("active");
}
// const newsletterForm = document.getElementById("newsletterForm");
// const newsletterEmailInput = document.getElementById("newsletterEmail");

// newsletterForm.addEventListener("submit", async (e) => {
// 	try {
// 		e.preventDefault();
// 		const newsletterEmail = newsletterEmailInput.value.trim();

// 		// Basic email validation
// 		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 		if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
// 			await Swal.fire({
// 				icon: "error",
// 				title: "Oops...",
// 				text: "Please enter a valid email address!",
// 			});
// 			return;
// 		}

// 		const response = await fetch("/newsletter/add", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ email: newsletterEmail }),
// 		});

// 		const responseData = await response.json().catch(() => null);
// 		if (response.ok && responseData?.success) {
// 			await Swal.fire({
// 				position: "center",
// 				icon: "success",
// 				title: "Subscription successful! Check your email for confirmation.",
// 				showConfirmButton: false,
// 				timer: 2000,
// 			});
// 			newsletterEmailInput.value = ""; // Clear input after success
// 		} else {
// 			throw new Error(responseData?.error || "An unexpected error occurred!");
// 		}
// 	} catch (error) {
// 		await Swal.fire({
// 			icon: "error",
// 			title: "Oops...",
// 			text: `Something went wrong! ${error.message}`,
// 		});
// 	}
// });
