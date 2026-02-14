# 🚀 DataFlow - Quick Start (5 Minutes)

Get DataFlow running in minutes!

---

## ⚡ 30-Second Overview

DataFlow is a **data bundle e-commerce platform** where customers:
1. Select a network and data plan
2. Pay via Paystack
3. Get instant confirmation

You can:
1. View all orders
2. Track revenue
3. Export to Excel

---

## 🎯 5-Minute Setup

### Step 1: Install (30 seconds)
```bash
cd C:\Users\ESLI\Desktop\Project\data-bundle-website
npm install
```

### Step 2: Set Up MongoDB (2 minutes)

**Quick Summary:**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create M0 (Free) cluster
3. Create database user
4. Copy connection string
5. Create `.env` file with connection string

**Full guide:** See [MONGODB_SETUP.md](MONGODB_SETUP.md)

Your `.env` should look like:
```env
DATABASE_URL=mongodb+srv://dataflow:password@cluster.mongodb.net/dataflow?retryWrites=true&w=majority
PAYSTACK_PUBLIC_KEY=pk_live_YOUR_KEY_HERE
```

### Step 3: Start Server (10 seconds)
```bash
npm start
```

**You should see:**
```
✓ Connected to MongoDB
DataFlow Server Running
Server running at: http://localhost:3000
```

### Step 4: Open Websites (20 seconds)

Visit these URLs:

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Homepage |
| http://localhost:3000/buy.html | Buy data form |
| http://localhost:3000/orders.html | View all orders |

**Done! ✅**

---

## 💳 Test the Platform (3 Minutes)

### Make a Test Purchase

1. Go to: **http://localhost:3000/buy.html**

2. Fill the form:
   ```
   Network: Select "MTN"
   Bundle: Select any size (e.g., "1GB")
   Phone: 0201234567
   Name: Test User
   Email: test@example.com
   ```

3. Click **"Pay Now"** button

4. Complete Paystack payment in the modal that appears

5. You'll see a **success page** with:
   - Transaction ID
   - Order details
   - Confirmation message

### View Your Order

1. Go to: **http://localhost:3000/orders.html**

2. You should see:
   - **Total Orders:** 1
   - **Total Revenue:** Amount paid
   - **Order Table** with your purchase details
   - **Download Excel** button available

**Congratulations! Your platform works! 🎉**

---

## 📁 Key Files

| File | What It Is |
|------|-----------|
| `buy.html` | Where customers buy data |
| `success.html` | Confirmation after payment |
| `orders.html` | Admin dashboard |
| `server.js` | Backend service |
| `js/app.js` | Core logic |

---

## 🛑 Stop the Server

Press: **Ctrl + C** in terminal

---

## ⚙️ Customize (Optional)

### Change Prices
Edit `js/app.js` around line 30-60:
```javascript
const DATA_BUNDLES = {
    mtn: [
        { name: '1GB', value: '1gb', price: 5.99 },  // Change 5.99
        { name: '2GB', value: '2gb', price: 11.99 }, // Change 11.99
        // ... more bundles
    ]
}
```

### Add Network
In `js/app.js`, add to NETWORKS object:
```javascript
const NETWORKS = {
    mtn: { name: 'MTN', logo: '📱' },
    telecel: { name: 'Telecel', logo: '📱' },
    airteltigo: { name: 'AirtelTigo', logo: '📱' },
    // mynewnetwork: { name: 'MyNetwork', logo: '📱' },
};
```

### Change Colors
Edit `css/style.css` to modify colors and branding

---

## 🚨 Troubleshooting Quick Fix

### "Port 3000 already in use"
```bash
# Find and stop other process on port 3000
# Or change PORT in server.js
```

### "npm command not found"
```bash
# Install Node.js from https://nodejs.org/
```

### "Orders not saving"
1. Check payment was successful
2. Look at server console for errors
3. Verify database folder exists

### "Page won't load"
1. Hard refresh: `Ctrl + Shift + R`
2. Check browser console: `F12`
3. Restart server: `Ctrl+C` then `npm start`

---

## 📊 What's Working

✅ Customers can buy data
✅ Paystack payment integration
✅ Orders save to database
✅ Admin can view orders
✅ Can export to Excel
✅ Auto-refresh dashboard
✅ Mobile responsive

---

## 🎯 What's Next?

After this quick start:

1. **Read Full Guide:** [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. **Explore Features:** [FEATURES_OVERVIEW.md](FEATURES_OVERVIEW.md)
3. **Fix Issues:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
4. **Understand System:** [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## 💡 Pro Tips

1. **Test Payment** - Important for ensuring everything works
2. **Check Database** - Visit orders.html to verify orders save
3. **Excel Export** - Download and share order data
4. **Auto-Refresh** - Dashboard updates every 30 seconds
5. **Mobile Test** - Check on phone/tablet too

---

## 🚀 You're Ready!

Your platform is complete and functional.

```bash
npm start
```

Then visit: **http://localhost:3000**

---

## 📞 Need Help?

- **Setup Issues?** → [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Feature Questions?** → [FEATURES_OVERVIEW.md](FEATURES_OVERVIEW.md)
- **Problems?** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

**Start selling data now! 💪**

*DataFlow - Making e-commerce simple*
