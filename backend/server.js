import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

console.log("Starting server...");

const app = express();
app.use(cors());
app.use(express.json());

let db; // shared DB connection

async function startServer() {
  try {
    // --------------------
    // MySQL connection
    // --------------------
    db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "crud",
    });

    console.log("MySQL connected");

    // --------------------
    // CRUD Routes
    // --------------------

    // GET all products (async/await) 
    
    app.get("/api/products", async (req, res) => {
      try {
        const [rows] = await db.query("SELECT * FROM products");

        console.log(rows);

        res.json(rows);
        
          } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

 

    // GET all products (Promise .then())
    /*
    app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products")
    .then(([rows]) => {
      res.json(rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});


// GET all products (Callback)
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

*/
    // CREATE product
    app.post("/api/products", async (req, res) => {
      try {
        const { title, description, price } = req.body;

        const [result] = await db.query(
          "INSERT INTO products (title, description, price) VALUES (?, ?, ?)",
          [title, description, price]
        );

        res.status(201).json({
          message: "Product created",
          id: result.insertId,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    // UPDATE product
    app.put("/api/products/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { title, price, description } = req.body;

        const [result] = await db.query(
          "UPDATE products SET title = ?, price = ?, description = ? WHERE id = ?",
          [title, price, description, id]
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Product not found" });
        }

        res.sendStatus(204);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    // DELETE product
    app.delete("/api/products/:id", async (req, res) => {
      try {
        const { id } = req.params;

        const [result] = await db.query(
          "DELETE FROM products WHERE id = ?",
          [id]
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Product not found" });
        }

        res.sendStatus(204);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    // --------------------
    // Start server
    // --------------------
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();