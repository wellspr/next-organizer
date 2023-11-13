import localforage from "localforage";
import { List as ShoppingList, Notes, Todos } from "@/types";

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

/* Shopping */
export const localShoppingListDB = localforage.createInstance({
    name: "localShoppingListDB",
});

const getLocalShoppingList: () => Promise<ShoppingList[] | null> = async () => {
    const response: (ShoppingList[] | null) = await localShoppingListDB.getItem("shopping_list");
    return response;
};

const setLocalShoppingList = async (lists: ShoppingList[]) => {
    const response: ShoppingList[] = await localShoppingListDB.setItem("shopping_list", lists);
    return response;
};

const getLocalUnsavedShoppingList = async () => {
    const unsavedShopping: (string[] | null) = await localShoppingListDB.getItem("unsaved_shopping_list");
    return unsavedShopping;
};

const setLocalUnsavedShoppingList = async (unsavedList: string[]) => {
    const response = await localShoppingListDB.setItem("unsaved_shopping_list", unsavedList);
    return response;
};

const shoppingList = {
    get: getLocalShoppingList,
    set: setLocalShoppingList,
};

const unsavedShoppingList = {
    get: getLocalUnsavedShoppingList,
    set: setLocalUnsavedShoppingList,
}

export const store = {
    todos, unsavedTodos,
    notes, unsavedNotes,
    shoppingList, unsavedShoppingList,
};