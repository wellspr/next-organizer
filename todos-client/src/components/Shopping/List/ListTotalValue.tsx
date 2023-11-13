"use client";

import { useShopping } from "@/context";
import { Item, List } from "@/types";
import { useEffect, useState } from "react";

const ListTotalValue = (props: { listKey: string }) => {

    const { lists } = useShopping();
    const [total, setTotal] = useState<number>();

    useEffect(() => {
        if (lists) {
            const list: List = lists.filter(list => list.key === props.listKey)[0];
            const items: Item[] = list.items;
            setTotal(items.reduce((total, item) => {
                return total + (parseFloat(item.price) * parseInt(item.quantity));
            }, 0));
        }
    }, [lists, props.listKey]);

    return (
        <div>{ total }</div>
    );
};

export default ListTotalValue;