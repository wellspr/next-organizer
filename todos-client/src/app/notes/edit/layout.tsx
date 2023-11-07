export default function Layout (props: {
    children: React.ReactNode,
}) {
    return (
        <div className="edit">
            { props.children }
        </div>
    );
}