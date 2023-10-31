export default function MainLayout(props: {
    children: React.ReactNode,
    todos: React.ReactNode,

}) {
    return (
        <main className="main-container">
            {props.todos}
        </main>
    );
}