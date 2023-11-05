import Link from "next/link";

const Menu = (props: {
    baseClassName: string
}) => {
    return (
        <div className={
            props.baseClassName ? 
            `${props.baseClassName}__menu` :
            "menu"
        }>
            <nav>
                <Link href={"/"}>Home</Link>
                <Link href={"/todos"}>Todos</Link>
                <Link href={"/notes"}>Notes</Link>
            </nav>
        </div>
    );
};

export default Menu;