# 🚀 Quick Start Guide - DataFlow Admin Backend

## In 5 Minutes You'll Have:
✅ Working admin dashboard  
✅ Database storing orders  
✅ Order management system  
✅ Real-time statistics  

## Step 1: Install (2 minutes)

Open PowerShell in your project folder:

```bash
npm install
```

## Step 2: Start Server (1 minute)

```bash
npm start
```

You'll see:
```
Server running at: http://localhost:3000
Admin Panel: http://localhost:3000/admin
```

## Step 3: Login to Dashboard (30 seconds)

Go to: `http://localhost:3000/admin`

Username: `admin`  
Password: `admin123`

## Step 4: Integrate with Buy Page (90 seconds)

Open `INTEGRATION_SNIPPET.js` and copy the `sendOrderToAdminBackend()` function.

Paste it into your `js/app.js` file.

Find where your app handles successful payment and add:
```javascript
sendOrderToAdminBackend(orderData);
```

## Done! ✨

Now when customers complete a purchase, orders automatically appear in your admin dashboard.

---

## What You Can Do Now:

### 📊 View Dashboard
- See total orders and revenue
- Track completion rates
- Monitor pending orders

### 📋 Manage Orders
- Search by customer name, email, phone
- Filter by network (MTN, Telecel, AirtelTigo)
- Filter by status (pending, completed, failed)
- View full order details
- Delete orders if needed

### 📈 Analytics
- Order breakdown by network
- Success/failure rates
- Average order values
- Revenue tracking

### 📥 Export Data
- Download all orders as CSV
- Use in Excel for accounting
- Backup your order data

---

## Need Help?

### Server won't start?
```
Check if Node.js is installed: node --version
```

### Can't login?
- Make sure server is running
- Check if `http://localhost:3000/api/health` works
- Try clearing browser cache

### Orders not appearing?
- Verify `sendOrderToAdminBackend()` is in app.js
- Check Network tab in browser (F12)
- Look for JavaScript errors in console

---

## File Structure

```
your-project/
├── server.js              ← Backend server
├── admin.html            ← Admin dashboard
├── package.json          ← Dependencies
├── database/
│   └── orders.db        ← Order storage (auto-created)
├── js/
│   ├── app.js           ← Add integration here
│   └── admin-dashboard.js
└── css/
    └── admin-style.css
```

---

## Next Steps

1. **Customize Colors** - Edit `css/admin-style.css` line 5-20 (CSS variables)
2. **Change Password** - Use a database tool to update admin password
3. **Setup Backup** - Back up `database/orders.db` regularly
4. **Go Live** - Deploy to production when ready

---

## Key Endpoints

| Endpoint | Purpose |
|----------|---------|
| `POST /api/admin/login` | Login to system |
| `GET /api/orders` | Get all orders |
| `POST /api/orders` | Create new order |
| `GET /api/orders/:id` | View order details |
| `DELETE /api/orders/:id` | Delete order |
| `GET /api/orders/stats` | Get statistics |
| `GET /api/orders/export/csv` | Export to CSV |

---

## Support Files

📄 **SETUP_GUIDE.md** - Detailed setup instructions  
📄 **ADMIN_README.md** - Complete documentation  
📄 **INTEGRATION_SNIPPET.js** - Code to add to app.js  

---

**You're all set! Start the server and enjoy your new admin backend! 🎉**
