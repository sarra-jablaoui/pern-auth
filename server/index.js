const express = require("express");
const app = express(); 
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Route POST pour enregistrer un nouvel utilisateur
app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username et password requis" });
    }

    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Nom d'utilisateur déjà utilisé" });
    }

    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(5000, () => {
  console.log("✅ Le serveur a démarré sur le port 5000");
});
