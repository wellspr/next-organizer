import { Deta } from "deta";
import { DetaType } from "deta/dist/types/types/basic";
import { 
    FetchResponse, 
    DeleteResponse, 
    PutResponse,
    PutManyResponse,
} from "deta/dist/types/types/base/response";

const detaKey = process.env.DETA_PROJECT_KEY;

const deta = Deta(detaKey);

export const db = deta.Base("todos_db");

export type { 
    DetaType as Data, 
    FetchResponse, 
    DeleteResponse, 
    PutResponse,
    PutManyResponse,
};

export const saveTodos = async (data: DetaType[]) => {
    return await db.putMany(data);
};

export const deleteTodo = async (key: string) => {
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