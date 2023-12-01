"use client";

import { KeyboardEvent, useCallback, useEffect, useRef } from "react";

const ItemQuantityInput = (props: {
    itemQuantity: string,
    setItemQuantity: React.Dispatch<React.SetStateAction<string>>,
    baseClassName: string,
}) => {

    const quantityInputRef = useRef<HTMLInputElement>(null);

    const { itemQuantity, setItemQuantity } = props;

    const addQuantity = useCallback(() => {
        console.log("Add", itemQuantity);
        setItemQuantity(String(parseInt(itemQuantity) + 1));
    }, [itemQuantity, setItemQuantity]);

    const subtractQuantity = useCallback(() => {
        console.log("Subtract", itemQuantity);
        if (parseInt(itemQuantity) > 0) {
            setItemQuantity(String(parseInt(itemQuantity) - 1));
        }
    }, [itemQuantity, setItemQuantity]);

    const onClick = useCallback((op: string) => {
        switch (op) {
            case "add":
                addQuantity();
                return;
            case "subtract":
                subtractQuantity();
                return;
            default:
                console.log("Unknown function")
                return;
        }
    }, [addQuantity, subtractQuantity]);

    const onQuantityKeyDown = useCallback((e: KeyboardEvent) => {
        switch (e.code) {
            case "ArrowUp":
                e.preventDefault();
                addQuantity();
                return;

            case "ArrowDown":
                e.preventDefault();
                subtractQuantity();
                return;
        }
    }, [addQuantity, subtractQuantity]);

    return (
        <>
            <label htmlFor="shopping-item-quantity" className=""></label>
            <input
                ref={quantityInputRef}
                id="shopping-item-quantity"
                type="text"
                className={
                    props.baseClassName &&
                    `
                    ${props.baseClassName}__input 
                    ${props.baseClassName}__input--item-quantity
                    `
                }
                value={itemQuantity}
                onChange={e => setItemQuantity(e.target.value)}
                onKeyDown={e => onQuantityKeyDown(e)}
            />
            <div className={`${props.baseClassName}__input__quantity-controls`}>
                <button
                    className={
                        props.baseClassName &&
                        `
                        ${props.baseClassName}__input__quantity-controls__button 
                        ${props.baseClassName}__input__quantity-controls__button--add
                        `
                    }
                    type="button"
                    onClick={() => onClick("add")}
                >
                    <span>+</span>
                </button>
                <button
                    className={
                        props.baseClassName &&
                        `
                        ${props.baseClassName}__input__quantity-controls__button 
                        ${props.baseClassName}__input__quantity-controls__button--subtract
                        `
                    }
                    type="button"
                    onClick={() => onClick("subtract")}
                >
                    <span>-</span>
                </button>
            </div>
        </>
    );
};

export default ItemQuantityInput;