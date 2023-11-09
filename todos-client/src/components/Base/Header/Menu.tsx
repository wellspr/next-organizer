"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = (props: {
    baseClassName: string
}) => {

    const path = usePathname();

    console.log(path, path.split("/"), path.split("/")[1]);

    return (
        <div className={
            props.baseClassName ?
                `${props.baseClassName}__menu` :
                "menu"
        }>
            <nav className="menu__nav">
                <Link
                    className={
                        path.split("/")[1] === "" ? 
                        "menu__nav menu__nav--active" : 
                        "menu__nav"
                    }
                    href={"/"}
                >
                    Home
                </Link>
                <Link
                    className={
                        path.split("/")[1] === "todos" ? 
                        "menu__nav menu__nav--active" : 
                        "menu__nav"
                    }
                    href={"/todos"}
                >
                    Todos
                </Link>
                <Link
                    className={
                        path.split("/")[1] === "notes" ? 
                        "menu__nav menu__nav--active" : 
                        "menu__nav"
                    }
                    href={"/notes"}
                >
                    Notes
                </Link>
            </nav>
        </div>
    );
};

export default Menu;