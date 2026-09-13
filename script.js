const orderModal = document.getElementById('orderModal');
const modalCakeType = document.getElementById('modalCakeType');
const cakeOrderForm = document.getElementById('cakeOrderForm');
const cartCountLabel = document.querySelector('.cart-count');

let currentCartTotal = 0;

/**
 * Opens Order popup tracking modal customized by category clicked
 * @param {string} cakeCategory - The specific title text name of cake
 */
function openOrderModal(cakeCategory) {
    if (modalCakeType && orderModal) {
        modalCakeType.textContent = cakeCategory + " Cake";
        orderModal.classList.add('modal-show');
        // Trap body scroll background movements
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Closes ordering popup customized viewport frame resetting fields
 */
function closeOrderModal() {
    if (orderModal) {
        orderModal.classList.remove('modal-show');
        document.body.style.overflow = 'auto';
        if (cakeOrderForm) cakeOrderForm.reset();
    }
}

// Close Modal overlay safely if outer backdrop veil is clicked directly
if (orderModal) {
    orderModal.addEventListener('click', (event) => {
        if (event.target === orderModal) {
            closeOrderModal();
        }
    });
}

// Intercept form submissions updating cart count indicators
if (cakeOrderForm) {
    cakeOrderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Harvest selected variables safely
        const chosenOccasion = cakeOrderForm.elements['occasion'].value;
        const chosenIcing = cakeOrderForm.elements['icing'].value;
        const chosenWeight = cakeOrderForm.elements['weight'].value;
        const writtenScript = document.getElementById('cakeText').value;
        const colorPalette = document.getElementById('cakeColor').value;
        
        // Output detailed confirmation summary
        alert(`Success! Your custom cake has been added to the basket.\n\nSummary Specs:\n• Type: ${modalCakeType.textContent}\n• Occasion: ${chosenOccasion}\n• Icing Base: ${chosenIcing}\n• Mass Weight: ${chosenWeight}\n• Inscription: "${writtenScript}"\n• Color Notes: ${colorPalette}`);
        
        // Increment shopping cart tracker widget bubble
        currentCartTotal += 1;
        if (cartCountLabel) {
            cartCountLabel.textContent = currentCartTotal;
        }
        
        // Retract customizer modal frame safely
        closeOrderModal();
    });
}


// Pricing Rates Matrix Setup
const PRICE_PER_KG_SOFT = 1500;
const PRICE_PER_KG_HARD = 1800;

/**
 * Calculates and updates prices inside the weight selection blocks live
 */
function updateModalPrice() {
    const icingField = cakeOrderForm.elements['icing'];
    if (!icingField) return;

    const currentIcing = icingField.value;
    
    // Choose rate factor based on chosen texture profile
    const ratePerKg = (currentIcing === "Hard Icing") ? PRICE_PER_KG_HARD : PRICE_PER_KG_SOFT;
    
    // Calculate and apply localized currency text values to DOM nodes safely
    document.getElementById('price-1kg').textContent = `KES ${(ratePerKg * 1.0).toLocaleString()}`;
    document.getElementById('price-15kg').textContent = `KES ${(ratePerKg * 1.5).toLocaleString()}`;
    document.getElementById('price-2kg').textContent = `KES ${(ratePerKg * 2.0).toLocaleString()}`;
}

// Expand your openOrderModal function to trigger an initial layout calculations patch
function openOrderModal(cakeCategory) {
    if (modalCakeType && orderModal) {
        modalCakeType.textContent = cakeCategory + " Cake";
        orderModal.classList.add('modal-show');
        document.body.style.overflow = 'hidden';
        
        // Run pricing recalculation immediately upon launch
        updateModalPrice();
    }
}

