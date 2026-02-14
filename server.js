/**
 * DataFlow Order Management Backend
 * Simple backend to save orders to database and export to Excel
 */

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Database initialization
const DB_DIR = path.join(__dirname, 'database');
const DB_PATH = path.join(DB_DIR, 'orders.db');

// Create database directory if it doesn't exist
if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

/**
 * Initialize database tables
 */
function initializeDatabase() {
    // Create orders table
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            transaction_id TEXT UNIQUE NOT NULL,
            customer_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            network TEXT NOT NULL,
            bundle TEXT NOT NULL,
            amount REAL NOT NULL,
            paystack_reference TEXT,
            date_time TEXT NOT NULL,
            status TEXT DEFAULT 'completed',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('Database tables initialized');
}

/* ============================================
   ORDER ROUTES
   ============================================ */

/**
 * Create new order
 */
app.post('/api/orders', (req, res) => {
    console.log('=== ORDER CREATION REQUEST ===');
    console.log('Request body:', req.body);
    
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

    console.log('Inserting order into database:', {
        transaction_id, customer_name, email, phone, network, bundle, amount, status
    });

    db.run(
        `INSERT INTO orders (transaction_id, customer_name, email, phone, network, bundle, amount, paystack_reference, date_time, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [transaction_id, customer_name, email, phone, network, bundle, amount, paystack_reference, date_time, status],
        function(err) {
            if (err) {
                console.error('Database error:', err);
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'Order with this transaction ID already exists' });
                }
                return res.status(500).json({ error: 'Database error' });
            }

            console.log('Order created successfully with ID:', this.lastID);
            res.status(201).json({
                message: 'Order created successfully',
                order_id: this.lastID
            });
        }
    );
});

/**
 * Get all orders - NO AUTHENTICATION REQUIRED
 */
app.get('/api/orders', (req, res) => {
    console.log('GET /api/orders');
    
    db.all('SELECT * FROM orders ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        console.log(`Returning ${rows.length} orders`);
        res.json({ orders: rows });
    });
});

/**
 * Export orders as Excel - NO AUTHENTICATION REQUIRED
 */
app.get('/api/orders/export/excel', (req, res) => {
    console.log('GET /api/orders/export/excel');
    
    db.all('SELECT * FROM orders ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            console.error('Error exporting to Excel:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        console.log(`Exporting ${rows.length} orders to Excel`);

        // Create workbook data
        const worksheetData = [
            ['DataFlow - Order History Report'],
            [`Generated: ${new Date().toLocaleString()}`],
            [],
            ['ID', 'Transaction ID', 'Customer Name', 'Email', 'Phone', 'Network', 'Bundle', 'Amount (GHS)', 'Status', 'Paystack Reference', 'Date/Time', 'Created At'],
            ...rows.map(row => [
                row.id,
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
                // Escape quotes and wrap in quotes if contains comma
                if (typeof cell === 'string' && cell.includes(',')) {
                    return `"${cell.replace(/"/g, '""')}"`;
                }
                return cell;
            }).join(',')
        ).join('\n');

        res.header('Content-Type', 'text/csv; charset=utf-8');
        res.header('Content-Disposition', 'attachment; filename="DataFlow_Orders_Report.csv"');
        res.send(csvContent);
    });
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
    res.json({ status: 'DataFlow order system is running' });
});

/**
 * Test POST endpoint for debugging
 */
app.post('/api/test', (req, res) => {
    console.log('=== TEST POST REQUEST ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    res.json({ message: 'Test endpoint working', receivedData: req.body });
});

/* ============================================
   ERROR HANDLING
   ============================================ */

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

/* ============================================
   START SERVER
   ============================================ */

app.listen(PORT, () => {
    console.log(`
    ========================================
    DataFlow Order Management System
    ========================================
    Server running at: http://localhost:${PORT}
    Orders saved to: database/orders.db
    
    How it works:
    1. Customer completes purchase
    2. Order auto-saves to database
    3. Excel file auto-downloads
    ========================================
    `);
});

// API endpoint to serve configuration (like Paystack key)
// The key comes from environment variable .env
app.get('/api/config', (req, res) => {
    const paystackKey = process.env.PAYSTACK_PUBLIC_KEY || '';
    if (!paystackKey) {
        console.warn('⚠️ Warning: PAYSTACK_PUBLIC_KEY not found in environment variables. Set it in .env file.');
    }
    res.json({ paystackKey });
});

module.exports = app;
