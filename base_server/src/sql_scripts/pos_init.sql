
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    description TEXT,
    is_available INTEGER NOT NULL DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    table_number TEXT,
    order_type TEXT DEFAULT 'dine_in',
    subtotal INTEGER NOT NULL,
    tax INTEGER NOT NULL,
    total INTEGER NOT NULL,
    status TEXT DEFAULT 'menunggu_pembayaran',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    base_price INTEGER NOT NULL,
    unit_price INTEGER NOT NULL,
    sugar INTEGER DEFAULT 50,
    ice TEXT DEFAULT 'Normal',
    milk TEXT DEFAULT 'Susu Sapi',
    toppings TEXT DEFAULT '[]',
    line_total INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES menu_items(id)
);

CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL UNIQUE,
    method TEXT NOT NULL,
    amount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    paid_at TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS order_status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    status TEXT NOT NULL,
    changed_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
