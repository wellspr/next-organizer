export default function (props: {
    children: React.ReactNode,
}) {
    return (
        <div className="edit">
            { props.children }
        </div>
    );
}