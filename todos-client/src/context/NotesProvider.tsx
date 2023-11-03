"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
    notes: any,
    setNotes: React.Dispatch<any>,
}

const defaultValue: ContextProps = {
    notes: [],
    setNotes: () => {},
};

const Context = createContext<ContextProps>(defaultValue);

const NotesProvider = (props: {
    children: React.ReactNode,
}) => {

    const [notes, setNotes] = useState<any>([]);

    useEffect(() => {
        console.log(notes);
    }, [notes]);

    const value = {
        notes,
        setNotes,
    };

    return <Context.Provider value={value}>
        { props.children }
    </Context.Provider>
};

export default NotesProvider;

export const useNotes = () => useContext(Context);