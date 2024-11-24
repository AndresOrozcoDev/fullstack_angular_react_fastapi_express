const sqlite3 = require("sqlite3").verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.message);
  } else {
    console.log("Conexión exitosa a la base de datos.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user'
    )
  `);
});

// Hashear la contraseña antes de insertarla
bcrypt.hash("1234", 10, (err, hashedPassword) => {
  if (err) {
    console.error("Error al hashear la contraseña:", err.message);
    return;
  }

  // Insertar el registro con la contraseña hasheada
  const stmt = db.prepare(
    "INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)"
  );
  stmt.run("admin", hashedPassword, "admin", function (err) {
    if (err) {
      console.error("Error al insertar el registro:", err.message);
    } else {
      console.log("Registro insertado correctamente");
    }
  });
  stmt.finalize();
});

module.exports = db;
