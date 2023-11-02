const Section = (props: {
    id: string | undefined,
    className: string | undefined,
    children: React.ReactNode,
}) => {

    return (
        <section
            id={props.id}
            className={props.className}
        >
            {props.children}
        </section>
    );
};

export default Section;