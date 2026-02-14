# MongoDB Atlas Setup Guide for DataFlow

This guide walks you through setting up a free MongoDB Atlas cluster for your DataFlow project.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Try Free** or **Sign Up**
3. Create an account (use your email address)
4. Verify your email
5. Log in to your MongoDB Atlas dashboard

## Step 2: Create a Free Cluster

1. Click **Create a Deployment**
2. Select **M0 (Shared)** - This is free forever
3. Choose your cloud provider (AWS, Google Cloud, or Azure) - AWS is fine
4. Choose your region closest to you
5. Click **Create Deployment**

*This takes 2-5 minutes to set up*

## Step 3: Create Database User

1. In the left sidebar, click **Database Access**
2. Click **Add New Database User**
3. Fill in:
   - **Username:** `dataflow` (or whatever you prefer)
   - **Password:** Create a strong password and **COPY IT** (you'll need it)
   - **Database User Privileges:** Select **Read and write to any database**
4. Click **Add User**

⚠️ **IMPORTANT:** Save your username and password safely - you'll need them!

## Step 4: Configure Network Access

1. In the left sidebar, click **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for development)
   - This adds `0.0.0.0/0` to allow connections from anywhere
   - ⚠️ For production, restrict to your server's IP
4. Click **Confirm**

*Note: Vercel uses multiple IPs, so "anywhere" is necessary for cloud deployment*

## Step 5: Get Your Connection String

1. Go back to **Clusters** (left sidebar)
2. Click **Connect** on your cluster
3. Click **Drivers** (second option)
4. Select **Node.js** as the driver
5. Copy the connection string
   - It will look like: `mongodb+srv://dataflow:<password>@cluster.mongodb.net/dataflow?retryWrites=true&w=majority`
6. **Replace `<password>` with your actual password** from Step 3

## Step 6: Add Connection String to .env

1. Open your `.env` file
2. Find the `DATABASE_URL` line
3. Paste your connection string:
   ```
   DATABASE_URL=mongodb+srv://dataflow:YourActualPassword@cluster.mongodb.net/dataflow?retryWrites=true&w=majority
   ```

## Step 7: Install Dependencies

Run this in your terminal:
```powershell
npm install
```

This installs the `mongodb` package and updates from your new `package.json`.

## Step 8: Test Locally

Start your server:
```powershell
node server.js
```

You should see:
```
✓ Connected to MongoDB
✓ Using database: dataflow
✓ Using collection: orders
DataFlow Order Management System v2.0.0
Server running at: http://localhost:3000
```

If you see this, your setup is working! ✅

Open your website at `http://localhost:3000` and test the purchase flow.

## Common Issues & Solutions

### ❌ "DATABASE_URL environment variable is not set"
- **Solution:** Make sure `DATABASE_URL` is in your `.env` file with the connection string

### ❌ "Authentication failed"
- **Solution:** Check if the username and password in your connection string match what you set in Step 3
- **Note:** Special characters in passwords need to be URL-encoded (@ = %40, : = %3A)

### ❌ "IP address not whitelisted"
- **Solution:** Go to Network Access and add your computer's IP or use "Allow Access from Anywhere"

### ❌ "Connection refused"
- **Solution:** Check if MongoDB Atlas cluster is running (should show green status in dashboard)

## Step 9: Deploy to Vercel

Once tests pass locally:

1. Commit and push your changes:
   ```powershell
   git add .
   git commit -m "Migrate from SQLite to MongoDB Atlas"
   git push
   ```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Select your project

4. Go to **Settings → Environment Variables**

5. Add:
   - **Key:** `DATABASE_URL`
   - **Value:** Your MongoDB Atlas connection string (same as in `.env`)

6. Save

7. Click **Redeploy** to apply the new environment variable

Your site is now live with MongoDB! 🚀

## Data Migration (if you have existing orders)

If you had orders in SQLite, they're not automatically migrated. To transfer them:

1. Export orders from the old system (download CSV)
2. Contact MongoDB support or manually insert via MongoDB Atlas UI
3. Or create a migration script

For now, new orders will save to MongoDB going forward.

## Next Steps

- ✅ Your database is secure (no SQLite file on Vercel)
- ✅ Your data persists across deployments
- ✅ Your Paystack key is protected (environment variable)
- 🔄 Monitor orders at MongoDB Atlas dashboard anytime

---

**Need help?**
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Vercel Env Vars: https://vercel.com/docs/concepts/projects/environment-variables
