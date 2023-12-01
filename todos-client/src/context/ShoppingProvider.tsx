"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";

import { store } from "@/store";
import { api } from "@/db";
import { Item, List, Lists, itemUpdates, listUpdates } from "@/types";

interface ContextProps {
    lists: Lists | undefined,
    list: List | undefined,
    createList: ((name: string) => Promise<string>),
    selectList: (key: string) => void,
    updateList: (key: string, updates: listUpdates) => void,
    deleteList: (key: string) => void,
    deleteListPermanently: (key: string) => void,
    addItem: (
        listKey: string,
        data: { name: string, quantity: string, price: string }
    ) => void,
    updateItem: (listKey: string, itemKey: string, itemUpdates: itemUpdates) => void,
    removeItem: (listKey: string, itemKey: string) => void,
    synchronizeLists: () => void,
    synchronized: boolean;
    syncing: boolean,
}

const defaultValue: ContextProps = {
    lists: [],
    list: undefined,
    createList: async () => { return "" },
    selectList: () => { },
    updateList: () => { },
    deleteList: () => { },
    deleteListPermanently: () => { },
    addItem: () => { },
    updateItem: () => { },
    removeItem: () => { },
    synchronizeLists: () => { },
    synchronized: false,
    syncing: false,
};

const Context = createContext<ContextProps>(defaultValue);

