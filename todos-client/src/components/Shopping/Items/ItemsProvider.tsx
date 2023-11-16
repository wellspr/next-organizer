"use client";

import { createContext, useContext, useRef } from "react";

interface ContextProps {
    ref: React.RefObject<HTMLInputElement> | null;
}
const defaultValue: ContextProps = { ref: null };
const Context = createContext<ContextProps>(defaultValue);

const ItemsProvider = (props: { children: React.ReactNode }) => {

    const ref = useRef<HTMLInputElement>(null);
    const value: ContextProps = { ref };

    return <Context.Provider value={value}>
        {props.children}
    </Context.Provider>
};

export default ItemsProvider;

export const useItems = () => useContext<ContextProps>(Context);