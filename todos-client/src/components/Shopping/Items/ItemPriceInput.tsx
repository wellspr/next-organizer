const ItemPriceInput = (props: {
    itemPrice: string,
    setItemPrice: React.Dispatch<React.SetStateAction<string>>,
    baseClassName: string,
}) => {

    const { itemPrice, setItemPrice } = props;

    return (
        <>
            <label htmlFor="shopping-item-price" className=""></label>
            <input
                id="shopping-item-price"
                type="text"
                className={
                    props.baseClassName &&
                    `${props.baseClassName}__input ${props.baseClassName}__input--item-price`
                }
                value={itemPrice}
                onChange={e => setItemPrice(e.target.value)}
            />
        </>
    );
};

export default ItemPriceInput;