const ShoppingProvider = (props: { children: React.ReactNode }) => {

    const [lists, setLists] = useState<Lists | undefined>(undefined);
    const [list, setList] = useState<List | undefined>(undefined);
    const [unsavedItems, setUnsavedItems] = useState<string[]>();
    const [syncing, setSyncing] = useState<boolean>(false);

    useEffect(() => {
        store.unsavedShoppingList.get()
            .then(items => {
                if (items && items.length > 0) {

                    setUnsavedItems(items);

                    store.shoppingList.get()
                        .then(localData => {
                            if (localData) {
                                setLists(localData);
                            } else {
                                setLists([]);
                            }
                        });

                } else {

                    setUnsavedItems([]);

                    api.shopping.fetchData()
                        .then(lists => {
                            if (lists && lists.length > 0) {
                                setLists(lists);
                                store.shoppingList.set(lists);
                            } else {
                                setLists([]);
                            }
                        });
                }
            })
    }, []);

    useEffect(() => {
        if (lists) {
            store.shoppingList.set(lists)
                .then(lists => console.log("LISTS: ", lists));
        }
    }, [lists]);

    useEffect(() => {
        if (unsavedItems) {
            store.unsavedShoppingList.set(unsavedItems)
                .then(unsavedItems => console.log("UNSAVED: ", unsavedItems));
        }
    }, [unsavedItems]);

    const addKeyToUnsavedItems = useCallback((key: string) => {
        if (unsavedItems) {
            const unsavedItemsSet = new Set([...unsavedItems, key]);
            const updatedItemsList: string[] = [];
            unsavedItemsSet.forEach(val => updatedItemsList.push(val));
            setUnsavedItems(updatedItemsList);
        }
    }, [unsavedItems]);

    const removeKeyFromUnsavedItems = useCallback((key: string) => {
        if (unsavedItems) {
            setUnsavedItems(unsavedItems.filter(item => item !== key));
        }
    }, [unsavedItems]);

    const createList = useCallback(async (name: string) => {
        const key = String(Math.floor(Math.random() * 999999999999));
        const created = Date.now();
        const updated = null;
        const deleted = false;
        const items: Item[] = [];

        const newList: List = {
            key,
            created,
            updated,
            deleted,
            items,
            name,
        };

        if (lists) {
            setLists([newList, ...lists]);
        } else {
            setLists([newList]);
        }

        addKeyToUnsavedItems(key);

        return key;

    }, [lists, addKeyToUnsavedItems]); /* append new list to 'lists' */

    const selectList = useCallback((key: string) => {
        if (lists) {
            setList(lists.filter(list => list.key === key)[0]);
        }
    }, [lists]); /* select list from 'lists' using setList */

    const updateList = useCallback((key: string, updates: listUpdates) => {
        if (lists) {
            setLists(lists.map(list => {
                if (list.key === key) {
                    return {
                        ...list,
                        ...updates,
                        updated: Date.now(),

                    };
                }
                return list;
            }));

            addKeyToUnsavedItems(key);
        }
    }, [lists, addKeyToUnsavedItems]); /* update specific list inside 'lists' */

    const deleteList = useCallback((key: string) => {
        if (lists) {
            setLists(lists.map(list => {
                if (list.key === key) {
                    return { ...list, deleted: true };
                }
                return list;
            }));

            addKeyToUnsavedItems(key);
        }
    }, [lists, addKeyToUnsavedItems]); /* removelist from 'lists' */

    const deleteListPermanently = useCallback((key: string) => {
        api.shopping.deleteData(key)
            .then(r => r.key)
            .then(key => {
                removeKeyFromUnsavedItems(key);
                if (lists) {
                    setLists(lists.filter(list => list.key !== key));
                }
            })
            .catch(err => console.log("Error deleting from server: ", err));
    }, [lists, removeKeyFromUnsavedItems]);

    const addItem = useCallback((listKey: string, data: { name: string, price: string, quantity: string }) => {
        const key = String(Math.floor(Math.random() * 999999999999));
        const created = Date.now();
        const updated = null;
        const deleted = false;

        const newItem: Item = {
            key,
            created,
            deleted,
            updated,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
        };

        if (lists) {
            const updatedLists = lists.map(list => {
                if (list.key === listKey) {
                    const updatedList = {
                        ...list,
                        ...{ items: [newItem, ...list.items] }
                    };
                    setList(updatedList);
                    return updatedList;
                }
                return list;
            });

            setLists(updatedLists);

            addKeyToUnsavedItems(listKey);
        }

    }, [lists, addKeyToUnsavedItems]);

    const updateItem = useCallback((listKey: string, itemKey: string, itemUpdates: itemUpdates) => {
        if (lists) {
            const updatedLists = lists.map(list => {
                if (list.key === listKey) {
                    const listItems = list.items.map(item => {
                        if (item.key === itemKey) {
                            return { ...item, ...itemUpdates };
                        }
                        return item;
                    });
                    return { ...list, items: listItems };
                }

                return list;
            });

            setLists(updatedLists);

            addKeyToUnsavedItems(listKey);
        }
    }, [lists, addKeyToUnsavedItems]);

    const removeItem = useCallback((listKey: string, itemKey: string) => {
        if (lists) {
            setLists(lists.map(list => {
                if (list.key === listKey) {
                    return {
                        ...list,
                        updated: Date.now(),
                        items: list.items.filter(item => {
                            return item.key !== itemKey;
                        }),
                    };
                }

                return list;
            }));

            addKeyToUnsavedItems(listKey);
        }
    }, [lists, addKeyToUnsavedItems]);

    const synchronizeLists = useCallback(async () => {
        const synchronize = async () => {
            const itemsToSync: Lists = [];
            if (unsavedItems) {
                unsavedItems.forEach(key => {
                    if (lists) {
                        const list: List = lists.filter(list => list.key === key)[0];
                        itemsToSync.push(list);
                    }
                });

                api.shopping.postData(itemsToSync)
                    .then(syncedlists => {
                        const syncedKeys = syncedlists.map(item => item.key);
                        setUnsavedItems(unsavedItems.filter(key => !syncedKeys.includes(key)));
                    })
                    .catch(err => console.log("Synchronization error: ", err))
                    .finally(() => setSyncing(false));
            }
        };

        setSyncing(true);
        synchronize();
    }, [unsavedItems, lists]);

    const value: ContextProps = {
        lists,
        list,
        createList,
        selectList,
        updateList,
        deleteList,
        deleteListPermanently,
        addItem,
        updateItem,
        removeItem,
        synchronizeLists,
        synchronized: !unsavedItems || unsavedItems.length === 0,
        syncing,
    };

    return <Context.Provider value={value}>
        {props.children}
    </Context.Provider>
};

export default ShoppingProvider;

export const useShopping = () => useContext(Context);