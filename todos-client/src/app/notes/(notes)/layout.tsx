export default function Layout(props: {
    header: React.ReactNode,
    main: React.ReactNode,
    footer: React.ReactNode,
}) {
    return (
        <div className="container">
            {props.header}
            {props.main}
            {props.footer}
        </div>
    );
}
