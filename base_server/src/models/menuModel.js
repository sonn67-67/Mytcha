
const {
  openDatabase,
  all,
  get,
  closeDatabase,
} = require("../config/posDatabase");

async function getAllMenus() {
  const db = await openDatabase();

  try {
    return await all(
      db,
      `SELECT * FROM menu_items
       WHERE is_available = 1
       ORDER BY id ASC`
    );
  } finally {
    await closeDatabase(db);
  }
}

async function getMenuById(id) {
  const db = await openDatabase();

  try {
    return await get(
      db,
      "SELECT * FROM menu_items WHERE id = ?",
      [id]
    );
  } finally {
    await closeDatabase(db);
  }
}

module.exports = {
  getAllMenus,
  getMenuById,
};
