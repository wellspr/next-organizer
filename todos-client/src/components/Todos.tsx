"use client";

import { useState } from "react";
import { TodosCompleted, TodosDeleted, TodosList } from ".";

const Todos = () => {

    const [active, setActive] = useState<"current" | "completed" | "deleted">("current");

    return (
        <div className="todos">
            <div className="todos__menu">
                <button
                    className={
                        active === "current" ?
                        "button todos__menu__button todos__menu__button--active" :
                        "button todos__menu__button"
                    }
                    onClick={() => { setActive("current") }}
                >
                    Current
                </button>
                <button
                    className={
                        active === "completed" ?
                        "button todos__menu__button todos__menu__button--active" :
                        "button todos__menu__button"
                    }
                    onClick={() => { setActive("completed") }}
                >
                    Completed
                </button>
                <button
                    className={
                        active === "deleted" ?
                        "button todos__menu__button todos__menu__button--active" :
                        "button todos__menu__button"
                    }
                    onClick={() => { setActive("deleted") }}
                >
                    Trash
                </button>
            </div>
            <div className="todos__content">
                <section
                    id="current"
                    className={
                        active === "current" ?
                            "todos__content__current todos__content__current--active" :
                            "todos__content__current"
                    }
                >
                    <TodosList />
                </section>

                <section
                    id="completed"
                    className={
                        active === "completed" ?
                            "todos__content__completed todos__content__completed--active" :
                            "todos__content__completed"
                    }
                >
                    <TodosCompleted />
                </section>

                <section
                    id="deleted"
                    className={
                        active === "deleted" ?
                        "todos__content__deleted todos__content__deleted--active" :
                        "todos__content__deleted"
                    }
                >
                    <TodosDeleted />
                </section>
            </div>
        </div>
    );
};

export default Todos;