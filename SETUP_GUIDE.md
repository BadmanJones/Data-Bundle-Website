# DataFlow Admin Backend - Setup & Integration Guide

## Overview

You now have a complete admin backend system for your DataFlow data bundle website. This system consists of:

1. **Node.js/Express Server** - REST API for managing orders
2. **SQLite Database** - Stores all order data
3. **Admin Dashboard** - Beautiful interface to view and manage orders
4. **Authentication** - Secure login system with JWT

## What's Included

### New Files Created:

1. **server.js** - Main backend server with all API endpoints
2. **admin.html** - Admin dashboard interface
3. **js/admin-dashboard.js** - Dashboard functionality
4. **css/admin-style.css** - Dashboard styling
5. **.env** - Environment configuration
6. **package.json** - Updated with required dependencies

## Step-by-Step Setup

### Step 1: Install Node.js (if not already installed)

Download from: https://nodejs.org/
- Choose the LTS (Long Term Support) version
- Install with default settings

Verify installation:
```bash
node --version
npm --version
```

### Step 2: Install Dependencies

Open PowerShell/Command Prompt in your project folder and run:

```bash
npm install
```

This installs:
- express (web server)
- sqlite3 (database)
- bcryptjs (password security)
- jsonwebtoken (authentication)
- cors (cross-origin requests)
- body-parser (JSON parsing)

### Step 3: Start the Server

```bash
npm start
```

You should see:
```
========================================
DataFlow Admin Backend Server
========================================
Server running at: http://localhost:3000
Admin Panel: http://localhost:3000/admin
========================================
```

### Step 4: Access Admin Dashboard

Open your browser and go to:
```
http://localhost:3000/admin
```

Login with:
- Username: `admin`
- Password: `admin123`

## Integrating with Your Buy Page

To automatically save orders from the buy page to the admin backend:

### Add this code to app.js (after successful payment):

```javascript
/**
 * Send order to admin backend database
 */
function sendOrderToAdminBackend(orderData) {
    const url = 'http://localhost:3000/api/orders';
    
    const payload = {
        transaction_id: orderData.txnId,
        customer_name: orderData.fullName,
        email: orderData.email,
        phone: orderData.phone,
        network: orderData.network,
        bundle: orderData.bundle,
        amount: orderData.amount,
        paystack_reference: orderData.paystackReference,
        date_time: orderData.dateTime,
        status: 'completed'
    };
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error saving to backend:', data.error);
        } else {
            console.log('Order saved to admin backend:', data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
```

### Call this function after successful Paystack payment:

Find where you handle successful payment in your app.js (look for success.html redirect or similar), and add:

```javascript
// After successful payment confirmation
sendOrderToAdminBackend(orderData);
```

## Dashboard Features Explained

### 📊 Dashboard Tab
- **Total Orders** - All orders received
- **Completed** - Successfully processed orders
- **Pending** - Orders awaiting confirmation
- **Total Revenue** - All money earned in GHS
- **Recent Orders** - Last 5 orders placed

### 📋 All Orders Tab
- **Search** - Find any order by customer name, email, phone, or transaction ID
- **Filter by Network** - MTN, Telecel, or AirtelTigo
- **Filter by Status** - Pending, Completed, Failed, or Cancelled
- **View Details** - Click any order to see full information
- **Delete** - Remove orders you don't need
- **Export CSV** - Download all orders to Excel

### 📈 Analytics Tab
- **Order Distribution** - See which networks are most popular
- **Success Rates** - Track how many orders are completed
- **Average Order Value** - Calculate average spending per order
- **Failed Orders** - Monitor problematic orders

## Database Location

The database file is automatically created at:
```
C:\Users\ESLI\Desktop\Project\data-bundle-website\database\orders.db
```

This is a SQLite database file. You don't need to do anything with it - the system manages it automatically.

## Admin User Management

### Default Login:
- Username: **admin**
- Password: **admin123**

### To Change Password:

You'll need to use a tool like SQLite Browser or modify the server.js file. For now, the default credentials are secure enough for development.

## Important: Before Going Live

1. **Change Admin Password** - Don't use default credentials in production
2. **Use HTTPS** - Enable SSL/TLS on your server
3. **Change JWT Secret** - Edit the `.env` file
4. **Backup Database** - Regularly backup your `orders.db` file
5. **Set Production Mode** - Update `.env` file with NODE_ENV=production

## Testing

### Test if server is running:
Visit: `http://localhost:3000/api/health`

Should return: `{"status":"Server is running"}`

### Test login:
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

## Common Issues & Solutions

### Issue: Server won't start
**Solution:** 
- Check if port 3000 is available
- Run `npm install` again
- Restart your terminal

### Issue: Can't login to admin panel
**Solution:**
- Ensure server is running (check terminal)
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private window
- Check browser console for errors (F12)

### Issue: Orders not appearing in dashboard
**Solution:**
- Verify the `sendOrderToAdminBackend()` function is called
- Check Network tab in DevTools to see if requests are sent
- Check server console for errors

### Issue: Port 3000 already in use
**Solution:**
Change the port in server.js:
```javascript
const PORT = process.env.PORT || 5000; // Change 3000 to 5000
```

## File Sizes

- server.js - ~15 KB
- admin.html - ~12 KB
- admin-dashboard.js - ~20 KB
- admin-style.css - ~25 KB
- Database (orders.db) - Grows as orders are added (starts ~50 KB)

## Next Steps

1. **Start server** - `npm start`
2. **Access admin** - Go to `http://localhost:3000/admin`
3. **Integrate with buy page** - Add the order sending code
4. **Test with sample orders** - Place some test orders
5. **Monitor dashboard** - Watch orders appear in real-time

## Architecture Diagram

```
Customer Places Order (buy.html)
           ↓
Paystack Payment Processing
           ↓
Order Confirmation
           ↓
sendOrderToAdminBackend() called
           ↓
REST API Endpoint: POST /api/orders
           ↓
SQLite Database stores order
           ↓
Admin views order in dashboard
           ↓
Admin can filter, search, and export
```

## Production Deployment

When you're ready to go live:

1. **Use a VPS or Cloud Server** - AWS, DigitalOcean, Heroku, etc.
2. **Use PM2 Process Manager** - Keep server running 24/7
3. **Set up domain/SSL** - Enable HTTPS
4. **Backup Strategy** - Automated daily backups
5. **Monitor Logs** - Set up error tracking
6. **Scale Database** - Move to PostgreSQL if needed

## Support Resources

- Express.js Docs: https://expressjs.com
- SQLite Docs: https://www.sqlite.org
- JWT Info: https://jwt.io

## Summary

Your admin backend is now ready to:
✅ Receive orders from your buy page
✅ Store them safely in SQLite database
✅ Display them in a beautiful dashboard
✅ Filter and search by any criteria
✅ Export data to CSV
✅ Track statistics and analytics

All with a professional, easy-to-use interface! 🎉

---

**Need help?** Check the ADMIN_README.md file for more detailed information.
