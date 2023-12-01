"use client";

import { useItems } from "./ItemsProvider";

const ItemNameInput = (props: {
    itemName: string,
    setItemName: React.Dispatch<React.SetStateAction<string>>,
    baseClassName: string,
}) => {

    const { itemName, setItemName } = props;

    const { ref } = useItems();

    return (
        <>
            <label htmlFor="shopping-item-name" className=""></label>
            <input
                ref={ref}
                id="shopping-item-name"
                type="text"
                className={
                    props.baseClassName &&
                    `${props.baseClassName}__input ${props.baseClassName}__input--item-name`
                }
                placeholder="Item name"
                value={itemName}
                onChange={e => setItemName(e.target.value)}
                autoFocus={true}
            />
        </>
    );
};

export default ItemNameInput;