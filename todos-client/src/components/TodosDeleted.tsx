"use client";

import { useTodos } from "@/context";
import { Button, Loading } from ".";

const TodosDeleted = () => {

    const { todos, updateTodo, deleteTodoPermanently } = useTodos();

    if (!todos) {
        return <div className="list">
            <Loading />
        </div>
    }

    return (
        <div className="list-deleted">
            {
                todos.map(todo => {

                    if (todo.deleted) {
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
                    }

                    return null;
                })
            }
        </div>
    );
};

export default TodosDeleted;