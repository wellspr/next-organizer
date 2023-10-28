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

const getLocalData: () => Promise<(Todos | null)> = async () => {
    const data: (Todos | null) = await store.getItem("todos");
    return data;
};

const setLocalData = async (todos: Todos) => {
    store.setItem("todos", todos, (err, value) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Todos: ", value);
        }
    });
};

const getLocalUnsavedItems = async () => {
    const unsavedItems: (string[] | null) = await store.getItem("unsaved_items");
    return unsavedItems;
};

const setLocalUnsavedItems = async (unsavedItems: string[]) => {
    store.setItem("unsaved_items", unsavedItems, (err, value) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Unsaved Items: ", value);
        }
    });
};


import axios, { AxiosResponse } from "axios";
import { FetchResponse, PutManyResponse } from "../db";
const api = axios.create({
    baseURL: "/api",
});

const deleteData = async (key: string) => {
    const response = await api.delete("/delete", { data: { key } });
    return { key: response.data.key };
};

const postData = async (todos: Todo[]) => {
    const response = await api.post("/save", { data: { todos } });
    const data: PutManyResponse = response.data;
    return data;
};

const getTodosFromServer = async () => {
    const response: AxiosResponse = await api.get("/fetch");
    const data: FetchResponse = response.data;
    return data.items as Todos;
};

export type Todo = {
    key: string,
    created: number,
    updated: number | null,
    name: string,
    finished: boolean,
    deleted: boolean,
}

export type Todos = Todo[];

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
        getLocalUnsavedItems()
            .then(items => {
                if (items && items.length > 0) {

                    setUnsavedItems(items);

                    getLocalData()
                        .then(localData => {
                            if (localData) {
                                setTodos(localData);
                            } else {
                                setTodos([]);
                            }
                        });

                } else {

                    setUnsavedItems([]);

                    getTodosFromServer()
                        .then(todos => {
                            if (todos && todos.length > 0) {
                                setTodos(todos);
                                setLocalData(todos);
                            } else {
                                setTodos([]);
                            }
                        });

                }
            })
    }, []);

    useEffect(() => {
        if (todos) {
            setLocalData(todos);
        }
    }, [todos]);

    useEffect(() => {
        if (unsavedItems) {
            setLocalUnsavedItems(unsavedItems);
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
            deleteData(key)
                .then(r => {
                    console.log(r.key);
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

                postData(itemsToSync)
                    .then(r => {
                        const processedItems = r.processed.items;
                        const processedKeys = (processedItems as Todos).map(item => item.key);
                        setUnsavedItems(unsavedItems.filter(key => {
                            return !processedKeys.includes(key);
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