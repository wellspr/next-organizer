export default function EditLayout (props: {
    children: React.ReactNode,
}) {
    return (
        <div className="editor">
            { props.children }
        </div>
    );
}