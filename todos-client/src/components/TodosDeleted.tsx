"use client";

import { Todos, useTodos } from "@/context";
import { Button, Loading } from ".";
import { useEffect, useState } from "react";

const TodosDeleted = () => {

    const { todos, updateTodo, deleteTodoPermanently } = useTodos();
    const [deleted, setDeleted] = useState<Todos>();

    useEffect(() => {
        if (todos) {
            setDeleted(todos.filter(todo => {
                return todo.deleted === true;
            }));
        }
    }, [todos]);

    if (!deleted) {
        return <div className="list">
            <div className="list__empty">
                <Loading />
            </div>
        </div>
    }

    if (deleted && deleted.length === 0) {
        return <div className="list">
            <div className="list__empty list__empty--deleted">
                The trash bin is empty!
            </div>
        </div>
    }

    return (
        <div className="list deleted">
            {
                deleted.map(todo => {
                    return (
                        <li key={todo.key} className="list__item list__item--deleted">
                            <div className="list__item__name">
                                {todo.name}
                            </div>
                            <div className="list__item__buttons">
                                <Button
                                    className="button button__control button__restore-todo"
                                    onClick={() => updateTodo(todo.key, { ...todo, deleted: false })}
                                    label="Restore"
                                />
                                <Button
                                    className="button button__control button__delete-todo"
                                    onClick={() => deleteTodoPermanently(todo.key)}
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

export default TodosDeleted;