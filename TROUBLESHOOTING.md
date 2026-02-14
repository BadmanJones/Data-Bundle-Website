# 🔧 Troubleshooting Guide - DataFlow Admin Backend

## Common Issues & Solutions

### 1. Server Won't Start

#### Error: `Command not found: npm`
**Problem:** Node.js not installed
**Solution:**
1. Download Node.js from https://nodejs.org/
2. Install the LTS version
3. Restart your terminal/PowerShell
4. Run `node --version` to verify

#### Error: `Port 3000 already in use`
**Problem:** Another application using port 3000
**Solution:**
Option 1: Kill process using port 3000
```bash
# Windows - Find and stop process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Option 2: Use different port
Edit `server.js`:
```javascript
const PORT = process.env.PORT || 5000; // Change to 5000
```

Then start:
```bash
npm start
```

#### Error: `Cannot find module 'express'`
**Problem:** Dependencies not installed
**Solution:**
```bash
npm install
```

Then start:
```bash
npm start
```

---

### 2. Can't Login to Admin Panel

#### Error: `Invalid username or password`
**Problem:** Wrong credentials
**Solution:**
- Username: `admin` (lowercase)
- Password: `admin123`
- Make sure CAPS LOCK is off
- Clear browser cookies

#### Error: `Access denied. No token provided`
**Problem:** Authentication issue
**Solution:**
1. Check if server is running
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try incognito/private window
4. Check browser console (F12) for errors

#### Connection Error: `Cannot reach server`
**Problem:** Server not running
**Solution:**
1. Check terminal - is server running?
2. Visit `http://localhost:3000/api/health`
3. Should show: `{"status":"Server is running"}`
4. If not, start server: `npm start`

---

### 3. Orders Not Appearing in Dashboard

#### Issue: Dashboard shows "No orders"
**Problem:** Integration not completed
**Solution:**

1. Verify integration code is in app.js:
   ```javascript
   sendOrderToAdminBackend(orderData);
   ```

2. Check Network tab (F12 → Network):
   - Place a test order
   - Look for POST to `localhost:3000/api/orders`
   - Check response (should be 201 with success)

3. Check server console for errors:
   ```
   Look for error messages when order is sent
   ```

#### Issue: Orders saved to Airtable but not backend
**Problem:** Backend integration incomplete
**Solution:**
1. Ensure `sendOrderToAdminBackend()` function exists
2. Verify it's called after payment success
3. Check if API endpoint is working: 
   ```bash
   # Test with Postman or curl
   curl -X POST http://localhost:3000/api/orders \
     -H "Content-Type: application/json" \
     -d "{\"transaction_id\":\"TEST-123\", ...}"
   ```

---

### 4. Dashboard is Slow/Frozen

#### Issue: Page takes too long to load
**Problem:** Large number of orders
**Solution:**
1. Clear browser cache
2. Check Network tab for slow requests
3. Restart server

#### Issue: Searching/Filtering is slow
**Problem:** Large dataset
**Solution:**
1. Filter by specific network or status first
2. Use more specific search terms
3. Consider migrating to PostgreSQL for 100k+ orders

---

### 5. Can't Logout or Session Issues

#### Issue: Logout button doesn't work
**Problem:** Browser cache issue
**Solution:**
1. Clear browser cookies and cache
2. Try incognito window
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

#### Issue: Keep getting logged out
**Problem:** Token expiration (24 hours)
**Solution:**
- This is normal behavior
- Just login again
- Token automatically refreshes on page reload

---

### 6. Database Issues

#### Issue: `database/orders.db` not created
**Problem:** Directory doesn't exist
**Solution:**
The server creates it automatically, but if not:
1. Manually create folder: `database`
2. Restart server: `npm start`

#### Issue: Database file is too large
**Problem:** Too many orders
**Solution:**
1. Archive old orders to CSV
2. Backup current database
3. Consider PostgreSQL migration

#### Issue: Database appears corrupted
**Problem:** Unexpected shutdown
**Solution:**
1. Check if file exists: `database/orders.db`
2. Try deleting and restarting (warning: loses data)
3. Restore from backup if available

---

### 7. Payment Integration Issues

#### Issue: Order shows "pending" instead of "completed"
**Problem:** Status not set correctly
**Solution:**
```javascript
// Make sure status is 'completed' after payment success
const payload = {
    ...
    status: 'completed'  // Add this line
};
```

#### Issue: Missing Paystack reference
**Problem:** Optional field not included
**Solution:**
```javascript
paystack_reference: response.reference || ''  // Add fallback
```

