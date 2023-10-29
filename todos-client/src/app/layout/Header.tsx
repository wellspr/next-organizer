"use client"

import { Button, TodosInput } from "../components";
import { useTodo } from "../context";

const Header = () => {

    const { synchronizeTodos, synchronized } = useTodo();

    return (
        <header className="header">
            <div className="header__top">
                <div className="header__top__app-name">
                    <h1>Next Todos</h1>
                </div>

                <div className="header__top__buttons">
                    <Button
                        className={
                            synchronized ?
                                "button button__sync button__sync--synced" :
                                "button button__sync"
                        }
                        label={synchronized ? "Synced!" : "Sync"}
                        type="button"
                        disabled={synchronized}
                        onClick={synchronizeTodos}
                    />
                </div>
            </div>

            <TodosInput />
        </header>
    );
};

export default Header;