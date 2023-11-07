import { EditorComponent, EditorProvider } from "./Editor";

const NotesEditor = (props: {readOnly: boolean, params?: { key: string }}) => {

    return (
        <EditorProvider readOnly={props.readOnly}>
            <EditorComponent params={props.params} />
        </EditorProvider>
    );
};

export default NotesEditor;