
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Database POS Matcha House
const {
  initializePosDatabase,
} = require("./src/config/posDatabase");

// Routes POS Matcha House
const menuRoutes = require("./src/routes/menuRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi CORS untuk pengembangan lokal
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      try {
        const url = new URL(origin);

        const allowedHost =
          url.hostname === "localhost" ||
          url.hostname === "127.0.0.1" ||
          /^192\.168\.\d{1,3}\.\d{1,3}$/.test(url.hostname) ||
          /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(url.hostname) ||
          /^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(
            url.hostname
          );

        if (
          url.protocol === "http:" &&
          url.port === "5173" &&
          allowedHost
        ) {
          return callback(null, true);
        }
      } catch (error) {
        console.error("Origin tidak valid:", origin);
      }

      return callback(new Error("Origin tidak diizinkan"));
    },
  })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true }));

// Halaman utama API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Matcha House POS API berjalan",
    endpoints: {
      menu: "/api/menu",
      orders: "/api/orders",
    },
  });
});

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Endpoint tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Penanganan error
app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

// Jalankan backend dan database POS
async function startServer() {
  try {
    await initializePosDatabase();

    app.listen(PORT, "0.0.0.0", () => {
      console.log("==============================");
      console.log("MATCHA HOUSE POS BACKEND");
      console.log(`Server: http://localhost:${PORT}`);
      console.log(`Menu: http://localhost:${PORT}/api/menu`);
      console.log(`Orders: http://localhost:${PORT}/api/orders`);
      console.log("==============================");
    });
  } catch (error) {
    console.error("Gagal menjalankan server:", error);
    process.exit(1);
  }
}

startServer();
