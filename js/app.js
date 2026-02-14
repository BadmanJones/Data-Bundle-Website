/* ============================================
   DATA CONFIGURATION
   ============================================ */

const DATA_BUNDLES = {
    mtn: [
        { name: '1GB', value: '1gb', price: 6.00, validity: '30 days' },
        { name: '2GB', value: '2gb', price: 11.00, validity: '30 days' },
        { name: '3GB', value: '3gb', price: 15.00, validity: '30 days' },
        { name: '4GB', value: '4gb', price: 21.00, validity: '30 days' },
        { name: '5GB', value: '5gb', price: 26.00, validity: '30 days' },
        { name: '6GB', value: '6gb', price: 30.00, validity: '30 days' },
        { name: '8GB', value: '8gb', price: 40.00, validity: '30 days' },
        { name: '10GB', value: '10gb', price: 47.00, validity: '30 days' },
        { name: '20GB', value: '20gb', price: 89.00, validity: '30 days' },
        {name: '25GB', value: '25gb', price: 108.00, validity: '30 days' },
        { name: '30GB', value: '30gb', price: 130.00, validity: '30 days' },
        { name: '40GB', value: '40gb', price: 170.00, validity: '30 days' },
        { name: '50GB', value: '50gb', price: 220.00, validity: '30 days' },
        { name: '100GB', value: '100gb', price: 390.00, validity: '30 days' },

    ],
    telecel: [
        { name: '5GB', value: '5gb', price: 22.00, validity: '30 days' },
        { name: '10GB', value: '10gb', price: 45.00, validity: '30 days' },
        { name: '15GB', value: '15gb', price: 65.00, validity: '30 days' },
        { name: '20GB', value: '20gb', price: 85.00, validity: '30 days' },
        { name: '25GB', value: '25gb', price: 105.00, validity: '30 days' },
        { name: '30GB', value: '30gb', price: 125.00, validity: '30 days' },
        { name: '40GB', value: '40gb', price: 155.00, validity: '30 days' },
        { name: '50GB', value: '50gb', price: 200.00, validity: '30 days' },
        { name: '100GB', value: '100gb', price: 380.00, validity: '30 days' },
    ],
    airteltigo: [
        { name: '1GB', value: '1gb', price: 5.00, validity: '30 days' },
        { name: '2GB', value: '2gb', price: 10.00, validity: '30 days' },
        { name: '3GB', value: '3gb', price: 14.00, validity: '30 days' },
        { name: '4GB', value: '4gb', price: 18.00, validity: '30 days' },
        { name: '5GB', value: '5gb', price: 25.00, validity: '30 days' },
        { name: '6GB', value: '6gb', price: 30.00, validity: '30 days' },
        { name: '7GB', value: '7gb', price: 34.00, validity: '30 days' },
        { name: '8GB', value: '8gb', price: 37.00, validity: '30 days' },
        { name: '10GB', value: '10gb', price: 47.00, validity: '30 days' },
        { name: '15GB', value: '15gb', price: 65.00, validity: '30 days' },
        { name: '20GB', value: '20gb', price: 70.00, validity: '30 days' },
        { name: '30GB', value: '30gb', price: 95.00, validity: '30 days' },
        { name: '40GB', value: '40gb', price: 110.00, validity: '30 days' },
        { name: '50GB', value: '50gb', price: 130.00, validity: '30 days' },
        {name: '60GB', value: '60gb', price: 145.00, validity: '30 days' },
        { name: '80GB', value: '80gb', price: 180.00, validity: '30 days' },
        { name: '100GB', value: '100gb', price: 350.00, validity: '30 days' },
    ],
};

const NETWORKS = {
    mtn: { name: 'MTN', logo: '📱' },
    telecel: { name: 'Telecel', logo: '📱' },
    airteltigo: { name: 'AirtelTigo', logo: '📱' },
};

/* ============================================
   PAYSTACK CONFIGURATION
   ============================================ */

// Replace this with your actual Paystack public key
const PAYSTACK_PUBLIC_KEY = 'REDACTED'; // Live key
const PAYSTACK_EMAIL_FOR_TESTING = 'test@example.com'; // For testing purposes

// Check if Paystack key is configured
function isPaystackConfigured() {
    return PAYSTACK_PUBLIC_KEY && PAYSTACK_PUBLIC_KEY !== 'pk_test_your_public_key_here';
}

/**
 * Test function to verify success page works
 */
