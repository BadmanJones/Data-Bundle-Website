# DataFlow - Setup & Installation Guide

Complete step-by-step guide to set up and run the DataFlow platform locally.

---

## 📋 Prerequisites

Before starting, ensure you have:

1. **Node.js** (14.x or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **A text editor** (VS Code recommended)
   - Download: https://code.visualstudio.com/

4. **A modern web browser**
   - Chrome, Firefox, Safari, or Edge

---

## 🚀 Installation Steps

### Step 1: Navigate to Project Folder

Open PowerShell/Command Prompt and navigate to your project:

```bash
cd C:\Users\ESLI\Desktop\Project\data-bundle-website
```

### Step 2: Install Dependencies

Install all required Node.js packages:

```bash
npm install
```

This installs:
- `express` - Web server framework
- `mongodb` - Database driver for MongoDB Atlas
- `cors` - Cross-origin support
- `body-parser` - JSON parsing
- `dotenv` - Environment variable management

**Output should show:** "added X packages in Y seconds"

### Step 3: Set Up MongoDB Database

#### A. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Sign Up** and create your account
3. Verify your email
4. Log in to your MongoDB dashboard

#### B. Create a Free Cluster

1. Click **Create Deployment**
2. Select **M0 (Shared)** - FREE forever
3. Choose your region and provider
4. Click **Create Deployment** (takes 2-5 minutes)

#### C. Create Database User

1. In sidebar, click **Database Access**
2. Click **Add New Database User**
3. Set:
   - Username: `dataflow` (or your choice)
   - Password: Create a strong password and **COPY IT**
   - Database Privileges: Read and write to any database
4. Click **Add User**

#### D. Get Connection String

1. Go to **Clusters** in sidebar
2. Click **Connect** on your cluster
3. Click **Drivers**
4. Select **Node.js**
5. Copy your connection string
6. **Replace `<password>` with your actual password**

Example:
```
mongodb+srv://dataflow:YourPassword@cluster.mongodb.net/dataflow?retryWrites=true&w=majority
```

#### E. Add to .env File

Create a `.env` file in your project root:

```env
PORT=3000
NODE_ENV=development
PAYSTACK_PUBLIC_KEY=pk_live_YOUR_KEY_HERE
DATABASE_URL=mongodb+srv://dataflow:YourPassword@cluster.mongodb.net/dataflow?retryWrites=true&w=majority
```

⚠️ **IMPORTANT:** Do NOT commit `.env` to Git (it's in .gitignore)

### Step 4: Start the Server

Launch the backend server:

```bash
npm start
```

**Expected output:**
```
✓ Connected to MongoDB
✓ Using database: dataflow
✓ Using collection: orders
DataFlow Order Management System v2.0.0
Server running at: http://localhost:3000
```

### Step 5: Open in Browser

Visit these URLs:

- **Homepage:** http://localhost:3000
- **Buy Data:** http://localhost:3000/buy.html
- **View Orders:** http://localhost:3000/orders.html

**You're done!** The platform is running with MongoDB. 🎉

---

## 🛑 Stopping the Server

To stop the server:
- Press `Ctrl + C` in the terminal

To restart:
- Run `npm start` again

---

## 📱 File Guide

| File | Purpose | Accessed At |
|------|---------|-----------|
| `index.html` | Homepage | http://localhost:3000 |
| `buy.html` | Purchase form | http://localhost:3000/buy.html |
| `success.html` | Confirmation page | Auto-loaded after payment |
| `orders.html` | Admin dashboard | http://localhost:3000/orders.html |
| `server.js` | Backend API | Powers all requests |
| `js/app.js` | Frontend logic | Used by all pages |
| `css/style.css` | Main styling | Main website styles |
| `css/orders.css` | Dashboard styling | orders.html styles |

---

## 💾 Database

### Automatic Setup
- SQLite database auto-creates at: `database/orders.db`
- Orders table auto-initializes on first server start
- No additional setup needed

### Database Structure
```
orders table:
├── id (primary key)
├── transaction_id (unique)
├── customer_name
├── email
├── phone
├── network
├── bundle
├── amount
├── paystack_reference
├── date_time
├── status
├── created_at
└── updated_at
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints Available

#### 1. Create Order
```
POST /api/orders
Content-Type: application/json

{
  "transaction_id": "TXN-xxx",
  "customer_name": "John Doe",
  "email": "john@example.com",
  "phone": "0551234567",
  "network": "mtn",
  "bundle": "2GB",
  "amount": 11.99,
  "paystack_reference": "REF-xxx",
  "date_time": "14-02-2026, 12:00:00",
  "status": "completed"
}
```

#### 2. Get All Orders
```
GET /api/orders
```

Response:
```json
{
  "orders": [
    {
      "id": 1,
      "transaction_id": "TXN-xxx",
      "customer_name": "John Doe",
      ...
    }
  ]
}
```

#### 3. Export to Excel
```
GET /api/orders/export/excel
```
Downloads orders as `.xlsx` file

---

## ⚙️ Configuration

### Paystack Integration

The Paystack live key is already configured in `js/app.js`:

```javascript
const PAYSTACK_PUBLIC_KEY = 'REDACTED';
```

This uses the **LIVE environment** for real transactions.

### Server Port

Default port: `3000`

To change, edit `server.js`:
```javascript
const PORT = process.env.PORT || 3000;
```

Then restart: `npm start`

### Environment Variables

Optional: Create `.env` file in root:
```
PORT=3000
NODE_ENV=production
```

---

## 🧪 Testing

### Test a Payment

1. Go to: http://localhost:3000/buy.html
2. Fill in the form:
   - Network: MTN
   - Bundle: 1GB
   - Phone: 0201234567
   - Name: Test User
   - Email: test@example.com
3. Click "Pay Now"
4. Complete Paystack payment
5. Should see success page
6. Check http://localhost:3000/orders.html - order should appear

### Test Orders Page

1. Go to: http://localhost:3000/orders.html
2. Should show all orders with:
   - Total orders count
   - Total revenue (GHS)
   - Full order table
   - Excel download button
3. Click "Refresh" button - should update
4. Wait 30 seconds - should auto-refresh

---

## 🐛 Troubleshooting

### Issue: "npm: The term 'npm' is not recognized"

**Solution:** Node.js not installed
1. Download from: https://nodejs.org/
2. Install with default settings
3. Restart terminal
4. Run `npm --version` to verify

### Issue: "Error: listen EADDRINUSE: address already in use :::3000"

**Solution:** Port 3000 is in use
1. Close other applications using port 3000
2. Or change port in `server.js`
3. Restart server: `npm start`

### Issue: Server starts but pages won't load

**Solution:** Try hard refresh
1. Press `Ctrl + Shift + R` (hard refresh)
2. Or use browser's developer tools (F12) and clear cache
3. Check server console for errors
4. Check browser console (F12) for errors

### Issue: Orders not saving to database

**Solution:** Check database connection
1. Verify `database/orders.db` exists
2. Check server console for error messages
3. Verify Paystack payment succeeded
4. Check that payment data includes all required fields

### Issue: Paystack payment not working

**Solution:** Payment integration issue
1. Verify live key is configured: `js/app.js` line 66
2. Check browser console (F12) for JavaScript errors
3. Verify network connectivity
4. Test with different amount
5. Check Paystack dashboard for transaction logs

---

## 📊 Monitoring

### Server Console
Watch the terminal for:
- Server startup message
- Error logs
- API request logs (if enabled)

### Browser Console
Press `F12` in browser and check:
- JavaScript errors
- Network requests
- Payment callbacks

Look for: `=== PAYMENT SUCCESS CALLBACK TRIGGERED ===`

### Orders Database
Quick check:
1. Go to http://localhost:3000/orders.html
2. Should display all orders with stats
3. Total Orders count
4. Total Revenue (GHS)

---

## 🔄 Workflow

### Customer Journey
1. Customer visits: http://localhost:3000/buy.html
2. Selects network and data bundle
3. Enters contact information
4. Clicks "Pay Now"
5. Paystack modal opens
6. Completes payment
7. Sees confirmation on success.html
8. Order saved to database

### Admin Workflow
1. Admin visits: http://localhost:3000/orders.html
2. Sees dashboard with statistics
3. Views all customer orders
4. Can download orders as Excel
5. Dashboard auto-refreshes every 30 seconds

---

## 📈 Scaling

### For Local Testing
- Current setup works perfectly
- Handles 100+ orders easily
- SQLite sufficient for small scale

### For Production
- Recommended: Move to PostgreSQL
- Set up backup system
- Enable HTTPS/SSL
- Use Node process manager (PM2)
- Set up reverse proxy (nginx)

---

## 🔐 Security Notes

### Current Setup
- ✅ Paystack handles payment security
- ✅ Data stored locally
- ✅ CORS enabled for development

### For Production
- ⚠️ Add authentication to orders.html
- ⚠️ Enable HTTPS/SSL
- ⚠️ Set up database backups
- ⚠️ Use environment variables for secrets
- ⚠️ Implement rate limiting

---

## 📦 Project Structure

```
data-bundle-website/
├── server.js                 # Backend server
├── package.json             # Dependencies list
├── package-lock.json        # Locked versions
├── .gitignore              # Git ignore rules
├── index.html              # Homepage
├── buy.html                # Purchase page
├── success.html            # Confirmation page
├── orders.html             # Admin dashboard
├── database/               # Database folder
│   └── orders.db          # SQLite database
├── js/
│   └── app.js             # Main application logic
├── css/
│   ├── style.css          # Main styles
│   └── orders.css         # Dashboard styles
├── Images/
│   └── (image files)
└── Documentation/
    ├── README.md
    ├── SETUP_GUIDE.md (this file)
    ├── QUICKSTART.md
    ├── FEATURES_OVERVIEW.md
    ├── TROUBLESHOOTING.md
    ├── PROJECT_SUMMARY.md
    └── INDEX.md
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `npm install` completed without errors
- [ ] `npm start` shows "Server running"
- [ ] http://localhost:3000 loads homepage
- [ ] http://localhost:3000/buy.html shows form
- [ ] http://localhost:3000/orders.html shows dashboard
- [ ] Test payment completes successfully
- [ ] Order appears in orders.html
- [ ] Excel download works

---

## 🎯 Next Steps

1. **Read QUICKSTART.md** - For faster overview
2. **Test a payment** - Ensure flow works
3. **Review FEATURES_OVERVIEW.md** - Understand capabilities
4. **Customize** - Adjust networks, prices, styling
5. **Deploy** - When ready for production

---

## 📞 Support

### If Something Breaks

1. **Check TROUBLESHOOTING.md** - Most common issues covered
2. **Look at server console** - Check for error messages
3. **Check browser F12** - Look for JavaScript errors
4. **Restart everything** - `Ctrl+C` then `npm start`
5. **Reinstall dependencies** - `npm install` again

### Common Messages

- **"Database tables initialized"** ✅ Database ready
- **"Listening on port 3000"** ✅ Server ready
- **"PAYMENT SUCCESS CALLBACK TRIGGERED"** ✅ Payment confirmed
- **"Order saved successfully"** ✅ Order in database

---

## 🚀 Ready?

You're all set! 

```bash
npm start
```

Then open: http://localhost:3000

**Enjoy using DataFlow! 💪**
