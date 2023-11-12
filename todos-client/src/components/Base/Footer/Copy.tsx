const Copy = (props: {
    baseClassName: string
}) => {
    return (
        <div
            className={
                props.baseClassName ?
                `${props.baseClassName}__copy` :
                "copy"
            }
        >
            <p>&copy; 2023 - Next Organizer - Todos - Notes - Shopping</p>
        </div>
    );
};

export default Copy;