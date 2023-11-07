export default function Layout (props: {
    children: React.ReactNode,
}) {
    return (
        <div className="deleted">
            { props.children }
        </div>
    );
}