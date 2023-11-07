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
    updateNote: (key: string, title: string, content: EditorContent) => void,
    deleteNote: (key: string) => void,
    restoreNote: (key: string) => void
}

const defaultValue: ContextProps = {
    editorContent: { delta: undefined, html: undefined },
    setEditorContent: () => { },
    notes: [],
    addNote: () => { },
    updateNote: () => { },
    deleteNote: () => { },
    restoreNote: () => { }
};

const Context = createContext<ContextProps>(defaultValue);

const NotesProvider = (props: { children: React.ReactNode }) => {

    const [editorContent, setEditorContent] = useState<EditorContent>(defaultValue.editorContent);
    const [notes, setNotes] = useState<Notes>();

    useEffect(() => {
        store.notes.get()
            .then(notes => {
                if (notes) {
                    setNotes(notes)
                } else {
                    setNotes([]);
                }
            })
    }, []);

    useEffect(() => {
        console.log(notes);
    }, [notes]);

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
            store.notes.set(updatedNotes);
        } else {
            setNotes([newNote]);
            store.notes.set([newNote]);
        }

    }, [notes]);

    const updateNote = useCallback((key: string, title: string, content: EditorContent) => {
        if (notes) {
            const updated: Notes = notes.map(note => {
                const updatedNote: Note = { ...note, ...{ updated: Date.now(), title, content } }
                if (note.key === key) {
                    return updatedNote;
                }
                return note;
            });

            setNotes(updated);
            store.notes.set(updated);
        }
    }, [notes]);

    const deleteNote = useCallback((key: string) => {
        if (notes) {
            //const updatedNotes: Notes = notes.filter(note => note.key !== key);
            const updatedNotes: Notes = notes.map(note => {
                if (note.key === key) {
                    const deletedNote: Note = { ...note, ...{ deleted: true } }
                    return deletedNote;
                }
                return note;
            });
            setNotes(updatedNotes);
            store.notes.set(updatedNotes);
        }
    }, [notes]);

    const restoreNote = useCallback((key: string) => {
        if (notes) {
            const updatedNotes: Notes = notes.map(note => {
                if (note.key === key) {
                    const deletedNote: Note = { ...note, ...{ deleted: false } }
                    return deletedNote;
                }
                return note;
            });
            setNotes(updatedNotes);
            store.notes.set(updatedNotes);
        }
    }, [notes]);

    const value: ContextProps = {
        editorContent,
        setEditorContent,
        notes,
        addNote,
        updateNote,
        deleteNote,
        restoreNote,
    };

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
};

export default NotesProvider;

export const useNotes = () => useContext(Context);