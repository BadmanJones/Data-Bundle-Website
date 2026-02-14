# 🔧 Troubleshooting Guide - DataFlow Platform

Complete guide to solving common issues.

---

## 🚀 Server Issues

### Issue: "npm: The term 'npm' is not recognized"

**Problem:** Node.js not installed

**Solution:**
1. Download Node.js: https://nodejs.org/
2. Install the LTS version
3. Restart PowerShell/terminal
4. Verify: `node --version` (should show version)

---

### Issue: "Port 3000 already in use"

**Problem:** Another application using port 3000

**Solution Option 1:** Kill the process
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
npm start
```

**Solution Option 2:** Use different port
Edit `server.js` line 15:
```javascript
const PORT = process.env.PORT || 5000; // Change 3000 to 5000
```

Then: `npm start`

---

### Issue: "Cannot find module 'express'"

**Problem:** Dependencies not installed

**Solution:**
```bash
npm install
npm start
```

---

### Issue: Server starts but won't respond

**Problem:** CORS or middleware issue

**Solution:**
1. Stop server: `Ctrl+C`
2. Clear: `npm install`
3. Restart: `npm start`
4. Check console for error messages

---

## 📱 Payment Issues

### Issue: "Paystack modal won't open"

**Problem:** Payment script not loading

**Solutions:**
1. Hard refresh: `Ctrl+Shift+R`
2. Check F12 console for errors
3. Verify Paystack key is correct in `js/app.js` line 66
4. Check network connection

---

### Issue: "Payment completed but page didn't redirect"

**Problem:** Paystack callback issue

**Solutions:**
1. Wait 30 seconds - system tries fallback method
2. Try payment again
3. Refresh page manually
4. Check browser console (F12) for JavaScript errors

---

### Issue: "Paystack payment failed"

**Problem:** Payment declined or issue with Paystack

**Solutions:**
1. Try a different amount
2. Try a different payment method
3. Check with customer's bank/mobile provider
4. Verify Paystack account is in good standing
5. Check Paystack dashboard for declined reason

---

## 📊 Order Issues

### Issue: "Orders not saving to database"

**Problem:** Backend API not receiving data

**Solutions:**
1. **Check payment completed:**
   - Ensure payment was confirmed by Paystack
   - Look for "PAYMENT SUCCESS" in browser console
   
2. **Check backend is running:**
   - Terminal should show "Server running at..."
   - Try: http://localhost:3000/api/orders in browser

3. **Check server console for errors:**
   - Look for red error messages
   - Check database folder exists

4. **Verify data format:**
   - Check F12 Network tab
   - Look for POST to /api/orders
   - Check response status (should be 201)

---

### Issue: "Orders page shows 'No Orders Yet'"

**Problem:** One of several possible causes

**Solutions:**

1. **Hard refresh the page:**
   ```bash
   Ctrl+Shift+R
   ```

2. **Check if server is running:**
   - Terminal should show "Server running"
   - Try `npm start` if stopped

3. **Check database:**
   - Verify `database/orders.db` exists
   - Should be in project root

4. **Test API directly:**
   - Visit: http://localhost:3000/api/orders
   - Should show JSON with orders array
   - If blank: No orders yet (expected on first setup)

5. **Check for JavaScript errors:**
   - Press F12 in browser
   - Click "Console" tab
   - Look for red error messages
   - Fix errors shown

---

### Issue: "Can see single orders but table is empty"

**Problem:** Date formatting issue

**Solutions:**
1. Hard refresh: `Ctrl+Shift+R`
2. Check browser console (F12) for errors
3. Check server console for database errors
4. Verify orders.html is up to date

---

## 🔍 Dashboard Issues

### Issue: "Orders dashboard loads but no data"

**Solutions:**
1. Check if orders exist: http://localhost:3000/api/orders
2. Click "Refresh" button manually
3. Hard refresh page: `Ctrl+Shift+R`
4. Check F12 console for errors
5. Restart server: `npm start`

---

### Issue: "Dashboard statistics show wrong numbers"

**Problem:** Cache issue

**Solutions:**
1. Click "Refresh" button
2. Hard refresh page: `Ctrl+Shift+R`
3. Wait for auto-refresh (30 seconds)
4. Close and reopen browser tab

---

### Issue: "Excel download not working"

**Problem:** Export endpoint issue

**Solutions:**
1. Check server is running
2. Try from orders.html directly
3. Check browser console (F12) for errors
4. Verify download permission in browser
5. Try different browser

---

## 💾 Database Issues

### Issue: "Database file .gitignore showing"

**Problem:** Normal - database excluded from Git

**Solution:**
- This is correct - database files shouldn't be tracked
- Each install creates fresh database
- No action needed

---

### Issue: "Orders disappeared after restart"

**Problem:** Database file deleted/moved

**Solutions:**
1. Check `database/orders.db` exists
2. If missing: Run `npm start` to recreate (empty)
3. Previous orders may need manual backup
4. Consider backing up database regularly

---

## 🔐 Security Issues

### Issue: "I see Paystack test key in code"

**Problem:** Test vs Live key

**Solutions:**
- Test key: For development/testing
- Live key: For production (already configured)
- Safe to share test key
- Never share live secret key
- Check `js/app.js` line 66 for current key

---

## 🌐 Browser Issues

### Issue: "Page looks broken/CSS not loading"

**Solutions:**
1. Hard refresh: `Ctrl+Shift+R`
2. Clear browser cache
3. Try different browser
4. Check F12 console for CSS/404 errors

---

### Issue: "Form won't submit / buttons unresponsive"

**Solutions:**
1. Check browser console: F12 → Console
2. Verify JavaScript loaded (should show no errors)
3. Hard refresh: `Ctrl+Shift+R`
4. Try private/incognito window
5. Try different browser

---

### Issue: "Mobile version looks broken"

**Solutions:**
1. Open on real mobile device (not just resize)
2. Hard refresh: Swipe down or reload
3. Zoom to 100%
4. Try different mobile browser
5. Check browser console for errors

---

## 📊 API Issues

### Issue: "API endpoint returns 404"

**Problem:** Server not running or wrong path

**Solutions:**
1. Verify server running: `npm start`
2. Check correct URL: http://localhost:3000/api/orders
3. Try in browser first to test endpoint
4. Check server console for hints

---

### Issue: "API returns error 500"

**Problem:** Server error

**Solutions:**
1. Check server console for error details
2. Look for database connection errors
3. Check request format in F12 Network tab
4. Restart server: `Ctrl+C` then `npm start`

---

## 🔄 Integration Issues

### Issue: "Can't integrate with buy.html"

**Solutions:**
1. Read [SETUP_GUIDE.md](SETUP_GUIDE.md) integration section
2. Ensure `sendOrderToAdminBackend()` function exists in app.js
3. Call function after successful payment
4. Check browser console for errors during call
5. Verify server is running

---

## 🎯 Testing Issues

### Issue: "Test payment won't go through"

**Problem:** Paystack test details

**Solutions:**
1. Verify payment details entered correctly:
   - Network: MTN/Telecel/AirtelTigo
   - Bundle: Valid size
   - Phone: Valid format (0201234567)
   - Name: Any text
   - Email: Valid format

2. Check payment method works
3. Try with test credentials from Paystack
4. Check Paystack account has test mode enabled
5. Contact Paystack for test account issues

---

## 🆘 Still Having Issues?

### Debug Steps:

1. **Check Server Console:**
   - Stop with `Ctrl+C`
   - Run: `npm start`
   - Look for any error messages
   - File names and line numbers help

2. **Check Browser Console (F12):**
   - Click "Console" tab
   - Red messages = errors
   - Yellow messages = warnings
   - Look for specific error names

3. **Check Network Tab (F12):**
   - Click "Network" tab
   - Perform action
   - Look for failed requests (red)
   - Check response details

4. **Check Files:**
   - Verify files exist
   - Check file names for typos
   - Confirm latest changes saved
   - Clear IDE cache if needed

5. **Try Fresh Start:**
   - Stop server: `Ctrl+C`
   - Delete: `database/orders.db`
   - Run: `npm install`
   - Run: `npm start`
   - Try again

---

## 📞 Common Error Messages

| Error | Cause | Fix |
|-------|-------|-----|
| "fetch failed" | Network/CORS issue | Check server running |
| "undefined function" | Missing app.js | Hard refresh (Ctrl+Shift+R) |
| "Cannot POST /api/orders" | Typo in URL | Check exact endpoint |
| "EADDRINUSE" | Port in use | Kill process or change port |
| "ENOENT: no such file" | Missing file | Verify file path and name |
| "Database locked" | Multiple access | Restart server |

---

## ✅ Verification Checklist

Before declaring it broken:

- [ ] Server running? `npm start` visible in terminal
- [ ] Correct URL? http://localhost:3000/buy.html
- [ ] Hard refreshed? `Ctrl+Shift+R`
- [ ] Checked F12 console? Any red errors?
- [ ] Checked server console? Any error messages?
- [ ] File saved? Current changes applied?
- [ ] Wait 30 seconds? Auto-updates sometimes delayed
- [ ] Tried different browser? Safari/Firefox/Chrome?

---

## 🚀 Quick Fixes (Try These First)

1. **Hard Refresh:** `Ctrl+Shift+R`
2. **Restart Server:** `Ctrl+C` then `npm start`
3. **Check Running:** Visit http://localhost:3000
4. **Clear Cache:** Open F12 → Settings → Cache
5. **Reinstall:** `npm install`

---

**Most issues solved by hard refresh or restarting server!** 🔄

If stuck, check the browser console (F12) - it usually shows the actual problem.