// Modify the form listener submit event to append calculated currency tags onto WhatsApp
if (cakeOrderForm) {
    cakeOrderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const chosenIcing = cakeOrderForm.elements['icing'].value;
        const chosenWeight = cakeOrderForm.elements['weight'].value;
        const writtenScript = document.getElementById('cakeText').value;
        const colorPalette = document.getElementById('cakeColor').value;
        const cakeCategoryName = modalCakeType.textContent;
        
        // Extract base conversion factor to append accurate quotes into text outputs
        const weightMultiplier = (chosenWeight === "1.0kg") ? 1.0 : (chosenWeight === "1.5kg") ? 1.5 : 2.0;
        const ratePerKg = (chosenIcing === "Hard Icing") ? PRICE_PER_KG_HARD : PRICE_PER_KG_SOFT;
        const finalCalculatedPrice = `KES ${(ratePerKg * weightMultiplier).toLocaleString()}`;
        
        // Draft WhatsApp invoice copy tracking variables
        const whatsappMessage = `🎂 *NEW CAKE ORDER - ELEGANT BAKERS* 🎂\n\n` +
                                `Hello! I would like to place a custom cake order with the following specifications:\n\n` +
                                `• *Cake Category:* ${cakeCategoryName}\n` +
                                `• *Icing Preference:* ${chosenIcing}\n` +
                                `• *Size/Weight:* ${chosenWeight}\n` +
                                `• *Text Written on Cake:* "${writtenScript}"\n` +
                                `• *Color Theme Notes:* ${colorPalette}\n\n` +
                                `• *Estimated Price:* ${finalCalculatedPrice}\n\n` +
                                `Please review this order and let me know the delivery availability. Thank you!`;
        
        const businessPhoneNumber = "254705933390"; // Replace with your actual number
        const encodedText = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/+254705933390?text=${encodedText}`;
        
        currentCartTotal += 1;
        if (cartCountLabel) cartCountLabel.textContent = currentCartTotal;
        
        closeOrderModal();
        window.open(whatsappURL, '_blank');
    });
}
// ==========================================================================
// SCROLL SPY MECHANICS (DYNAMIC NAV LINK HIGHLIGHTING)
// ==========================================================================
const trackedSections = document.querySelectorAll('section[id]');
const headerNavLinkElements = document.querySelectorAll('.nav-links li a');

function activateNavMenuOnScroll() {
    // Determine the current vertical displacement position of the browser frame
    const currentScrollY = window.scrollY;

    trackedSections.forEach((sectionBlock) => {
        const sectionHeight = sectionBlock.offsetHeight;
        // Pushes the activation threshold trigger up by 150px to clear the fixed header line
        const sectionTopPosition = sectionBlock.offsetTop - 150; 
        const sectionIdAttr = sectionBlock.getAttribute('id');

        if (currentScrollY > sectionTopPosition && currentScrollY <= sectionTopPosition + sectionHeight) {
            // Remove the active class state from all elements
            headerNavLinkElements.forEach((linkNode) => {
                linkNode.classList.remove('active');
                
                // If the link anchor matches the current section in view, append the active look
                if (linkNode.getAttribute('href') === `#${sectionIdAttr}`) {
                    linkNode.classList.add('active');
                }
            });
        }
    });
}

// Attach the calculation engine to the browser scroll and page loading window lifecycles
window.addEventListener('scroll', activateNavMenuOnScroll);
window.addEventListener('DOMContentLoaded', activateNavMenuOnScroll);


// ==========================================================================
// CORE MOBILE MENU HAMBURGER & INTERACTIVE ACCORDION RESPONSIVENESS
// ==========================================================================
const mobileMenuTrigger = document.getElementById('mobileMenuTrigger');
const navContainerPanel = document.getElementById('navContainerPanel');
const menuToggleIcon = document.getElementById('menuToggleIcon');
const dropdownToggleBtn = document.getElementById('dropdownToggleBtn');
const nestedDropdownItem = document.querySelector('.dropdown');
const responsiveMenuCloseLinks = document.querySelectorAll('.nav-links li a:not(.dropdown-toggle)');

/**
 * Toggles responsive hidden full-screen mobile menu drawer views
 */
function toggleMobileMenuPanel() {
    navContainerPanel.classList.toggle('drawer-open');
    
    // Smoothly swap icon graphics between hamburger grid and clear close marks
    if (navContainerPanel.classList.contains('drawer-open')) {
        menuToggleIcon.setAttribute('name', 'close-outline');
        document.body.style.overflow = 'hidden'; // Freeze viewport text scrolling background
    } else {
        menuToggleIcon.setAttribute('name', 'menu-outline');
        document.body.style.overflow = 'auto';
        // Close accordion cascade as drawer wraps away out of focus
        nestedDropdownItem.classList.remove('accordion-active');
    }
}

// Bind drawer activation listener click sequence
if (mobileMenuTrigger) {
    mobileMenuTrigger.addEventListener('click', toggleMobileMenuPanel);
}

// Implement Accordion Push Down for the Cakes link
if (dropdownToggleBtn && nestedDropdownItem) {
    dropdownToggleBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Stop anchor target hash changes immediately
        event.stopPropagation();
        nestedDropdownItem.classList.toggle('accordion-active');
    });
}

// Automatically close drawer when a standard anchor link is selected
responsiveMenuCloseLinks.forEach((linkNode) => {
    linkNode.addEventListener('click', () => {
        if (navContainerPanel.classList.contains('drawer-open')) {
            toggleMobileMenuPanel();
        }
    });
});

// ==========================================================================
// INTERSECTION OBSERVER SCROLL ANIMATOR ENGINE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Configuration details for our screen window listener entry margins
    const scrollObserverOptions = {
        root: null,          // Uses the default browser viewport screen area
        rootMargin: '0px',   // No expansion bleeding thresholds padding
        threshold: 0.12      // Triggers when at least 12% of the item is visible on screen
    };

    const scrollAnimationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Check if the specific target element has scrolled into view
            if (entry.isIntersecting) {
                // Add our active CSS class to trigger the smooth rise transition
                entry.target.classList.add('revealed');
                
                // Stop observing this element once it has animated into view
                observer.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    // Collect all tagged nodes and feed them into our calculation engine
    const itemsToReveal = document.querySelectorAll('.reveal-item');
    itemsToReveal.forEach(item => {
        scrollAnimationObserver.observe(item);
    });
});
