# 🎯 DataFlow - Data Bundle Sales Platform

A complete, production-ready data bundle e-commerce platform with Paystack payment integration, order management, and MongoDB cloud database.

```
┌────────────────────────────────────────────────┐
│     DataFlow - Data Bundle Platform ✅        │
├────────────────────────────────────────────────┤
│ ✅ Paystack Payment Integration               │
│ ✅ Express.js REST Backend                    │
│ ✅ MongoDB Atlas Cloud Database               │
│ ✅ Orders Management Dashboard                │
│ ✅ Real-time Order Tracking                   │
│ ✅ Excel Export Functionality                 │
│ ✅ Multi-Network Support                      │
│ ✅ Responsive Mobile-Friendly Design          │
│ ✅ Vercel Deployment Ready                    │
└────────────────────────────────────────────────┘
```

---

## ⚡ Quick Start (5 Steps)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Set Up MongoDB
- Create free MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
- Get your connection string
- Add to `.env` file as `DATABASE_URL=...`
- See **[MONGODB_SETUP.md](MONGODB_SETUP.md)** for detailed guide

### 3️⃣ Start Server
```bash
npm start
```

### 4️⃣ Open in Browser
- **Homepage:** http://localhost:3000
- **Buy Data:** http://localhost:3000/buy.html
- **View Orders:** http://localhost:3000/orders.html

### 5️⃣ Deploy to Vercel
- Set environment variable in Vercel dashboard
- Deploy with `vercel` command
- Live at your Vercel URL

**That's it! 🎉**

---

## 📖 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions
- **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - MongoDB Atlas configuration
- **[FEATURES_OVERVIEW.md](FEATURES_OVERVIEW.md)** - Feature descriptions
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Problem solving
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - System overview

---

## 📁 Project Structure

```
data-bundle-website/
├── server.js                    # Express backend server
├── index.html                  # Homepage
├── buy.html                    # Purchase form with Paystack
├── success.html                # Payment confirmation page
├── orders.html                 # Orders dashboard/viewer
├── package.json                # NPM dependencies
├── .env                        # MongoDB connection string (local only)
├── .env.example                # Environment template
├── vercel.json                 # Vercel deployment config
├── js/
│   └── app.js                 # Main application logic
├── css/
│   ├── style.css              # Main site styles
│   └── orders.css             # Dashboard styles
└── Images/                    # Image assets
```

---

## 🛍️ Features

### Customer Side (buy.html)
- Network selection (MTN, Telecel, AirtelTigo)
- Multiple data bundle options
- Customer information form (name, email, phone)
- Real-time price display
- Paystack payment integration
- Order confirmation page

### Admin Side (orders.html)
- Dashboard with order statistics
- Total orders count
- Total revenue tracking (GHS)
- Complete order list with details
- Auto-refresh every 30 seconds
- Manual refresh button
- Download orders as Excel file
- Responsive design for mobile/tablet

### Database
- SQLite with automatic initialization
- Tracks: transaction ID, customer details, network, bundle, amount, payment date
- Auto-timestamps for order creation

---

## 💳 Payment Flow

1. **Customer places order** → Fills form on buy.html
2. **Selects payment method** → Clicks "Pay Now"
3. **Paystack modal opens** → Payment processing
4. **Payment confirmed** → Paystack callback fires
5. **Order saved** → Data sent to backend
6. **Confirmation page** → Customer sees success.html
7. **Admin sees order** → Updates in orders.html

---

## 📊 API Endpoints

All endpoints return JSON and are hosted at `http://localhost:3000/api`

### POST /api/orders
Create a new order
```javascript
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

### GET /api/orders
Fetch all orders (returns array)

### GET /api/orders/export/excel
Download orders as Excel file

---

## 🌐 Supported Networks

| Network | Packages Available |
|---------|------------------|
| **MTN** | 1GB, 2GB, 4GB, 5GB, 10GB, 20GB, 50GB, 80GB, 100GB |
| **Telecel** | 1GB, 2GB, 4GB, 5GB, 10GB, 20GB, 50GB, 80GB, 100GB |
| **AirtelTigo** | 1GB, 2GB, 4GB, 5GB, 10GB, 20GB, 50GB, 80GB, 100GB |

Prices and bundles can be customized in `js/app.js`

---

## 🔧 Configuration

### Paystack
The live Paystack key is configured in `js/app.js`:
```javascript
const PAYSTACK_PUBLIC_KEY = 'REDACTED';
```

### Server Port
Default port is 3000. Change in `server.js` if needed:
```javascript
const PORT = process.env.PORT || 3000;
```

### Database
SQLite database auto-creates at `database/orders.db`

---

## 🚀 Deployment

### Local Testing
```bash
npm install
npm start
```

### Production Deployment
1. Install Node.js on server
2. Clone repository
3. Run `npm install`
4. Configure environment variables
5. Run `npm start`
6. Set up reverse proxy (nginx/Apache)
7. Enable HTTPS/SSL
8. Monitor with process manager (PM2)

---

## 🛠️ Troubleshooting

### Server won't start
- Check if port 3000 is in use: `netstat -an | find "3000"`
- Ensure Node.js is installed: `node --version`
- Run `npm install` first

### Orders not saving
- Check server console for errors
- Verify database folder exists
- Ensure Paystack payment succeeded

### Payment not working
- Verify Paystack live key is correct
- Check browser console (F12) for errors
- Test payment with test amount first

See **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** for more solutions.

---

## 📱 Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

## 📦 Dependencies

- **express** - Web server framework
- **sqlite3** - Database
- **cors** - Cross-origin requests
- **body-parser** - JSON parsing

---

## 📋 What Gets Tracked

Per order:
- ✅ Unique transaction ID
- ✅ Customer name & email
- ✅ Phone number
- ✅ Selected network
- ✅ Data bundle purchased
- ✅ Amount paid (GHS)
- ✅ Paystack reference
- ✅ Date and time
- ✅ Payment status
- ✅ Creation timestamp

---

## 💡 Tips

1. **Test payments** - Use test mode in Paystack first
2. **Regular backups** - Back up database/orders.db regularly
3. **Monitor logs** - Check server console during testing
4. **Mobile friendly** - Test on mobile devices before launch
5. **Load testing** - Can handle thousands of orders

---

## 🔐 Security Notes

- ✅ Paystack handles payment security
- ✅ Data stored locally in SQLite
- ✅ CORS enabled for development
- ✅ Input validation on backend
- ⚠️ No user authentication on orders.html (add for production)

---

## 📞 Support

### Documentation
1. [QUICKSTART.md](QUICKSTART.md) - Fast setup
2. [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed guide
3. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues

### Debug
1. Check browser console: Press F12
2. Check server console: Terminal output
3. Check database: Manually query orders.db

---

## 📄 License

Open source - Free to use for personal and commercial projects

---

## ✅ Checklist Before Launch

- [ ] Paystack live key configured
- [ ] Test payment completed successfully
- [ ] Orders appear in dashboard
- [ ] Excel export works
- [ ] Mobile responsive design verified
- [ ] Database backups setup
- [ ] Domain/SSL configured
- [ ] Performance tested

---

## 🚀 Ready to Launch?

Your platform is complete and ready!

```bash
npm install
npm start
```

Then open: http://localhost:3000

**Start selling data bundles today! 💪**

---

*DataFlow - Making data bundle sales simple*
