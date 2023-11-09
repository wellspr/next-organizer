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
import { api } from "@/db";

interface ContextProps {
    editorContent: EditorContent,
    setEditorContent: React.Dispatch<EditorContent>,
    notes: Notes | undefined,
    addNote: (title: string, content: EditorContent) => void,
    updateNote: (key: string, title: string, content: EditorContent) => void,
    deleteNote: (key: string) => void,
    deleteNotePermanently: (key: string) => void,
    restoreNote: (key: string) => void,
    synchronizeNotes: () => void,
    synchronized: boolean,
    syncing: boolean,
}

const defaultValue: ContextProps = {
    editorContent: { delta: undefined, html: undefined },
    setEditorContent: () => { },
    notes: [],
    addNote: () => { },
    updateNote: () => { },
    deleteNote: () => { },
    deleteNotePermanently: () => { },
    restoreNote: () => { },
    synchronizeNotes: () => { },
    synchronized: true,
    syncing: false,
};

const Context = createContext<ContextProps>(defaultValue);

const NotesProvider = (props: { children: React.ReactNode }) => {

    const [editorContent, setEditorContent] = useState<EditorContent>(defaultValue.editorContent);
    const [notes, setNotes] = useState<Notes>();
    const [unsavedNotes, setUnsavedNotes] = useState<string[]>();
    const [syncing, setSyncing] = useState<boolean>(false);

    useEffect(() => {
        store.unsavedNotes.get()
            .then(unsaved => {
                if (unsaved && unsaved.length > 0) {

                    setUnsavedNotes(unsaved);

                    store.notes.get()
                        .then(notes => {
                            if (notes) {
                                setNotes(notes)
                            } else {
                                setNotes([]);
                            }
                        });

                } else {

                    setUnsavedNotes([]);

                    api.notes.fetchData()
                        .then(notes => {
                            if (notes && notes.length > 0) {
                                setNotes(notes);
                                store.notes.set(notes);
                            } else {
                                setNotes([]);
                            }
                        });
                }
            })
    }, []);

    useEffect(() => {
        if (notes) {
            store.notes.set(notes)
                .then(notes => console.log("NOTES: ", notes));
        }
    }, [notes]);

    useEffect(() => {
        if (unsavedNotes) {
            store.unsavedNotes.set(unsavedNotes)
                .then(unsavedNotes => console.log("UNSAVED: ", unsavedNotes));
        }
    }, [unsavedNotes]);

    const addKeyToUnsavedNotes = useCallback((key: string) => {
        if (unsavedNotes) {
            const unsavedNotesSet = new Set([...unsavedNotes, key]);
            const updatedNotesList: string[] = [];
            unsavedNotesSet.forEach(val => updatedNotesList.push(val));
            setUnsavedNotes(updatedNotesList);
        }
    }, [unsavedNotes]);

    const removeKeyFromUnsavedNotes = useCallback((key: string) => {
        if (unsavedNotes) {
            setUnsavedNotes(unsavedNotes.filter(noteKey => noteKey !== key));
        }
    }, [unsavedNotes]);

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

        addKeyToUnsavedNotes(key);

    }, [notes, addKeyToUnsavedNotes]);

    const updateNote = useCallback((key: string, title: string, content: EditorContent) => {
        if (notes) {
            setNotes(notes.map(note => {
                if (note.key === key) {
                    return { ...note, ...{ updated: Date.now(), title, content } };
                }
                return note;
            }));

            addKeyToUnsavedNotes(key);
        }
    }, [notes, addKeyToUnsavedNotes]);

    const deleteNote = useCallback((key: string) => {
        if (notes) {
            setNotes(notes.map(note => {
                if (note.key === key) {
                    return { ...note, ...{ deleted: true } };
                }
                return note;
            }));

            addKeyToUnsavedNotes(key);
        }
    }, [notes, addKeyToUnsavedNotes]);

    const restoreNote = useCallback((key: string) => {
        if (notes) {
            setNotes(notes.map(note => {
                if (note.key === key) {
                    const deletedNote: Note = { ...note, ...{ deleted: false } }
                    return deletedNote;
                }
                return note;
            }));

            addKeyToUnsavedNotes(key);
        }
    }, [notes, addKeyToUnsavedNotes]);

    const deleteNotePermanently = useCallback((key: string) => {
        api.notes.deleteData(key)
            .then(r => r.key)
            .then(key => {
                removeKeyFromUnsavedNotes(key);
                if (notes) {
                    setNotes(notes.filter(note => note.key !== key));
                }
            })
            .catch(err => console.log("Error deleting from server: ", err));
    }, [notes, removeKeyFromUnsavedNotes]);

    const synchronizeNotes = useCallback(async () => {
        const synchronize = async () => {
            const notesToSync: Notes = [];
            if (unsavedNotes) {
                unsavedNotes.forEach(key => {
                    if (notes) {
                        const note: Note = notes.filter(note => note.key === key)[0];
                        notesToSync.push(note);
                    }
                });

                api.notes.postData(notesToSync)
                    .then(syncedNotes => {
                        const syncedKeys = syncedNotes.map(note => note.key);
                        setUnsavedNotes(unsavedNotes.filter(key => !syncedKeys.includes(key)));
                    })
                    .catch(err => console.log("Synchronization error: ", err))
                    .finally(() => setSyncing(false));
            }
        };

        setSyncing(true);
        synchronize();
    }, [unsavedNotes, notes]);

    const value: ContextProps = {
        editorContent,
        setEditorContent,
        notes,
        addNote,
        updateNote,
        deleteNote,
        deleteNotePermanently,
        restoreNote,
        synchronizeNotes,
        synchronized: !unsavedNotes || unsavedNotes.length === 0,
        syncing,
    };

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
};

export default NotesProvider;

export const useNotes = () => useContext(Context);