/**
 * DataFlow Order Management Backend
 * Simple backend to save orders to database and export to Excel
 * Using MongoDB for cloud persistence
 */

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.DATABASE_URL || process.env.MONGODB_URI;

// MongoDB connection
let db = null;
let ordersCollection = null;

const mongoClient = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000
});

/**
 * Connect to MongoDB
 */
async function connectToDatabase() {
    try {
        if (!MONGODB_URI) {
            console.error('ERROR: DATABASE_URL environment variable is not set!');
            console.error('Set it in your .env file or Vercel environment variables');
            process.exit(1);
        }

        await mongoClient.connect();
        db = mongoClient.db('dataflow');
        ordersCollection = db.collection('orders');

        // Create unique index on transaction_id
        await ordersCollection.createIndex({ transaction_id: 1 }, { unique: true });

        console.log('✓ Connected to MongoDB');
        console.log('✓ Using database: dataflow');
        console.log('✓ Using collection: orders');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
}

// Connect to database on startup
connectToDatabase();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Serve success page
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'success.html'));
});

/* ============================================
   ORDER ROUTES
   ============================================ */

/**
 * Create new order
 */
app.post('/api/orders', async (req, res) => {
    console.log('=== ORDER CREATION REQUEST ===');
    console.log('Request body:', req.body);

    if (!ordersCollection) {
        return res.status(503).json({ error: 'Database not ready' });
    }

    const {
        transaction_id,
        customer_name,
        email,
        phone,
        network,
        bundle,
        amount,
        paystack_reference,
        date_time,
        status = 'completed'
    } = req.body;

    // Validation
    if (!transaction_id || !customer_name || !email || !phone || !network || !bundle || !amount) {
        console.log('Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const order = {
            transaction_id,
            customer_name,
            email,
            phone,
            network,
            bundle,
            amount,
            paystack_reference: paystack_reference || null,
            date_time,
            status,
            created_at: new Date(),
            updated_at: new Date()
        };

        console.log('Inserting order into MongoDB:', order);
        const result = await ordersCollection.insertOne(order);

        console.log('Order created successfully with ID:', result.insertedId);
        res.status(201).json({
            message: 'Order created successfully',
            order_id: result.insertedId
        });
    } catch (error) {
        console.error('Database error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Order with this transaction ID already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
    }
});

/**
 * Get all orders - NO AUTHENTICATION REQUIRED
 */
app.get('/api/orders', async (req, res) => {
    console.log('GET /api/orders');

    if (!ordersCollection) {
        return res.status(503).json({ error: 'Database not ready' });
    }

    try {
        const orders = await ordersCollection
            .find({})
            .sort({ created_at: -1 })
            .toArray();

        console.log(`Returning ${orders.length} orders`);
        res.json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ error: 'Database error' });
    }
});

/**
 * Export orders as Excel - NO AUTHENTICATION REQUIRED
 */
