"use client";

import { Button } from ".";
import { useActiveSection } from "@/context";

const TodosMenu = () => {

    const { active, setActive } = useActiveSection();

    return (
        <div className="todos__menu">
            <Button
                className={
                    active === "current" ?
                        "button todos__menu__button todos__menu__button--active" :
                        "button todos__menu__button"
                }
                onClick={() => { setActive("current") }}
                label={"Current"}
            />
            <Button
                className={
                    active === "completed" ?
                        "button todos__menu__button todos__menu__button--active" :
                        "button todos__menu__button"
                }
                onClick={() => { setActive("completed") }}
                label={"Completed"}
            />
            <Button
                className={
                    active === "deleted" ?
                        "button todos__menu__button todos__menu__button--active" :
                        "button todos__menu__button"
                }
                onClick={() => { setActive("deleted") }}
                label={"Trash"}
            />
        </div>
    );
};

export default TodosMenu;