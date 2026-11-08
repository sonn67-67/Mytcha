
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const databasePath = path.join(__dirname, "../../pos.sqlite");

const sqlPath = path.join(
  __dirname,
  "../sql_scripts/pos_init.sql"
);


function openDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(databasePath, (error) => {
      if (error) reject(error);
      else resolve(db);
    });
  });
}

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (error) {
      if (error) reject(error);
      else resolve({
        lastID: this.lastID,
        changes: this.changes,
      });
    });
  });
}

function get(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) reject(error);
      else resolve(row);
    });
  });
}

function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
}

function exec(db, sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

function closeDatabase(db) {
  return new Promise((resolve, reject) => {
    db.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

// Data awal 18 menu Matcha House
const initialMenus = [
  [1, "Matcha Latte", 52000, "Drink", "matcha-latte.png"],
  [2, "Osmanthus Matcha Latte", 55000, "Drink", "osmanthus-matcha-latte.png"],
  [3, "Ube Matcha Latte", 59000, "Drink", "ube-matcha-latte.png"],
  [4, "Berry Matcha Latte", 55000, "Drink", "berry-matcha-latte.png"],
  [5, "Dirty Matcha", 56000, "Drink", "dirty-matcha.png"],
  [6, "Coconut Matcha", 45000, "Drink", "coconut-matcha.png"],
  [7, "Corn Milk Matcha", 68000, "Drink", "corn-milk-matcha.png"],
  [8, "Sea Salt Matcha Latte", 70000, "Drink", "sea-salt-matcha-latte.png"],
  [9, "Usucha", 48000, "Drink", "usucha.png"],
  [10, "Hojicha Latte", 50000, "Drink", "hojicha-latte.png"],
  [11, "Original Salt Bread", 25000, "Dessert", "original-salt-bread.png"],
  [12, "Truffle Salt Bread", 35000, "Dessert", "truffle-salt-bread.png"],
  [13, "Burnt Matcha Cheese Cake", 72000, "Dessert", "burnt-matcha-cheese-cake.png"],
  [14, "Burnt Cheese Cake", 62000, "Dessert", "burnt-cheese-cake.png"],
  [15, "Matcha Tiramisu", 80000, "Dessert", "matcha-tiramisu.png"],
  [16, "Ube Tiramisu", 80000, "Dessert", "ube-tiramisu.png"],
  [17, "Dubai Cheewy Cookie", 40000, "Dessert", "dubai-cheewy-cookie.png"],
  [18, "Ube Cheewy Cookie", 42000, "Dessert", "ube-cheewy-cookie.png"],
];

async function initializePosDatabase() {
  const db = await openDatabase();

  try {
    const schema = fs.readFileSync(sqlPath, "utf8");
    await exec(db, schema);

    for (const [id, name, price, category, filename] of initialMenus) {
      await run(
        db,
        `INSERT OR IGNORE INTO menu_items
         (id, name, price, category, image, description)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          id,
          name,
          price,
          category,
          `/images/${filename}`,
          `${name} dari Matcha House`,
        ]
      );
    }

    console.log("✅ Database POS Matcha House siap");
  } finally {
    await closeDatabase(db);
  }
}

module.exports = {
  openDatabase,
  run,
  get,
  all,
  exec,
  closeDatabase,
  initializePosDatabase,
};
