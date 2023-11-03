import { Provider } from "@/context";

export default function NotesLayout (props: {
    edit: React.ReactNode
}) {

    return (
        <Provider.Notes>
            {props.edit}
        </Provider.Notes>
    );
};