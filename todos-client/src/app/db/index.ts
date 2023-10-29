import {
    FetchResponse,
    PutManyResponse,
} from "deta/dist/types/types/base/response";

import { Todo, Todos } from "../types";

import axios, { AxiosResponse } from "axios";

const db = axios.create({
    baseURL: "/api",
});

export const api = {

    deleteData: async (key: string) => {
        const response = await db.delete("/delete", { data: { key } });
        const { deletedKey } : { deletedKey: string } = response.data;
        return { deletedKey };
    },

    postData: async (todos: Todo[]) => {
        const response = await db.post("/save", { data: { todos } });
        const data: PutManyResponse = response.data;
        return data.processed.items as Todos;
    },

    getTodosFromServer: async () => {
        const response: AxiosResponse = await db.get("/fetch");
        const data: FetchResponse = response.data;
        return data.items as Todos;
    }
};
