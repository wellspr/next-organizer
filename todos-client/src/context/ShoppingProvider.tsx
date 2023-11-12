"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Item = {
    key: string,
    name: string,
    quantity: string,
    price: string,
    created: number,
    updated: number | null,
    deleted: boolean,
};

type List = {
    key: string,
    name: string,
    created: number,
    updated: number | null,
    deleted: boolean,
    items: Item[],
};

type Lists = List[];

interface ContextProps {
    lists: Lists,
    list: List | undefined,
    createList: (name: string) => void,
    selectList: (key: string) => void
    addItem: (listKey: string, name: string, price: string, quantity: string) => void
}

const defaultValue: ContextProps = {
    lists: [],
    list: undefined,
    createList: () => { },
    selectList: () => { },
    addItem: () => { },
};

const Context = createContext<ContextProps>(defaultValue);

const ShoppingProvider = (props: { children: React.ReactNode }) => {

    const [lists, setLists] = useState<Lists>([]);
    const [list, setList] = useState<List | undefined>(undefined);

    useEffect(() => {
        console.log("All lists: ", lists);
    }, [lists]);

    useEffect(() => {
        console.log("Current list: ", list);
    }, [list]);

    const createList = useCallback((name: string) => {
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
        }

        if (lists) {
            setLists([newList, ...lists]);
        } else {
            setLists([newList]);
        }

    }, [lists]); /* append new list to 'lists' */

    const selectList = useCallback((key: string) => {
        if (lists) {
            setList(lists.filter(list => list.key === key)[0]);
        }
    }, [lists]); /* select list from 'lists' using setList */

    const updateList = useCallback((key: string, updatedList: List) => {
        if (lists) {
            setLists(lists.map(list => {
                if (list.key === key) {
                    return updatedList;
                }
                return list;
            }));
        }
    }, [lists]); /* update specific list inside 'lists' */

    const deleteList = useCallback((key: string) => {
        if (lists) {
            setLists(lists.filter(list => list.key !== key));
        }
    }, [lists]); /* removelist from 'lists' */

    const addItem = useCallback((listKey: string, name: string, price: string, quantity: string) => {
        const key = String(Math.floor(Math.random() * 999999999999));
        const created = Date.now();
        const updated = null;
        const deleted = false;

        const newItem: Item = {
            key,
            created,
            deleted,
            updated,
            name,
            price,
            quantity
        };

        const updatedLists = lists.map(list => {
            if (list.key === listKey) {
                const updatedList = { 
                    ...list, 
                    ...{ items: [ newItem, ...list.items ] }
                };
                setList(updatedList);
                return updatedList;
            }
            return list;
        });

        setLists(updatedLists);
    }, [list, lists]);

    const value: ContextProps = {
        lists,
        list,
        createList,
        selectList,
        addItem,
    };

    return <Context.Provider value={value}>
        {props.children}
    </Context.Provider>
};

export default ShoppingProvider;

export const useShopping = () => useContext(Context);