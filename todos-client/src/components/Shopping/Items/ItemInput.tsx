"use client";

import { useCallback, useState } from "react";
import { NameInput, PriceInput, QuantityInput } from ".";
import { useShopping } from "@/context";
import { Button } from "@/components/Common";
import { useItems } from "./ItemsProvider";

const ItemInput = (props: { listKey: string }) => {

    const [itemName, setItemName] = useState<string>("");
    const [itemQuantity, setItemQuantity] = useState<string>("0");
    const [itemPrice, setItemPrice] = useState<string>("0");

    const { addItem } = useShopping();
    const { ref } = useItems();

    const onSubmit = useCallback(() => {
        if (itemName && itemQuantity && itemPrice) {
            addItem(props.listKey, {
                name: itemName,
                quantity: itemQuantity,
                price: itemPrice
            });
            setItemName("");
            setItemQuantity("0");
            setItemPrice("0");
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    }, [
        itemName,
        itemQuantity,
        itemPrice,
        addItem,
        props.listKey,
        ref,
    ]);

    return (
        <form
            className="form shopping__form"
            onSubmit={e => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <div className="shopping__form__group shopping__form__group__item__name">
                <NameInput
                    itemName={itemName}
                    setItemName={setItemName}
                    baseClassName="shopping__form__group"
                />
            </div>

            <div className="shopping__form__group shopping__form__group__item__quantity">
                <QuantityInput
                    itemQuantity={itemQuantity}
                    setItemQuantity={setItemQuantity}
                    baseClassName="shopping__form__group"
                />
            </div>

            <div className="shopping__form__group shopping__form__group__item__price">
                <PriceInput
                    itemPrice={itemPrice}
                    setItemPrice={setItemPrice}
                    baseClassName="shopping__form__group"
                />
            </div>
            <Button className="shopping__form__group__button" label="Add" type="submit" />
        </form >
    );
};

export default ItemInput;