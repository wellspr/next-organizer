export type Todo = {
    key: string,
    created: number,
    updated: number | null,
    name: string,
    finished: boolean,
    deleted: boolean,
}

export type Todos = Todo[];
