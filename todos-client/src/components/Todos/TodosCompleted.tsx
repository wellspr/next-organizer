"use client";

import { useEffect, useState } from "react";
import { Todos, useTodos } from "@/context";
import Loading from "../Common/Loading";
import Button from "../Common/Button";

const TodosCompleted = () => {

    const { todos, updateTodo, deleteTodo } = useTodos();
    const [completed, setCompleted] = useState<Todos>();

    useEffect(() => {
        if (todos) {
            setCompleted(todos.filter(todo => {
                return todo.finished === true && todo.deleted === false;
            }));
        }
    }, [todos]);

    if (!completed) {
        return <div className="list">
            <div className="list__empty">
                <Loading />
            </div>
        </div>
    }

    if (completed && completed.length === 0) {
        return <div className="list">
            <div className="list__empty list__empty--finished">
                There are no completed Todos yet!
            </div>
        </div>
    }

    return (
        <div className="list completed">
            {
                completed.map(todo => {
                    return (
                        <li
                            key={todo.key}
                            className="list__item list__item--finished"
                        >
                            <div className="list__item__name">
                                {todo.name}
                            </div>
                            <div className="list__item__buttons">
                                <Button
                                    className="button button__control button__repeat"
                                    label="Repeat"
                                    onClick={() => updateTodo(todo.key, { ...todo, finished: false })}
                                />
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

export default TodosCompleted;