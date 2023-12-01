const port = process.env.PORT || 4000;
import express from "express";
import { todosDB, notesDB, shoppingListDB } from "./db/index.js";

const app = express();
app.use(express.json());

/* Todos */
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

/* Notes */
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

/* Shopping */
app.get("/shopping/fetch", async (req, res) => {
    const response = await shoppingListDB().fetch();
    res.json(response);
});

app.post("/shopping/save", async (req, res) => {
    const { data } = req.body;
    const { lists } = data;
    const response = await shoppingListDB().save(lists);
    res.json(response);
});

app.delete("/shopping/delete", async (req, res) => {
    const { key } = req.body;
    await shoppingListDB().delete(key);
    res.json({ key });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});