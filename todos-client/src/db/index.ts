import {
    FetchResponse,
    PutManyResponse,
} from "deta/dist/types/types/base/response";

import { Todo, Todos } from "@/types";

import axios, { AxiosResponse } from "axios";

const db = axios.create({
    baseURL: "/api",
});

export const api = {
    deleteData: async (key: string) => {
        console.log("KEY: ", key);
        const response = await db.delete("/delete", { data: { key } });
        return { key: response.data.key as string };
    },

    postData: async (todos: Todo[]) => {
        const response = await db.post("/save", { data: { todos } });
        const data: PutManyResponse = response.data;
        return data.processed.items as Todos;
    },

    fetchData: async () => {
        const response: AxiosResponse = await db.get("/fetch");
        const data: FetchResponse = response.data;
        return data.items as Todos;
    }
};
