
const orderModel = require("../models/orderModel");

async function createOrder(req, res) {
  try {
    const order = await orderModel.createOrder(req.body);

    res.status(201).json({
      success: true,
      message: "Pesanan tersimpan, menunggu pembayaran",
      data: order,
    });
  } catch (error) {
    console.error(error);

    res.status(error.status || 500).json({
      success: false,
      message: error.status
        ? error.message
        : "Gagal menyimpan pesanan",
    });
  }
}

async function getOrderById(req, res) {
  try {
    const order = await orderModel.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil pesanan",
    });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await orderModel.getAllOrders();

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil daftar pesanan",
    });
  }
}

async function confirmPayment(req, res) {
  try {
    const result = await orderModel.confirmPayment(req.params.id);

    res.json({
      success: true,
      message: "Pembayaran dikonfirmasi, pesanan masuk proses",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(error.status || 500).json({
      success: false,
      message: error.status
        ? error.message
        : "Gagal mengonfirmasi pembayaran",
    });
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  confirmPayment,
};
