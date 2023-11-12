"use client";

import { KeyboardEvent, useCallback, useRef } from "react";

const ItemQuantityInput = (props: {
    itemQuantity: string,
    setItemQuantity: React.Dispatch<React.SetStateAction<string>>,
    baseClassName: string,
}) => {

    const quantityInputRef = useRef<HTMLInputElement>(null);

    const { itemQuantity, setItemQuantity } = props;

    const addQuantity = useCallback(() => {
        setItemQuantity(String(Number(itemQuantity) + 1));
    }, [itemQuantity]);

    const subtractQuantity = useCallback(() => {
        if (Number(itemQuantity) > 0) {
            setItemQuantity(String(Number(itemQuantity) - 1));
        }
    }, [itemQuantity]);

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
                    onClick={addQuantity}
                >
                    +
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
                    onClick={subtractQuantity}
                >
                    -
                </button>
            </div>
        </>
    );
};

export default ItemQuantityInput;