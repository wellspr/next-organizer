const port = process.env.PORT || 4000;
import express from "express";
import { todosDB, notesDB } from "./db/index.js";

const app = express();
app.use(express.json());

app.get("/todos/fetch", async (req, res) => {
    const response = await todosDB().fetch();
    res.json(response);
});

app.post("/todos/save", async (req, res) => {
    const { data } = req.body;
    const { todos } = data;
    const response = await todosDB().save(todos);
    res.json(response);
});

app.delete("/todos/delete", async (req, res) => {
    const { key } = req.body;
    await todosDB().delete(key);
    res.json({ key });
});

app.get("/notes/fetch", async (req, res) => {
    const response = await notesDB().fetch();
    res.json(response);
});

app.post("/notes/save", async (req, res) => {
    const { data } = req.body;
    const { notes } = data;
    const response = await notesDB().save(notes);
    res.json(response);
});

app.delete("/notes/delete", async (req, res) => {
    const { key } = req.body;
    await notesDB().delete(key);
    res.json({ key });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});