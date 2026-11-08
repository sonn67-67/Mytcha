
const menuModel = require("../models/menuModel");

async function getAllMenus(req, res) {
  try {
    const menus = await menuModel.getAllMenus();

    res.json({
      success: true,
      data: menus,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil daftar menu",
    });
  }
}

async function getMenuById(req, res) {
  try {
    const menu = await menuModel.getMenuById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: menu,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail menu",
    });
  }
}

module.exports = {
  getAllMenus,
  getMenuById,
};
