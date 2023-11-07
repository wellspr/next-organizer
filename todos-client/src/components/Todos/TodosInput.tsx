"use client";

import { useState } from "react";
import { useTodos } from "../../context";
import Button from "../Common/Button";

const TodosInput = () => {

    const { addTodo, inputRef } = useTodos();
    const [name, setName] = useState<string>("");

    return (
        <form
            className="form"
            onSubmit={e => {
                e.preventDefault();
                addTodo(name);
                setName("");
            }}
        >
            <div className="form__group form__group--todos">
                <label htmlFor="todo-input" className="form__group__label "></label>
                <input
                    ref={inputRef}
                    id="todo-input"
                    type="text"
                    className="form__group__input form__group__input--todos"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Button
                    className="button form__group__button"
                    label="Add Todo"
                    disabled={name.length === 0}
                />
            </div>
        </form>
    );
};

export default TodosInput;