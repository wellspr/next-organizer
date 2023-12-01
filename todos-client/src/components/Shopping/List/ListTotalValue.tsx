"use client";

import { useShopping } from "@/context";
import { Item, List } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ListTotalValue = () => {

    const params = useParams();
    const { lists } = useShopping();
    const [total, setTotal] = useState<number>();

    useEffect(() => {
        if (lists) {
            const list: List = lists.filter(list => list.key === params.key)[0];
            const items: Item[] = list.items;
            setTotal(items.reduce((total, item) => {
                return total + (parseFloat(item.price) * parseInt(item.quantity));
            }, 0));
        }
    }, [lists, params.key]);

    return (
        <div className="shopping__list__total">
            Total:
            <div className="shopping__list__total__value">
                {total?.toFixed(2)}
            </div>
        </div>
    );
};

export default ListTotalValue;