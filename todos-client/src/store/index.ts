import localforage from "localforage";
import { Todos } from "@/types";

export const localDB = localforage.createInstance({
    name: "localDB",
});

const getLocalData: () => Promise<(Todos | null)> = async () => {
    const data: (Todos | null) = await localDB.getItem("todos");
    return data;
};

const setLocalData = async (todos: Todos) => {
    const response: Todos = await localDB.setItem("todos", todos);
    return response;
};

const getLocalUnsavedItems = async () => {
    const unsavedItems: (string[] | null) = await localDB.getItem("unsaved_items");
    return unsavedItems;
};

const setLocalUnsavedItems = async (unsavedItems: string[]) => {
    const response = await localDB.setItem("unsaved_items", unsavedItems);
    return response;
};

export const store = {
    getLocalData,
    setLocalData,
    getLocalUnsavedItems,
    setLocalUnsavedItems,
};