
const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menuController");

router.get("/", menuController.getAllMenus);
router.get("/:id", menuController.getMenuById);

module.exports = router;
