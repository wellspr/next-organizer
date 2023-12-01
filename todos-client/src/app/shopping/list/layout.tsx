export default function Layout (props: { children: React.ReactNode }) {
    return (
        <div className="shopping">
            { props.children }
        </div>
    );
};