import { Provider } from "@/context";

export default function Layout(props: {
    header: React.ReactNode,
    main: React.ReactNode,
    footer: React.ReactNode,
}) {
    return (
        <Provider.Notes>
            {props.header}
            {props.main}
            {props.footer}
        </Provider.Notes>
    );
}
