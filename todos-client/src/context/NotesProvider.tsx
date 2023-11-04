"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";

import { store } from "@/store";
import { EditorContent, Note, Notes } from "@/types";

interface ContextProps {
    editorContent: EditorContent,
    setEditorContent: React.Dispatch<EditorContent>,
    notes: Notes | undefined,
    addNote: (title: string, content: EditorContent) => void,
}

const defaultValue: ContextProps = {
    editorContent: { delta: undefined, html: undefined },
    setEditorContent: () => { },
    notes: [],
    addNote: () => { },
};

const Context = createContext<ContextProps>(defaultValue);

const NotesProvider = (props: { children: React.ReactNode }) => {

    const [editorContent, setEditorContent] = useState<EditorContent>(defaultValue.editorContent);
    const [notes, setNotes] = useState<Notes>();

    const addNote = useCallback((title: string, content: EditorContent) => {
        const key = String(Math.floor(Math.random() * 999999999999));
        const created = Date.now();
        const updated = null;
        const newNote: Note = {
            key,
            created,
            updated,
            title,
            content,
            deleted: false,
        };

        if (notes) {
            const updatedNotes: Notes = [newNote, ...notes];
            setNotes(updatedNotes);
        } else {
            setNotes([newNote]);
        }

    }, [notes]);

    useEffect(() => {
        console.log(notes);
    }, [notes]);

    const value: ContextProps = {
        editorContent,
        setEditorContent,
        notes,
        addNote,
    };

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
};

export default NotesProvider;

export const useNotes = () => useContext(Context);