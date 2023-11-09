import localforage from "localforage";
import { Notes, Todos } from "@/types";

/* Todos */
export const localTodosDB = localforage.createInstance({
    name: "localTodosDB",
});

const getLocalTodos: () => Promise<Todos | null> = async () => {
    const response: (Todos | null) = await localTodosDB.getItem("todos");
    return response;
};

const setLocalTodos = async (todos: Todos) => {
    const response: Todos = await localTodosDB.setItem("todos", todos);
    return response;
};

const getLocalUnsavedItems = async () => {
    const unsavedItems: (string[] | null) = await localTodosDB.getItem("unsaved_items");
    return unsavedItems;
};

const setLocalUnsavedItems = async (unsavedItems: string[]) => {
    const response = await localTodosDB.setItem("unsaved_items", unsavedItems);
    return response;
};

const todos = {
    get: getLocalTodos,
    set: setLocalTodos,
};

const unsavedTodos = {
    get: getLocalUnsavedItems,
    set: setLocalUnsavedItems,
};

/* Notes */
export const localNotesDB = localforage.createInstance({
    name: "localNotesDB",
});

const getLocalNotes: () => Promise<Notes | null> = async () => {
    const response: (Notes | null) = await localNotesDB.getItem("notes");
    return response;
};

const setLocalNotes = async (notes: Notes) => {
    const response: Notes = await localNotesDB.setItem("notes", notes);
    return response;
};

const getLocalUnsavedNotes = async () => {
    const unsavedNotes: (string[] | null) = await localNotesDB.getItem("unsaved_notes");
    return unsavedNotes;
};

const setLocalUnsavedNotes = async (unsavedNotes: string[]) => {
    const response = await localNotesDB.setItem("unsaved_notes", unsavedNotes);
    return response;
};

const notes = {
    get: getLocalNotes,
    set: setLocalNotes,
};

const unsavedNotes = {
    get: getLocalUnsavedNotes,
    set: setLocalUnsavedNotes,
}

export const store = {
    todos,
    unsavedTodos,
    notes,
    unsavedNotes,
};