"use client";

import { Button, Loading } from "@/components/Common";
import { useShopping } from "@/context";
import { Item, List } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ListComponent = () => {

    const params = useParams();
    const { lists, removeItem } = useShopping();
    const [listItems, setListItems] = useState<Item[]>();

    useEffect(() => {
        const key = String(params.key);

        if (lists) {
            const list: List = lists.filter(list => list.key === key)[0];
            if (list) {
                setListItems(list.items.filter(item => item.deleted === false));
            }
        }
    }, [lists, params]);

    if (!listItems) {
        return <div className="shopping__list">
            <div className="shopping__list__empty">
                <Loading />
            </div>
        </div>
    }

    if (listItems && listItems.length === 0) {
        return (
            <div className="shopping__list">
                <div className="shopping__list__no-items">
                    <p>{"There aren't items yet!"}</p>
                </div>
            </div>
        );
    }

    return (
        <ul className="shopping__list__items">
            {
                listItems.map(item => {
                    return <li key={item.key} className="shopping__list__items__item">
                        <div className="shopping__list__items__item__name">
                            {item.name}
                        </div>
                        <div className="shopping__list__items__item__quantity">
                            {item.quantity}
                        </div>
                        <div className="shopping__list__items__item__price">
                            {item.price}
                        </div>
                        <div className="shopping__list__items__item__buttons">
                            <Button
                                className="button button__delete"
                                type="button"
                                label="Delete"
                                onClick={() => removeItem(String(params.key), item.key)}
                            />
                        </div>
                    </li>
                })
            }
        </ul>
    );
};

export default ListComponent;