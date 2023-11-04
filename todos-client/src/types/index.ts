import { DeltaType } from "@wellspr/react-quill-editor";

export type Todo = {
    key: string,
    created: number,
    updated: number | null,
    name: string,
    finished: boolean,
    deleted: boolean,
}

export type Todos = Todo[];

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