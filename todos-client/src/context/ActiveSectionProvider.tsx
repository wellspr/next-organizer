"use client";

import { createContext, useContext, useState } from "react";

export type ActiveSectionType = "current" | "completed" | "deleted";

interface ProviderProps {
    active: ActiveSectionType;
    setActive: React.Dispatch<React.SetStateAction<ActiveSectionType>>
}

const defaultValue: ProviderProps = {
    active: "current",
    setActive: () => {}
};
const Context = createContext(defaultValue);

const ActiveSectionProvider = (props: { children: React.ReactNode }) => {

    const [active, setActive] = useState<ActiveSectionType>("current");

    const value = {active, setActive};
    return <Context.Provider value={value}>
        { props.children }
    </Context.Provider>
};

const useActiveSection = () => useContext<ProviderProps>(Context);

export {
    ActiveSectionProvider as default,
    useActiveSection,
};