import { Provider } from "@/context";

export default function TodosLayout(props: {
    menu: React.ReactNode,
    content: React.ReactNode,
}) {
    return (
        <div className="todos">
            <Provider.ActiveSection>
                {props.menu}
                {props.content}
            </Provider.ActiveSection>
        </div>
    );
}