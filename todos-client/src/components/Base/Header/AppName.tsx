"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";

const AppName = (props: {
    baseClassName: string
}) => {
    const path = usePathname();

    const name = useCallback(() => {
        if (path) {
            const pageName = path.split("/")[1];

            switch(pageName) {
                case "":
                    return "Home";
                case "notes":
                    return "Notes";
                case "shopping":
                    return "Shopping";
                case "todos":
                    return "Todos";
                default:
                    return "";
            }
        }
    }, [path]);

    return (
        <div
            className={
                props.baseClassName ?
                    `${props.baseClassName}__app-name` :
                    "app-name"
            }
        >
            <h1>Next Organizer - { name() }</h1>
        </div>
    );
};

export default AppName;