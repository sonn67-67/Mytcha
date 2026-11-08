
const { randomUUID } = require("crypto");

const {
  openDatabase,
  run,
  get,
  all,
  closeDatabase,
} = require("../config/posDatabase");

const TOPPING_PRICE = 3000;
const TAX_RATE = 0.10;

const allowedToppings = [
  "Extra Matcha Powder",
  "Boba",
  "Whipped Cream",
];

const allowedMilk = [
  "Susu Sapi",
  "Oat Milk",
  "Almond Milk",
];

const allowedIce = ["Sedikit", "Normal", "Banyak"];
const allowedPayments = ["QRIS", "E-Wallet", "Tunai"];

function validationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

async function createOrder(payload) {
  const {
    items,
    table = "12",
    orderType = "dine_in",
    paymentMethod,
  } = payload || {};

  if (!Array.isArray(items) || items.length === 0) {
    throw validationError("Pesanan tidak boleh kosong");
  }

  if (items.length > 100) {
    throw validationError("Terlalu banyak item pesanan");
  }

  if (!allowedPayments.includes(paymentMethod)) {
    throw validationError("Metode pembayaran tidak valid");
  }

  if (!["dine_in", "take_away"].includes(orderType)) {
    throw validationError("Jenis pesanan tidak valid");
  }

  if (orderType === "dine_in" &&
      (!String(table).trim() || String(table).length > 30)) {
    throw validationError("Nomor meja tidak valid");
  }

  const db = await openDatabase();
  let transactionStarted = false;

  try {
    await run(db, "BEGIN IMMEDIATE TRANSACTION");
    transactionStarted = true;

    const calculatedItems = [];

    for (const item of items) {
      const productId = Number(item.productId ?? item.id);
      const quantity = Number(item.quantity);

      if (!Number.isInteger(productId) ||
          !Number.isInteger(quantity) ||
          quantity < 1 ||
          quantity > 100) {
        throw validationError("Produk atau jumlah tidak valid");
      }

      const product = await get(
        db,
        `SELECT * FROM menu_items
         WHERE id = ? AND is_available = 1`,
        [productId]
      );

      if (!product) {
        throw validationError(`Produk ${productId} tidak tersedia`);
      }

      const options = item.options || {};
      const sugar = options.sugar ?? 50;
      const ice = options.ice ?? "Normal";
      const milk = options.milk ?? "Susu Sapi";
      const toppings = options.toppings ?? [];

      if (![0, 25, 50, 75, 100].includes(sugar)) {
        throw validationError("Kadar gula tidak valid");
      }

      if (!allowedIce.includes(ice) || !allowedMilk.includes(milk)) {
        throw validationError("Pilihan es atau susu tidak valid");
      }

      if (!Array.isArray(toppings) ||
          new Set(toppings).size !== toppings.length ||
          !toppings.every((t) => allowedToppings.includes(t))) {
        throw validationError("Pilihan topping tidak valid");
      }

      const unitPrice = product.price + toppings.length * TOPPING_PRICE;

      calculatedItems.push({
        productId,
        productName: product.name,
        quantity,
        basePrice: product.price,
        unitPrice,
        sugar,
        ice,
        milk,
        toppings,
        lineTotal: unitPrice * quantity,
      });
    }

    const subtotal = calculatedItems.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );

    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax;

    const orderId = "MH" + randomUUID()
      .replace(/-/g, "")
      .slice(0, 16)
      .toUpperCase();

    await run(
      db,
      `INSERT INTO orders
       (id, table_number, order_type, subtotal, tax, total, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        orderType === "dine_in" ? String(table) : null,
        orderType,
        subtotal,
        tax,
        total,
        "menunggu_pembayaran",
      ]
    );

    for (const item of calculatedItems) {
      await run(
        db,
        `INSERT INTO order_items
        (
          order_id,
          product_id,
          product_name,
          quantity,
          base_price,
          unit_price,
          sugar,
          ice,
          milk,
          toppings,
          line_total
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.productId,
          item.productName,
          item.quantity,
          item.basePrice,
          item.unitPrice,
          item.sugar,
          item.ice,
          item.milk,
          JSON.stringify(item.toppings),
          item.lineTotal,
        ]
      );
    }

    await run(
      db,
      `INSERT INTO payments
       (order_id, method, amount, status)
       VALUES (?, ?, ?, ?)`,
      [orderId, paymentMethod, total, "pending"]
    );

    await run(
      db,
      `INSERT INTO order_status_history
       (order_id, status)
       VALUES (?, ?)`,
      [orderId, "menunggu_pembayaran"]
    );

    await run(db, "COMMIT");
    transactionStarted = false;

    return {
      id: orderId,
      table: orderType === "dine_in" ? String(table) : null,
      orderType,
      items: calculatedItems,
      subtotal,
      tax,
      total,
      paymentMethod,
      paymentStatus: "pending",
      status: "menunggu_pembayaran",
    };
  } catch (error) {
    if (transactionStarted) {
      try {
        await run(db, "ROLLBACK");
      } catch (rollbackError) {
        console.error("Rollback gagal:", rollbackError);
      }
    }
    throw error;
  } finally {
    await closeDatabase(db);
  }
}

async function getOrderById(id) {
  const db = await openDatabase();

  try {
    const order = await get(
      db,
      "SELECT * FROM orders WHERE id = ?",
      [id]
    );

    if (!order) return null;

    const items = await all(
      db,
      "SELECT * FROM order_items WHERE order_id = ?",
      [id]
    );

    const payment = await get(
      db,
      "SELECT * FROM payments WHERE order_id = ?",
      [id]
    );

    return {
      ...order,
      items: items.map((item) => ({
        ...item,
        toppings: JSON.parse(item.toppings),
      })),
      payment,
    };
  } finally {
    await closeDatabase(db);
  }
}

async function getAllOrders() {
  const db = await openDatabase();

  try {
    return await all(
      db,
      `SELECT o.*, p.method AS payment_method,
              p.status AS payment_status
       FROM orders o
       JOIN payments p ON p.order_id = o.id
       ORDER BY o.created_at DESC`
    );
  } finally {
    await closeDatabase(db);
  }
}

async function confirmPayment(id) {
  const db = await openDatabase();
  let started = false;

  try {
    await run(db, "BEGIN IMMEDIATE TRANSACTION");
    started = true;

    const order = await get(
      db,
      `SELECT o.status, p.status AS payment_status
       FROM orders o
       JOIN payments p ON p.order_id = o.id
       WHERE o.id = ?`,
      [id]
    );

    if (!order) {
      const error = new Error("Pesanan tidak ditemukan");
      error.status = 404;
      throw error;
    }

    if (order.status !== "menunggu_pembayaran" ||
        order.payment_status !== "pending") {
      throw validationError("Pesanan bukan dalam status menunggu pembayaran");
    }

    await run(
      db,
      `UPDATE payments
       SET status = 'paid', paid_at = CURRENT_TIMESTAMP
       WHERE order_id = ?`,
      [id]
    );

    await run(
      db,
      `UPDATE orders SET status = 'diproses' WHERE id = ?`,
      [id]
    );

    await run(
      db,
      `INSERT INTO order_status_history (order_id, status)
       VALUES (?, 'diproses')`,
      [id]
    );

    await run(db, "COMMIT");
    started = false;

    return { id, status: "diproses", paymentStatus: "paid" };
  } catch (error) {
    if (started) await run(db, "ROLLBACK");
    throw error;
  } finally {
    await closeDatabase(db);
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  confirmPayment,
};
