import { ActiveSectionProvider } from "@/context";

export default function TodosLayout(props: {
    menu: React.ReactNode,
    content: React.ReactNode,
}) {
    return (
        <div className="todos">
            <ActiveSectionProvider>
                {props.menu}
                {props.content}
            </ActiveSectionProvider>
        </div>
    );
}