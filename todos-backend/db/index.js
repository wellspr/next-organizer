import { Deta } from "deta";

const deta = Deta();

export const db = deta.Base("todos_db");

export const saveTodos = async (data) => {
    return await db.putMany(data);
};

export const deleteTodo = async (key) => {
    return await db.delete(key);
};

export const fetchTodos = async () => {
    return await db.fetch();
};

const todosDB = {
    save: saveTodos,
    delete: deleteTodo,
    fetch: fetchTodos,
};

export { todosDB };