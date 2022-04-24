import express from "express";
import db from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ extended: true }));

app.get("/posts", async (req, res) => {
  const [data] = await db.query("SELECT * FROM posts");
  res.send(data);
});

app.post("/posts", async (req, res) => {
  const { title, content, category = null } = req.body;

  if (!title || !content) {
    return res.status(400).send("Please provide a title and content");
  }

  const [result] = await db.execute(
    "INSERT INTO posts (title, content, category) VALUES (?,?,?)",
    [title, content, category]
  );
  res.send({ success: result.affectedRows > 0 });
});

app.patch("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  if (isNaN(id) || !title) return res.status(400).send("Bad request");

  const [data] = await db.execute("UPDATE posts SET title = ? WHERE id = ?", [
    title,
    id,
  ]);
  res.send({ success: data.affectedRows > 0 });
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const [data] = await db.execute("DELETE FROM posts WHERE id=?", [id]);
  res.send({ success: data.affectedRows > 0 });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
