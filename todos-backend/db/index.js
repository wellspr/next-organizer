import { Deta } from "deta";

const deta = Deta();

const todosDB = () => {

    const db = deta.Base("todos_db");

    const fetchTodos = async () => {
        return await db.fetch();
    };

    const saveTodos = async (data) => {
        return await db.putMany(data);
    };

    const deleteTodo = async (key) => {
        return await db.delete(key);
    };

    return {
        save: saveTodos,
        delete: deleteTodo,
        fetch: fetchTodos,
    }
};

const notesDB = () => {

    const db = deta.Base("notes_db");

    const fetchNotes = async () => {
        return await db.fetch();
    };

    const saveNotes = async (data) => {
        return await db.putMany(data);
    };

    const deleteNote = async (key) => {
        return await db.delete(key);
    };

    return {
        save: saveNotes,
        delete: deleteNote,
        fetch: fetchNotes,
    }
};

const shoppingListDB = () => {

    const db = deta.Base("shopping_db");

    const fetchLists = async () => {
        return await db.fetch();
    };

    const saveLists = async (data) => {
        return await db.putMany(data);
    };

    const deleteList = async (key) => {
        return await db.delete(key);
    };

    return {
        save: saveLists,
        delete: deleteList,
        fetch: fetchLists,
    }
}

export { todosDB, notesDB, shoppingListDB };