// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Navigation highlighting
    highlightCurrentPage();
    
    // Initialize features based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'custom-cakes.html':
            initializeCakeBuilder();
            break;
        case 'order.html':
            initializeOrderForm();
            break;
    }
});

// Navigation highlighting
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Custom Cake Builder
function initializeCakeBuilder() {
    const cakeOptions = {
        size: ['6 inch', '8 inch', '10 inch', '12 inch'],
        flavors: ['Vanilla', 'Chocolate', 'Red Velvet', 'Carrot'],
        fillings: ['Buttercream', 'Chocolate Ganache', 'Fruit Compote', 'Cream Cheese'],
        frosting: ['Vanilla Buttercream', 'Chocolate Buttercream', 'Fondant', 'Whipped Cream']
    };

    let currentSelection = {
        size: '',
        flavor: '',
        filling: '',
        frosting: ''
    };

    // Create selection elements if they exist
    Object.keys(cakeOptions).forEach(option => {
        const select = document.getElementById(`cake-${option}`);
        if (select) {
            // Populate options
            cakeOptions[option].forEach(value => {
                const opt = document.createElement('option');
                opt.value = value.toLowerCase().replace(' ', '-');
                opt.textContent = value;
                select.appendChild(opt);
            });

            // Add change event listener
            select.addEventListener('change', (e) => {
                currentSelection[option] = e.target.value;
                updatePreview();
                updatePrice();
            });
        }
    });
}

// Order Form Initialization
function initializeOrderForm() {
    const form = document.getElementById('orderForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateForm();
    });

    // Add date picker constraints
    const deliveryDate = document.getElementById('delivery-date');
    if (deliveryDate) {
        // Set minimum date to 2 days from now
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 2);
        deliveryDate.min = minDate.toISOString().split('T')[0];
        
        // Set maximum date to 30 days from now
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        deliveryDate.max = maxDate.toISOString().split('T')[0];
    }
}

// Form validation
function validateForm() {
    // Add validation logic here
}

// Update cake preview
function updatePreview() {
    const previewElement = document.getElementById('cake-preview');
    if (!previewElement) return;
    
    // Update preview logic here
}

// Update price calculation
function updatePrice() {
    const priceElement = document.getElementById('cake-price');
    if (!priceElement) return;
    
    // Basic price calculation logic
    let basePrice = 0;
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentSelection.size) {
        switch(currentSelection.size) {
            case '6-inch': basePrice = 25; break;
            case '8-inch': basePrice = 35; break;
            case '10-inch': basePrice = 45; break;
            case '12-inch': basePrice = 60; break;
        }
    }
    
    // Add extras
    if (currentSelection.filling === 'chocolate-ganache') basePrice += 5;
    if (currentSelection.frosting === 'fondant') basePrice += 10;
    
    priceElement.textContent = `$${basePrice.toFixed(2)}`;
}