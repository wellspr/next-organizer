"use client";

import { Button, Loading } from "@/components/Common";
import { useShopping } from "@/context";
import { Item, List } from "@/types";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NameInput, PriceInput, QuantityInput } from "../Items";

const ListComponent = () => {

    const params = useParams();

    const { lists, removeItem, updateItem } = useShopping();
    const [listItems, setListItems] = useState<Item[]>();

    const [showUpdateInput, setShowUpdateInput] = useState<{ key: string, show: boolean }[]>([]);

    const [updatedName, setUpdatedName] = useState<string>("");
    const [updatedQuantity, setUpdatedQuantity] = useState<string>("0");
    const [updatedPrice, setUpdatedPrice] = useState<string>("0");

    const itemRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const key = String(params.key);

        if (lists) {
            const list: List = lists.filter(list => list.key === key)[0];
            if (list) {
                setListItems(list.items.filter(item => item.deleted === false));
            }
        }
    }, [lists, params.key]);

    const resetVisibility = useCallback(() => {
        if (listItems) {
            setShowUpdateInput(listItems.map(item => {
                return { key: item.key, show: false };
            }));
        }
    }, [listItems]);

    useEffect(() => {
        resetVisibility();
    }, [resetVisibility]);

    const onItemClick = useCallback((item: Item) => {
        const key = item.key;

        setUpdatedName(item.name);
        setUpdatedQuantity(item.quantity);
        setUpdatedPrice(item.price);

        setShowUpdateInput(showUpdateInput.map(item => {
            if (item.key === key) {
                return { ...item, show: true };
            }
            return { ...item, show: false };
        }));
    }, [showUpdateInput]);

    const onClick = useCallback((e: MouseEvent) => {
        if (itemRef.current) {

            if (itemRef.current.contains(e.target as Node)) {
                return;
            }
            resetVisibility();
        }
    }, [resetVisibility]);

    useEffect(() => {
        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("click", onClick);
        }
    }, [onClick]);

    useEffect(() => {
        console.log("Items: ", updatedName, updatedQuantity, updatedPrice);
    }, [updatedName, updatedQuantity, updatedPrice]);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("SUbmit");
    }, []);

    const onInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Escape") {
            event.preventDefault();
            resetVisibility();
        }
    }, [resetVisibility]);

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
        <ul className="shopping__list__items" ref={itemRef}>
            {
                listItems.map(item => {
                    const key = item.key;
                    const show = showUpdateInput.length > 0 ?
                        showUpdateInput.filter(item => item.key === key)[0].show :
                        false;

                    return (
                        <li
                            key={key}
                            className="shopping__list__items__item"
                            onClick={() => onItemClick(item)}
                        >
                            <div className={
                                show ?
                                    "shopping__list__items__item__values--hidden" :
                                    "shopping__list__items__item__values"
                            }>
                                <div className="shopping__list__items__item__values__name">
                                    {item.name}
                                </div>
                                <div className="shopping__list__items__item__values__quantity">
                                    {item.quantity}
                                </div>
                                <div className="shopping__list__items__item__values__price">
                                    {item.price}
                                </div>
                            </div>

                            <form
                                onSubmit={onSubmit}
                                onClick={e => e.stopPropagation()}
                                className={
                                    show ?
                                        `shopping__list__items__item__inputForm--show` :
                                        `shopping__list__items__item__inputForm`
                                }
                            >
                                <div className="shopping__list__items__item__form__item-name">
                                    <NameInput
                                        itemName={updatedName}
                                        setItemName={setUpdatedName}
                                        baseClassName="shopping__list__items__item__form"
                                    />
                                </div>
                                <div className="shopping__list__items__item__form__item-quantity">
                                    <QuantityInput
                                        itemQuantity={updatedQuantity}
                                        setItemQuantity={setUpdatedQuantity}
                                        baseClassName="shopping__list__items__item__form"
                                    />
                                </div>
                                <div className="shopping__list__items__item__form__item-price">
                                    <PriceInput
                                        itemPrice={updatedPrice}
                                        setItemPrice={setUpdatedPrice}
                                        baseClassName="shopping__list__items__item__form"
                                    />
                                </div>
                            </form>
                            <div className="shopping__list__items__item__buttons">
                                <Button
                                    className={
                                        show ?
                                            "button button__save--show" :
                                            "button button__save"
                                    }
                                    type="submit"
                                    label="Save"
                                    onClick={() => updateItem(String(params.key), String(item.key), {
                                        name: updatedName,
                                        price: updatedPrice,
                                        quantity: updatedQuantity,
                                    })} 
                                    />
                                        <Button
                                            className={
                                                show ?
                                                    "button button__delete--hidden" :
                                                    "button button__delete"
                                            }
                                            type="button"
                                            label="Delete"
                                            onClick={() => removeItem(String(params.key), item.key)}
                                        />
                            </div>
                        </li>
                    );
                })
            }
        </ul >
    );
};

export default ListComponent;