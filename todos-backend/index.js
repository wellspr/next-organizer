const port = process.env.PORT || 4000;
import express from "express";
import { todosDB } from "./db/index.js";

const app = express();
app.use(express.json());

app.get("/fetch", async (req, res) => {
    const response = await todosDB.fetch();
    res.json(response);
});

app.post("/save", async (req, res) => {
    const { data } = req.body;
    const { todos } = data;
    const response = await todosDB.save(todos);
    res.json(response);
});

app.delete("/delete", async (req, res) => {
    const { key } = req.body;
    await todosDB.delete(key);
    res.json({ key });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});