"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";

import { store } from "../store";
import { api } from "../db";
import { Todo, Todos } from "../types";

interface ContextProps {
    addTodo: (name: string) => void;
    updateTodo: (key: string, update: Todo) => void;
    deleteTodo: (key: string) => void;
    deleteTodoPermanently: (key: string) => void;
    synchronizeTodos: () => void;
    synchronized: boolean
    todos: Todos | undefined;
    inputRef: React.RefObject<HTMLInputElement> | null;
    updateRef: React.RefObject<HTMLInputElement> | null;
}

const defaultValue: ContextProps = {
    todos: [],
    addTodo: () => { },
    updateTodo: () => { },
    deleteTodo: () => { },
    deleteTodoPermanently: () => { },
    synchronizeTodos: () => { },
    synchronized: true,
    inputRef: null,
    updateRef: null,
};

const Context = createContext<ContextProps>(defaultValue);

interface ProviderProps { children: React.ReactNode }

const Provider: React.FC<ProviderProps> = ({ children }) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const updateRef = useRef<HTMLInputElement>(null);

    const [todos, setTodos] = useState<Todos>();
    const [unsavedItems, setUnsavedItems] = useState<string[]>();

    useEffect(() => {
        store.getLocalUnsavedItems()
            .then(items => {
                if (items && items.length > 0) {

                    setUnsavedItems(items);

                    store.getLocalData()
                        .then(localData => {
                            if (localData) {
                                setTodos(localData);
                            } else {
                                setTodos([]);
                            }
                        });

                } else {

                    setUnsavedItems([]);

                    api.getTodosFromServer()
                        .then(todos => {
                            if (todos && todos.length > 0) {
                                setTodos(todos);
                                store.setLocalData(todos);
                            } else {
                                setTodos([]);
                            }
                        });

                }
            })
    }, []);

    useEffect(() => {
        if (todos) {
            store.setLocalData(todos);
        }
    }, [todos]);

    useEffect(() => {
        if (unsavedItems) {
            store.setLocalUnsavedItems(unsavedItems);
        }
    }, [unsavedItems]);

    const addTodo = useCallback((name: string) => {
        const key = String(Math.floor(Math.random() * 999999999999));
        const created = Date.now();
        const updated = null;
        const newTodo: Todo = {
            key,
            created,
            updated,
            name,
            finished: false,
            deleted: false,
        };

        if (todos) {
            const updatedTodos: Todos = [newTodo, ...todos];
            setTodos(updatedTodos);
        } else {
            setTodos([newTodo]);
        }

        if (unsavedItems) {
            const unsavedItemsSet = new Set([...unsavedItems, key]);
            const updatedItemsList: string[] = [];
            unsavedItemsSet.forEach(val => {
                updatedItemsList.push(val);
            });

            setUnsavedItems(updatedItemsList);
        }

    }, [todos, unsavedItems]);

    const updateTodo = useCallback((key: string, update: Todo) => {
        if (todos) {
            setTodos(todos.map(todo => {
                if (todo.key === key) {
                    return { ...update, updated: Date.now() };
                }
                return todo;
            }));

            if (unsavedItems) {
                const unsavedItemsSet = new Set([...unsavedItems, key]);
                const updatedItemsList: string[] = [];
                unsavedItemsSet.forEach(val => {
                    updatedItemsList.push(val);
                });

                setUnsavedItems(updatedItemsList);
            }
        }
    }, [todos, unsavedItems]);

    const deleteTodo = useCallback((key: string) => {
        if (todos) {
            setTodos(todos.map(todo => {
                if (todo.key === key) {
                    return { ...todo, deleted: true };
                }
                return todo;
            }));
        }
    }, [todos]);

    const deleteTodoPermanently = useCallback((key: string) => {
        if (unsavedItems) {
            api.deleteData(key)
                .then(r => {
                    console.log(r.deletedKey);
                })
                .catch(err => console.log("ERRO: ", err))
                .finally(() => {
                    if (todos) {
                        setTodos(todos.filter(todo => {
                            return todo.key !== key;
                        }));
                    }
                });
        }

        if (todos) {
            setTodos(todos.filter(todo => {
                return todo.key !== key;
            }));
        }

        if (unsavedItems) {
            setUnsavedItems(unsavedItems.filter(item => item !== key));
        }
    }, [todos, unsavedItems]);

    const synchronizeTodos = useCallback(async () => {
        const synchronize = async () => {
            const itemsToSync: Todos = [];
            if (unsavedItems) {
                unsavedItems.forEach(key => {
                    if (todos) {
                        const todo: Todo = todos.filter(todo => (todo.key === key))[0];
                        itemsToSync.push(todo);
                    }
                });

                api.postData(itemsToSync)
                    .then(syncedTodos => {
                        const syncedKeys = syncedTodos.map(item => item.key);
                        setUnsavedItems(unsavedItems.filter(key => {
                            return !syncedKeys.includes(key);
                        }));

                    });
            }
        };

        synchronize();
    }, [unsavedItems, todos]);

    const value = {
        addTodo,
        updateTodo,
        deleteTodo,
        deleteTodoPermanently,
        synchronizeTodos,
        synchronized: !unsavedItems || unsavedItems.length === 0,
        todos,
        inputRef,
        updateRef
    };

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
};

export default Provider;

export const useTodo = () => useContext(Context);