---

### 8. CORS/Connection Errors

#### Error: `CORS policy: Cross-origin request blocked`
**Problem:** Frontend and backend on different origins
**Solution:**
1. Ensure both run on `localhost:3000`
2. Or update CORS in server.js:
   ```javascript
   app.use(cors({
       origin: 'http://yourdomain.com'
   }));
   ```

#### Error: `Failed to fetch`
**Problem:** Network connectivity
**Solution:**
1. Check if server is running
2. Verify correct URL: `http://localhost:3000`
3. Check firewall settings

---

### 9. CSS/Styling Issues

#### Dashboard looks broken/unstyled
**Problem:** CSS file not loading
**Solution:**
1. Check browser console (F12) for 404 errors
2. Verify file exists: `css/admin-style.css`
3. Hard refresh: Ctrl+Shift+R
4. Clear browser cache

#### Responsive design not working
**Problem:** Viewport meta tag missing
**Solution:**
Admin.html already has correct meta tags, no action needed

---

### 10. Performance Issues

#### Slow search/filtering
**Problem:** Inefficient queries
**Solution:**
1. Upgrade database to PostgreSQL
2. Add indexes to frequently searched columns
3. Implement pagination (already done)

#### High memory usage
**Problem:** Too many operations
**Solution:**
1. Restart server: `npm start`
2. Close other applications
3. Check Windows Task Manager for processes

---

## Debugging Checklist

### Step 1: Check Server Status
```bash
# Is server running?
Visit: http://localhost:3000/api/health
Should see: {"status":"Server is running"}
```

### Step 2: Check Browser Console
Press F12, look for JavaScript errors:
- Red errors = Problems to fix
- Yellow warnings = Usually OK
- Check Network tab for failed requests

### Step 3: Check Server Logs
Look at terminal/PowerShell window where you ran `npm start`:
- Error messages will appear here
- Database operations logged
- Authentication attempts logged

### Step 4: Test Endpoints
Use a tool like Postman:
```
POST http://localhost:3000/api/admin/login
Headers: Content-Type: application/json
Body: {"username":"admin","password":"admin123"}
```

### Step 5: Check Database
Database file at: `database/orders.db`
- File should exist and be > 100KB
- Use SQLite viewer to inspect (optional)

---

## Getting More Help

### Check These Files
1. **ADMIN_README.md** - Complete documentation
2. **SETUP_GUIDE.md** - Detailed setup steps
3. **FEATURES_OVERVIEW.md** - Feature descriptions
4. **QUICKSTART.md** - Quick start guide

### Browser Tools
- **F12** - Developer tools
  - Console - Error messages
  - Network - API calls
  - Storage - Cookies/tokens
  
### Server Logs
- Look at terminal where server is running
- Error messages show what went wrong
- Sometimes includes database errors

### Common Error Messages

| Error | Meaning | Fix |
|-------|---------|-----|
| `Cannot find module` | Missing package | `npm install` |
| `EADDRINUSE` | Port in use | Change port or kill process |
| `401 Unauthorized` | Bad token | Login again |
| `403 Forbidden` | No permission | Check auth |
| `404 Not Found` | Wrong URL | Check endpoint |
| `500 Internal Error` | Server error | Check server logs |
| `CORS error` | Cross-origin issue | Update CORS settings |

---

## Emergency Solutions

### Reset Everything
If something is really broken:
```bash
# Delete everything and start fresh
rm -r node_modules
rm -r database
npm install
npm start
```

### Backup Data Before Reset
```bash
# Save your database first
Copy database/orders.db to safe location
```

### Factory Reset Database
```bash
# Delete database
rm database/orders.db
# Restart server - creates fresh database
npm start
```

---

## Performance Tips

### For Better Performance

1. **Reduce Data Load**
   - Filter before searching
   - Use pagination

2. **Clear Cache**
   - Ctrl+Shift+Delete
   - Try incognito window

3. **Optimize Database**
   - Archive old orders
   - Delete test data

4. **Server Resources**
   - Close unnecessary apps
   - Restart computer periodically

---

## When to Seek Help

🆘 **Seek help if:**
- Server crashes repeatedly
- Database corrupted
- Can't restore from errors
- Significant data loss

📞 **Resources:**
- Stack Overflow - General programming
- Express.js docs - Server issues
- SQLite docs - Database issues
- Node.js docs - Runtime issues

---

**Remember:** Most issues have simple solutions. Check the browser console and server logs first! 🔍

For questions not covered here, refer to the main documentation files.