function testSuccessPage() {
    const testData = {
        txnId: 'TEST-' + Date.now(),
        paystackReference: 'TEST-REF-' + Date.now(),
        network: 'MTN',
        bundle: '2GB',
        phone: '0201234567',
        amount: 10.99,
        fullName: 'Test User',
        email: 'test@example.com',
        dateTime: new Date().toLocaleString(),
        status: 'success'
    };
    
    console.log('Setting test data in session storage:', testData);
    sessionStorage.setItem('transactionData', JSON.stringify(testData));
    console.log('Redirecting to success.html...');
    window.location.href = 'success.html';
}

/* ============================================
   AIRTABLE CONFIGURATION - REMOVED
   Using Admin Backend Database Instead
   ============================================ */

/**
 * Send order data to Admin Backend Database
 */
function sendOrderToAdminBackend(orderData) {
    console.log('=== sendOrderToAdminBackend called ===');
    console.log('Order data received:', orderData);
    
    const backendUrl = 'http://localhost:3000/api/orders';
    
    const payload = {
        transaction_id: orderData.txnId,
        customer_name: orderData.fullName,
        email: orderData.email,
        phone: orderData.phone,
        network: orderData.network.toLowerCase(),
        bundle: orderData.bundle,
        amount: orderData.amount,
        paystack_reference: orderData.paystackReference || '',
        date_time: orderData.dateTime,
        status: 'completed'
    };
    
    console.log('Prepared payload for backend:', payload);
    
    fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        console.log('Backend response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Backend response data:', data);
        if (data.error) {
            console.error('Error saving to admin backend:', data.error);
            showToast('Warning: Order not saved to database', 'warning');
        } else {
            console.log('Order saved to admin backend successfully:', data);
            showToast('Order saved to admin system', 'success');
        }
    })
    .catch(error => {
        console.error('Error connecting to backend:', error);
        showToast('Warning: Backend unreachable. Ensure server is running.', 'warning');
    });
}

/**
 * Export order details to Excel file
 */
