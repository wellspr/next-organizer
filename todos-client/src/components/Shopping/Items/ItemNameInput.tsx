const ItemNameInput = (props: {
    itemName: string,
    setItemName: React.Dispatch<React.SetStateAction<string>>,
    baseClassName: string,
}) => {

    const { itemName, setItemName } = props;

    return (
        <>
            <label htmlFor="shopping-item-name" className=""></label>
            <input
                id="shopping-item-name"
                type="text"
                className={
                    props.baseClassName &&
                    `${props.baseClassName}__input ${props.baseClassName}__input--item-name`
                }
                placeholder="Item name"
                value={itemName}
                onChange={e => setItemName(e.target.value)}
            />
        </>
    );
};

export default ItemNameInput;