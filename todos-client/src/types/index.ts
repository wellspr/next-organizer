import { DeltaType } from "@wellspr/react-quill-editor";

/* Todos */
export type Todo = {
    key: string,
    created: number,
    updated: number | null,
    name: string,
    finished: boolean,
    deleted: boolean,
}

export type Todos = Todo[];

/* Notes */
export type EditorContent = {
    delta: DeltaType | undefined,
    html: string | undefined,
}

export type Note = {
    key: string,
    created: number,
    updated: number | null,
    title: string,
    content: EditorContent
    deleted: boolean,
}

export type Notes = Note[];

/* Shopping List */
export type Item = {
    key: string,
    name: string,
    quantity: string,
    price: string,
    created: number,
    updated: number | null,
    deleted: boolean,
};

export type List = {
    key: string,
    name: string,
    created: number,
    updated: number | null,
    deleted: boolean,
    items: Item[],
};

export type Lists = List[];

export type listUpdates = {
    name?: string,
    deleted?: boolean,
    items?: Item[],
};