function exportOrderToExcel(orderData) {
    try {
        // Download the complete order history from backend
        // This will include the current order plus all previous orders
        const backendUrl = 'http://localhost:3000/api/orders/export/excel';
        
        fetch(backendUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `DataFlow_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
                console.log('Order history exported to Excel successfully');
                showToast('Complete order history downloaded', 'success');
            })
            .catch(error => {
                console.error('Error downloading order history:', error);
                // Fallback: create individual order receipt
                createIndividualReceipt(orderData);
            });
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        showToast('Error creating Excel file', 'error');
    }
}

/**
 * Create individual order receipt if full history unavailable
 */
function createIndividualReceipt(orderData) {
    try {
        const workbook = XLSX.utils.book_new();
        
        const worksheetData = [
            ['DataFlow - Order Receipt'],
            [],
            ['Field', 'Details'],
            ['Transaction ID', orderData.txnId],
            ['Customer Name', orderData.fullName],
            ['Email', orderData.email],
            ['Phone', orderData.phone],
            ['Network', orderData.network],
            ['Bundle', orderData.bundle],
            ['Amount (GHS)', orderData.amount],
            ['Paystack Reference', orderData.paystackReference || ''],
            ['Date & Time', orderData.dateTime],
            ['Status', orderData.status]
        ];
        
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        worksheet['!cols'] = [{ wch: 20 }, { wch: 30 }];
        
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Order Details');
        
        const date = new Date().toISOString().slice(0, 10);
        const filename = `DataFlow_Order_${orderData.txnId}_${date}.xlsx`;
        
        XLSX.writeFile(workbook, filename);
        console.log('Individual order receipt created');
    } catch (error) {
        console.error('Error creating receipt:', error);
    }
}

/* ============================================
   DOM ELEMENTS
   ============================================ */

const purchaseForm = document.getElementById('purchaseForm');
const networkSelect = document.getElementById('network');
const bundleSelect = document.getElementById('bundle');
const phoneInput = document.getElementById('phone');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const amountDisplay = document.getElementById('amount');
const payButton = document.getElementById('payButton');
const toast = document.getElementById('toast');

// Summary elements
const summaryNetwork = document.getElementById('summaryNetwork');
const summaryBundle = document.getElementById('summaryBundle');
const summaryPhone = document.getElementById('summaryPhone');
const summaryPrice = document.getElementById('summaryPrice');
const phoneError = document.getElementById('phoneError');
const emailError = document.getElementById('emailError');

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Validate Ghanaian phone number
 */
function validatePhoneNumber(phoneNumber) {
    // Valid Ghanaian phone formats:
    // 0201234567, 0551234567, 0541234567, etc.
    const ghanaianPhoneRegex = /^0[235679]\d{8}$/;
    return ghanaianPhoneRegex.test(phoneNumber.replace(/\s+/g, ''));
}

/**
 * Format currency to GHS
 */
function formatCurrency(amount) {
    return `GHS ${amount.toFixed(2)}`;
}

/**
 * Generate transaction ID
 */
function generateTransactionID() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `TXN-2024-${timestamp}${random}`.slice(0, 17);
}

/**
 * Get current formatted date and time
 */
function getCurrentDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    return now.toLocaleDateString('en-GB', options).replace(/\//g, '-');
}

/* ============================================
   FORM LOGIC
   ============================================ */

/**
 * Populate bundle options based on selected network
 */
function updateBundles() {
    const selectedNetwork = networkSelect.value;

    // Clear existing options
    bundleSelect.innerHTML = '<option value="">Select a bundle...</option>';

    if (!selectedNetwork) {
        bundleSelect.disabled = true;
        return;
    }

    bundleSelect.disabled = false;

    // Populate with new bundles
    const bundles = DATA_BUNDLES[selectedNetwork];
    bundles.forEach((bundle) => {
        const option = document.createElement('option');
        option.value = bundle.value;
        option.textContent = `${bundle.name} - ${formatCurrency(bundle.price)}`;
        bundleSelect.appendChild(option);
    });

    // Reset bundle selection
    bundleSelect.value = '';
    updatePrice();
    updateSummary();
}

/**
 * Update price display based on selected bundle
 */
function updatePrice() {
    const selectedNetwork = networkSelect.value;
    const selectedBundleValue = bundleSelect.value;

    if (!selectedNetwork || !selectedBundleValue) {
        amountDisplay.textContent = '0.00';
        return;
    }

    const bundle = DATA_BUNDLES[selectedNetwork].find(
        (b) => b.value === selectedBundleValue
    );

    if (bundle) {
        amountDisplay.textContent = bundle.price.toFixed(2);
    }
}

/**
 * Update order summary display
 */
function updateSummary() {
    const selectedNetwork = networkSelect.value;
    const selectedBundleValue = bundleSelect.value;
    const phoneNumber = phoneInput.value;

    if (selectedNetwork) {
        summaryNetwork.textContent = NETWORKS[selectedNetwork].name;
    } else {
        summaryNetwork.textContent = '-';
    }

    if (selectedBundleValue) {
        const bundle = DATA_BUNDLES[selectedNetwork].find(
            (b) => b.value === selectedBundleValue
        );
        summaryBundle.textContent = bundle.name;
    } else {
        summaryBundle.textContent = '-';
    }

    summaryPhone.textContent = phoneNumber || '-';

    const amount = amountDisplay.textContent;
    summaryPrice.textContent = formatCurrency(parseFloat(amount));
}

/**
 * Validate phone number input
 */
function validatePhone() {
    const phoneNumber = phoneInput.value.trim();

    if (!phoneNumber) {
        phoneError.textContent = 'Phone number is required';
        return false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
        phoneError.textContent = 'Please enter a valid Ghanaian phone number (e.g., 0201234567)';
        return false;
    }

    phoneError.textContent = '';
    return true;
}

/**
 * Validate email address
 */
function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        emailError.textContent = 'Email is required';
        return false;
    }

    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    }

    emailError.textContent = '';
    return true;
}

/**
 * Check if all form fields are valid and enable/disable pay button
 */
function validateForm() {
    const hasNetwork = networkSelect.value !== '';
    const hasBundle = bundleSelect.value !== '';
    const phoneNumber = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const name = fullNameInput.value.trim();

    // Check phone format
    const hasValidPhone = phoneNumber && validatePhoneNumber(phoneNumber);
    
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = email && emailRegex.test(email);
    
    const hasName = name !== '';

    const isValid = hasNetwork && hasBundle && hasValidPhone && hasValidEmail && hasName;
    
    // Debug logging
    console.log('Form Validation:', {
        hasNetwork,
        hasBundle,
        hasValidPhone,
        hasValidEmail,
        hasName,
        isValid
    });
    
    payButton.disabled = !isValid;

    return isValid;
}

/**
 * Handle form submission - Integrate with Paystack
 */
function handleFormSubmit(event) {
    event.preventDefault();

    // Re-validate to ensure all fields are correct
    const selectedNetwork = networkSelect.value;
    const selectedBundleValue = bundleSelect.value;
    const phoneNumber = phoneInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();

    // Validate all fields
    if (!selectedNetwork || !selectedBundleValue || !phoneNumber || !fullName || !email) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    // Validate phone format
    if (!validatePhoneNumber(phoneNumber)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Check if Paystack is configured
    if (!isPaystackConfigured()) {
        showToast('Payment system not configured. Please contact admin.', 'error');
        console.error('Paystack public key not configured');
        return;
    }

    const bundle = DATA_BUNDLES[selectedNetwork].find(
        (b) => b.value === selectedBundleValue
    );

    if (!bundle) {
        showToast('Invalid bundle selected', 'error');
        return;
    }

    // Convert amount to pesewas (Paystack uses pesewas, 1 GHS = 100 pesewas)
    const amountInPesewas = Math.round(bundle.price * 100);

    // Show loading state
    payButton.classList.add('loading');

    // Initialize Paystack payment
    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email || PAYSTACK_EMAIL_FOR_TESTING,
        amount: amountInPesewas,
        currency: 'GHS',
        ref: generateTransactionID(),
        metadata: {
            custom_fields: [
                {
                    display_name: "Phone Number",
                    variable_name: "phone_number",
                    value: phoneNumber
                },
                {
                    display_name: "Network",
                    variable_name: "network",
                    value: NETWORKS[selectedNetwork].name
                },
                {
                    display_name: "Bundle",
                    variable_name: "bundle",
                    value: bundle.name
                }
            ]
        },
        onClose: function() {
            console.log('=== PAYSTACK MODAL CLOSED ===');
            payButton.classList.remove('loading');
            showToast('Payment window closed', 'error');
        },
        onSuccess: function(response) {
            // Payment successful
            console.log('=== PAYMENT SUCCESS CALLBACK TRIGGERED ===');
            console.log('Response:', response);
            
            // Clear the fallback timeout since callback actually fired
            if (window.paymentTimeoutId) {
                clearTimeout(window.paymentTimeoutId);
                console.log('Cleared fallback timeout');
            }
            
            const transactionData = {
                txnId: response.reference,
                paystackReference: response.reference,
                network: NETWORKS[selectedNetwork].name,
                bundle: bundle.name,
                phone: phoneNumber,
                amount: bundle.price,
                fullName: fullName,
                email: email,
                dateTime: getCurrentDateTime(),
                status: 'success'
            };

            console.log('Transaction data:', transactionData);

            // Store in session storage for success page
            sessionStorage.setItem('transactionData', JSON.stringify(transactionData));
            console.log('Stored in session storage');

            payButton.classList.remove('loading');
            showToast('Payment successful! Redirecting...', 'success');

            // Redirect to success page (order will be sent from success.html)
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 1500);
        }
    });

    // Open Paystack payment modal
    console.log('Opening Paystack payment modal with key:', PAYSTACK_PUBLIC_KEY);
    handler.openIframe();

    // WORKAROUND: Fallback redirect after 30 seconds if onSuccess callback doesn't fire
    // This handles cases where Paystack callbacks are unreliable
    const timeoutId = setTimeout(() => {
        console.log('30-second timeout triggered - checking if still loading');
        if (payButton && payButton.classList.contains('loading')) {
            console.log('Modal still open and loading, forcing redirect as fallback');
            const transactionData = {
                txnId: 'TXN-' + Date.now(),
                paystackReference: 'REF-' + Date.now(),
                network: NETWORKS[selectedNetwork].name,
                bundle: bundle.name,
                phone: phoneNumber,
                amount: bundle.price,
                fullName: fullName,
                email: email,
                dateTime: getCurrentDateTime(),
                status: 'pending_verification'
            };
            
            console.log('Fallback transaction data:', transactionData);
            sessionStorage.setItem('transactionData', JSON.stringify(transactionData));
            payButton.classList.remove('loading');
            showToast('Payment processing...', 'success');
            
            // DO NOT send to backend - only send if Paystack confirms payment
            
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 1000);
        }
    }, 30000);

    // Store timeout ID so we can clear it if onSuccess fires
    window.paymentTimeoutId = timeoutId;
}

/* ============================================
   PAYMENT PROCESSING
   ============================================ */

// Payment is now handled by Paystack's redirect parameter
// Success page checks for reference in URL

/* ============================================
   SUCCESS PAGE LOGIC
   ============================================ */

/**
 * Populate success page with transaction data
 */
function populateSuccessPage() {
    console.log('populateSuccessPage() called');
    const transactionDataStr = sessionStorage.getItem('transactionData');
    console.log('Transaction data from session storage:', transactionDataStr);
    
    if (!transactionDataStr) {
        console.warn('No transaction data found in session storage');
        return;
    }

    try {
        const transactionData = JSON.parse(transactionDataStr);
        console.log('Parsed transaction data:', transactionData);

        // Populate elements
        const txnIdElement = document.getElementById('txnId');
        const detailNetworkElement = document.getElementById('detailNetwork');
        const detailBundleElement = document.getElementById('detailBundle');
        const detailPhoneElement = document.getElementById('detailPhone');
        const detailAmountElement = document.getElementById('detailAmount');
        const detailDateElement = document.getElementById('detailDate');

        console.log('Found elements:', {
            txnId: !!txnIdElement,
            network: !!detailNetworkElement,
            bundle: !!detailBundleElement,
            phone: !!detailPhoneElement,
            amount: !!detailAmountElement,
            date: !!detailDateElement
        });

        if (txnIdElement) {
            txnIdElement.textContent = transactionData.txnId;
            console.log('Updated txnId to:', transactionData.txnId);
        }
        if (detailNetworkElement) {
            detailNetworkElement.textContent = transactionData.network;
            console.log('Updated network to:', transactionData.network);
        }
        if (detailBundleElement) {
            detailBundleElement.textContent = transactionData.bundle;
            console.log('Updated bundle to:', transactionData.bundle);
        }
        if (detailPhoneElement) {
            detailPhoneElement.textContent = transactionData.phone;
            console.log('Updated phone to:', transactionData.phone);
        }
        if (detailAmountElement) {
            detailAmountElement.textContent = formatCurrency(transactionData.amount);
            console.log('Updated amount to:', formatCurrency(transactionData.amount));
        }
        if (detailDateElement) {
            detailDateElement.textContent = transactionData.dateTime;
            console.log('Updated date to:', transactionData.dateTime);
        }
        
        console.log('Success page population completed');
    } catch (error) {
        console.error('Error populating success page:', error);
    }
}

/* ============================================
   EVENT LISTENERS
   ============================================ */

if (purchaseForm) {
    // Network selection change
    if (networkSelect) {
        networkSelect.addEventListener('change', () => {
            updateBundles();
            validateForm();
        });
    }

    // Bundle selection change
    if (bundleSelect) {
        bundleSelect.addEventListener('change', () => {
            updatePrice();
            updateSummary();
            validateForm();
        });
    }

    // Phone input change
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            updateSummary();
            validateForm();
        });

        phoneInput.addEventListener('blur', validatePhone);
    }

    // Full Name input change
    if (fullNameInput) {
        fullNameInput.addEventListener('input', () => {
            validateForm();
        });
    }

    // Email input change
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            validateForm();
        });

        emailInput.addEventListener('blur', validateEmail);
    }

    // Form submission
    purchaseForm.addEventListener('submit', handleFormSubmit);
}

/* ============================================
   PAGE INITIALIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the success page
    if (document.querySelector('.success-section')) {
        populateSuccessPage();
    }

    // Initialize slideshow
    initializeSlideshow();

    // Initialize form validation on buy page
    if (purchaseForm) {
        validateForm();
    }

    // Log app initialization
    console.log('[DataFlow] Application initialized successfully');
});

/* ============================================
   SLIDESHOW FUNCTIONALITY
   ============================================ */

let slideIndex = 1;
let slideshowInterval;

function initializeSlideshow() {
    console.log('Initializing slideshow...');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    console.log(`Found ${slides.length} slides and ${dots.length} dots`);
    
    // Only initialize if slides exist
    if (slides.length === 0) {
        console.log('No slides found on this page');
        return;
    }
    
    showSlide(slideIndex);
    
    // Auto-advance slides every 4 seconds
    slideshowInterval = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 4000);
    
    console.log('Slideshow initialized and auto-advance started');
}

function currentSlide(n) {
    console.log(`User clicked slide ${n}`);
    clearInterval(slideshowInterval);
    slideIndex = n;
    showSlide(slideIndex);
    // Restart auto-advance
    slideshowInterval = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 4000);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // If no slides found, exit early
    if (slides.length === 0 || dots.length === 0) {
        return;
    }

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
    
    console.log(`Showing slide ${slideIndex} of ${slides.length}`);
}

