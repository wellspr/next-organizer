"use client";

import { Button } from "@/components/Common";
import { Shopping } from "@/components";
import { useShopping } from "@/context";
import Icon from "@/icons";
import type { Item, List } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {

    const params = useParams();
    const router = useRouter();
    const { lists } = useShopping();
    const [listItems, setListItems] = useState<Item[]>([]);
    const [listName, setListName] = useState<string>();

    useEffect(() => {
        const key = String(params.key);

        if (lists) {
            const list: List = lists.filter(list => list.key === key)[0];
            if (list) {
                setListItems(list.items);
                setListName(list.name);
            }
        }
    }, [lists, params]);

    return (
        <>
            <div className="shopping__list__header">
                <Button
                    className="shopping__list__header__button"
                    onClick={() => router.back()}
                >
                    <Icon icon="caret-left" className="shopping__list__header__button__icon" />
                </Button>
                <div className="shopping__list__header__list-name">{listName}</div>
                <Shopping.List.SyncButton className="shopping__list__header__button" />
            </div>

            <div className="shopping__form">
                <Shopping.Items.Input listKey={String(params.key)} />

            </div>
            <div className="shopping__list">
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
                            </li>
                        })
                    }
                    <Shopping.List.TotalValue listKey={String(params.key)} />
                </ul>
            </div>
        </>
    );
};

export default Page;