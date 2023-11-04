export default function NotesLayout(props: {
    content: React.ReactNode
}) {

    return (
        <div className="notes">
            {props.content}
        </div>
    );
};