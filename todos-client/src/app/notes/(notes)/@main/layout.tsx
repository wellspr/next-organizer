export default function MainLayout (props: {
    notes: React.ReactNode,
}) {
    return (
        <main className="main-container">
            {props.notes}
        </main>
    );
}