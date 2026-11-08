
const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

function requireAdmin(req, res, next) {
  const configuredKey = process.env.ADMIN_API_KEY;
  const providedKey = req.get("x-admin-key");

  if (!configuredKey || !providedKey || providedKey !== configuredKey) {
    return res.status(403).json({
      success: false,
      message: "Akses admin ditolak",
    });
  }

  next();
}

// Pelanggan membuat pesanan
router.post("/", orderController.createOrder);

// Pengelola melihat daftar pesanan
router.get("/", requireAdmin, orderController.getAllOrders);

// Pelanggan melihat detail berdasarkan nomor pesanan
router.get("/:id", orderController.getOrderById);

// Konfirmasi pembayaran oleh pengelola (demo)
// Jangan dipanggil langsung dari frontend pelanggan.
router.patch(
  "/:id/confirm-payment",
  requireAdmin,
  orderController.confirmPayment
);

module.exports = router;
