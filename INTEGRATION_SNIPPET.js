/**
 * INTEGRATION SNIPPET FOR app.js
 * 
 * Add this function to your js/app.js file to send orders to the admin backend
 * This will automatically save orders to the database when customers complete payment
 */

/* ============================================
   ADMIN BACKEND INTEGRATION
   ============================================ */

/**
 * Send order to admin backend database
 * Call this function after successful Paystack payment
 */
function sendOrderToAdminBackend(orderData) {
    const backendUrl = 'http://localhost:3000/api/orders';
    
    const payload = {
        transaction_id: orderData.txnId,
        customer_name: orderData.fullName,
        email: orderData.email,
        phone: orderData.phone,
        network: orderData.network,
        bundle: orderData.bundle,
        amount: orderData.amount,
        paystack_reference: orderData.paystackReference || '',
        date_time: orderData.dateTime,
        status: 'completed'
    };
    
    fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error saving to admin backend:', data.error);
            // Order was saved to Airtable, but backend save failed
            // This is not critical
        } else {
            console.log('Order successfully saved to admin backend:', data);
        }
    })
    .catch(error => {
        console.error('Cannot reach admin backend. Order saved to Airtable only.', error);
        // If backend is down, orders are still saved to Airtable
    });
}

/**
 * USAGE INSTRUCTIONS:
 * 
 * 1. Copy this entire function to your js/app.js file
 * 
 * 2. Find where your app.js handles successful Paystack payment
 *    (Look for where it redirects to success.html or shows success message)
 * 
 * 3. After payment success confirmation, add this line:
 *    sendOrderToAdminBackend(orderData);
 * 
 * 4. Make sure orderData object contains all required fields:
 *    - txnId: Transaction ID
 *    - fullName: Customer full name
 *    - email: Customer email
 *    - phone: Customer phone number
 *    - network: Selected network (mtn, telecel, airteltigo)
 *    - bundle: Selected data bundle
 *    - amount: Order amount in GHS
 *    - paystackReference: Paystack reference (if available)
 *    - dateTime: Date and time of order
 * 
 * EXAMPLE OF WHERE TO ADD IT:
 * 
 * // In your current handlePaymentSuccess function
 * function handlePaymentSuccess(response) {
 *     const orderData = {
 *         txnId: generateTransactionID(),
 *         fullName: fullNameInput.value,
 *         email: emailInput.value,
 *         phone: phoneInput.value,
 *         network: networkSelect.value,
 *         bundle: bundleSelect.value,
 *         amount: parseFloat(amountDisplay.textContent),
 *         paystackReference: response.reference,
 *         dateTime: getCurrentDateTime()
 *     };
 *     
 *     // Send to Airtable (existing code)
 *     sendOrderToAirtable(orderData);
 *     
 *     // ADD THIS LINE:
 *     sendOrderToAdminBackend(orderData);
 *     
 *     // Redirect to success page
 *     window.location.href = 'success.html';
 * }
 * 
 * NOTES:
 * - The backend server must be running on http://localhost:3000
 * - If backend is not reachable, order is still saved to Airtable (no data loss)
 * - Orders are marked as 'completed' when they come from successful payments
 * - Backend validates all required fields and will reject incomplete orders
 */

/* ============================================
   QUICK START CHECKLIST
   ============================================ */

/*
 * ✓ Install backend: npm install
 * ✓ Start server: npm start
 * ✓ Copy this function to app.js
 * ✓ Add sendOrderToAdminBackend() call after payment success
 * ✓ Test order placement on buy page
 * ✓ Check admin dashboard for orders
 * ✓ Verify orders appear in http://localhost:3000/admin
 * 
 * All done! 🎉
 */
