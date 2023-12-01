import {
    FetchResponse,
    PutManyResponse,
} from "deta/dist/types/types/base/response";

import { Lists, Notes, Todos } from "@/types";

import axios, { AxiosResponse } from "axios";

const todosDB = axios.create({
    baseURL: "/api/todos",
});

const notesDB = axios.create({
    baseURL: "/api/notes",
});

const shoppingListDB = axios.create({
    baseURL: "/api/shopping",
});

export const api = {

    todos: {
        fetchData: async () => {
            const response: AxiosResponse = await todosDB.get("/fetch");
            const data: FetchResponse = response.data;
            return data.items as Todos;
        },

        postData: async (todos: Todos) => {
            const response = await todosDB.post("/save", { data: { todos } });
            const data: PutManyResponse = response.data;
            return data.processed.items as Todos;
        },

        deleteData: async (key: string) => {
            const response = await todosDB.delete("/delete", { data: { key } });
            return { key: response.data.key as string };
        },
    },

    notes: {
        fetchData: async () => {
            const response: AxiosResponse = await notesDB.get("/fetch");
            const data: FetchResponse = response.data;
            return data.items as Notes;
        },

        postData: async (notes: Notes) => {
            const response = await notesDB.post("/save", { data: { notes } });
            const data: PutManyResponse = response.data;
            return data.processed.items as Notes;
        },

        deleteData: async (key: string) => {
            const response = await notesDB.delete("/delete", { data: { key } });
            return { key: response.data.key as string };
        },
    },

    shopping: {
        fetchData: async () => {
            const response: AxiosResponse = await shoppingListDB.get("/fetch");
            const data: FetchResponse = response.data;
            return data.items as Lists;
        },

        postData: async (lists: Lists) => {
            const response = await shoppingListDB.post("/save", { data: { lists } });
            const data: PutManyResponse = response.data;
            return data.processed.items as Lists;
        },

        deleteData: async (key: string) => {
            const response = await shoppingListDB.delete("/delete", { data: { key } });
            return { key: response.data.key as string };
        },
    }
};
