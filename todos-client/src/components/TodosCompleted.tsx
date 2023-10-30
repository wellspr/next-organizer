"use client";

import { useTodos } from "@/context";
import { Button, Loading } from ".";

const TodosCompleted = () => {

    const { todos, updateTodo, deleteTodo } = useTodos();

    if (!todos) {
        return <div className="list">
            <Loading />
        </div>
    }

    return (
        <div className="list-completed">
            {
                todos.map(todo => {

                    if (todo.deleted) return null;

                    if (todo.finished) {
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
                    }

                    return null;
                })
            }
        </div>
    );
};

export default TodosCompleted;