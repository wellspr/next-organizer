"use client";

import { useState } from "react";
import { Todo, useTodos } from "@/context";
import { Button, Loading } from ".";

const TodosList = () => {

    const { 
        todos, 
        updateTodo,
        deleteTodo,
        inputRef,
        updateRef, 
    } = useTodos();

    const [updated, setUpdated] = useState<string>("");
    const [selectedForUpdate, setSelectedForUpdate] = useState<string | null>(null);

    const showUpdateInput = (todo: Todo) => {
        setUpdated(todo.name);
        setSelectedForUpdate(todo.key);
        updateRef?.current?.focus();
    };

    const hideUpdateInput = () => {
        setUpdated("");
        setSelectedForUpdate(null);
        inputRef?.current?.focus();
    };

    if (!todos) {
        return <div className="list">
            <Loading />
        </div>
    }

    return (
        <div className="list">
            {
                todos.map(todo => {

                    if (todo.finished || todo.deleted) return null;
                    
                    return (
                        <li
                            key={todo.key}
                            className={todo.finished ? "list__item list__item--finished" : "list__item"}
                        >
                            <div className="list__item__name">
                                <div
                                    className={
                                        (selectedForUpdate === todo.key) ?
                                            "list__item__value" :
                                            "list__item__value list__item__value--show"
                                    }
                                >
                                    {todo.name}
                                </div>
                                <form
                                    className={
                                        (selectedForUpdate === todo.key) ?
                                            "list__item__input list__item__input--show" :
                                            "list__item__input"
                                    }
                                    onSubmit={e => {
                                        e.preventDefault();
                                        updateTodo(todo.key, { ...todo, name: updated });
                                        hideUpdateInput();
                                    }}
                                >
                                    <input
                                        ref={updateRef}
                                        type="text"
                                        value={updated}
                                        onChange={e => setUpdated(e.target.value)}
                                    />
                                    <div className="list__item__buttons list__item__buttons--update">
                                        <Button
                                            className="button button__control button__update-todo"
                                            type="submit"
                                            label="Save"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="list__item__buttons">
                                {
                                    todo.finished ?
                                        <Button className="button button__control" label="Done!" /> :
                                        <Button
                                            className="button button__control button-mark-as-done"
                                            onClick={() => updateTodo(todo.key, { ...todo, finished: true })}
                                            label="Mark as done"
                                        />
                                }
                                {
                                    selectedForUpdate === todo.key ?
                                        <Button
                                            className="button button__control button__cancel"
                                            onClick={hideUpdateInput}
                                            label="Cancel"
                                        /> :
                                        <Button
                                            className="button button__control button__update-todo"
                                            onClick={() => showUpdateInput(todo)}
                                            label="Update"
                                        />
                                }
                                <Button
                                    className="button button__control button__delete-todo"
                                    onClick={() => deleteTodo(todo.key)}
                                    label="Delete"
                                />
                            </div>
                        </li>
                    );
                })
            }
        </div>
    );
};

export default TodosList;