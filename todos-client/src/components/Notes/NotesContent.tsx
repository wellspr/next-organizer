const NotesContent = (props: {
    list: React.ReactNode,
}) => {

    return (
        <div className="notes__content">
            <p>Notes Content</p>

            { props.list }
        </div>
    );
};

export default NotesContent;