app.get('/api/orders/export/excel', async (req, res) => {
    console.log('GET /api/orders/export/excel');

    if (!ordersCollection) {
        return res.status(503).json({ error: 'Database not ready' });
    }

    try {
        const orders = await ordersCollection
            .find({})
            .sort({ created_at: -1 })
            .toArray();

        console.log(`Exporting ${orders.length} orders to Excel`);

        // Create workbook data
        const worksheetData = [
            ['DataFlow - Order History Report'],
            [`Generated: ${new Date().toLocaleString()}`],
            [],
            ['Transaction ID', 'Customer Name', 'Email', 'Phone', 'Network', 'Bundle', 'Amount (GHS)', 'Status', 'Paystack Reference', 'Date/Time', 'Created At'],
            ...orders.map(row => [
                row.transaction_id,
                row.customer_name,
                row.email,
                row.phone,
                row.network.toUpperCase(),
                row.bundle,
                row.amount,
                row.status.charAt(0).toUpperCase() + row.status.slice(1),
                row.paystack_reference || '',
                row.date_time,
                new Date(row.created_at).toLocaleString()
            ])
        ];

        // Generate CSV content for download
        const csvContent = worksheetData.map(row =>
            row.map(cell => {
                // Escape quotes and wrap in quotes if contains comma or quote
                const cellStr = String(cell);
                if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                    return `"${cellStr.replace(/"/g, '""')}"`;
                }
                return cellStr;
            }).join(',')
        ).join('\n');

        // Set response headers
        const timestamp = new Date().toISOString().split('T')[0];
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="orders_${timestamp}.csv"`);

        res.send(csvContent);
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        return res.status(500).json({ error: 'Database error' });
    }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    const status = ordersCollection ? 'healthy' : 'initializing';
    res.json({ status, timestamp: new Date().toISOString() });
});

/**
 * Get server info
 */
app.get('/api/info', (req, res) => {
    res.json({
        name: 'DataFlow Order Management System',
        version: '2.0.0',
        database: 'MongoDB',
        environment: process.env.NODE_ENV || 'production'
    });
});

/* ============================================
   CONFIGURATION ROUTES
   ============================================ */

/**
 * API endpoint to serve configuration (like Paystack key)
 * The key comes from environment variable
 * Supports both test and live modes
 */
app.get('/api/config', (req, res) => {
    const paystackMode = process.env.PAYSTACK_MODE || 'test';
    let paystackKey = '';
    
    if (paystackMode === 'test') {
        // For test mode, try PAYSTACK_TEST_KEY first, then fall back to PAYSTACK_PUBLIC_KEY
        paystackKey = process.env.PAYSTACK_TEST_KEY || process.env.PAYSTACK_PUBLIC_KEY || '';
    } else {
        // For live mode, use PAYSTACK_PUBLIC_KEY
        paystackKey = process.env.PAYSTACK_PUBLIC_KEY || '';
    }
    
    if (!paystackKey) {
        console.warn('⚠️ Warning: Paystack key not found in environment variables.');
    }
    
    res.json({ paystackKey, mode: paystackMode });
});

/**
 * Verify payment with Paystack API
 * Checks if a payment reference has been successfully verified
 */
app.get('/api/verify-payment', async (req, res) => {
    const { ref } = req.query;
    
    console.log(`[Verification] Checking payment reference: ${ref}`);
    
    if (!ref) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Reference parameter required',
            verified: false 
        });
    }
    
    try {
        // Get Paystack secret key from environment
        const paystackMode = process.env.PAYSTACK_MODE || 'test';
        let paystackSecretKey = '';
        
        if (paystackMode === 'test') {
            // For test mode, extract secret key from test public key
            // Test public key format: pk_test_xxx -> secret would be sk_test_xxx
            const testPublicKey = process.env.PAYSTACK_TEST_KEY || '';
            paystackSecretKey = testPublicKey.replace('pk_test_', 'sk_test_');
        } else {
            // For live mode
            const livePublicKey = process.env.PAYSTACK_PUBLIC_KEY || '';
            paystackSecretKey = livePublicKey.replace('pk_live_', 'sk_live_');
        }
        
        if (!paystackSecretKey) {
            console.error('Paystack secret key not available');
            return res.status(500).json({ 
                status: 'error',
                message: 'Paystack configuration error',
                verified: false 
            });
        }
        
        // Call Paystack API to verify payment
        const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${ref}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${paystackSecretKey}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!paystackResponse.ok) {
            console.log(`[Verification] Payment not found or error: ${paystackResponse.status}`);
            return res.json({ 
                status: 'pending',
                verified: false,
                message: 'Payment verification in progress'
            });
        }
        
        const paystackData = await paystackResponse.json();
        
        console.log(`[Verification] Paystack response:`, {
            status: paystackData.status,
            data: paystackData.data ? {
                reference: paystackData.data.reference,
                status: paystackData.data.status,
                amount: paystackData.data.amount
            } : null
        });
        
        // Check if payment was successful
        if (paystackData.status === true && paystackData.data.status === 'success') {
            console.log(`[Verification] ✓ Payment VERIFIED: ${ref}`);
            return res.json({ 
                status: 'success',
                verified: true,
                amount: paystackData.data.amount,
                reference: paystackData.data.reference
            });
        } else {
            console.log(`[Verification] Payment not successful. Status: ${paystackData.data?.status}`);
            return res.json({ 
                status: 'pending',
                verified: false,
                paymentStatus: paystackData.data?.status || 'unknown'
            });
        }
    } catch (error) {
        console.error('[Verification] Error verifying payment:', error.message);
        return res.status(500).json({ 
            status: 'error',
            message: 'Verification error: ' + error.message,
            verified: false 
        });
    }
});

/* ============================================
   START SERVER
   ============================================ */

const server = app.listen(PORT, () => {
    console.log(`
    ========================================
    DataFlow Order Management System v2.0.0
    ========================================
    Server running at: http://localhost:${PORT}
    Database: MongoDB
    Environment: ${process.env.NODE_ENV || 'production'}
    
    How it works:
    1. Customer completes purchase
    2. Order auto-saves to MongoDB
    3. Data persists in the cloud
    4. Excel export available
    ========================================
    `);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nShutting down gracefully...');
    server.close(async () => {
        await mongoClient.close();
        console.log('Database connection closed');
        process.exit(0);
    });
});

module.exports = app;
