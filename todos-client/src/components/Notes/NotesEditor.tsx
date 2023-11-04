import { EditorComponent, EditorProvider } from "./Editor";

const NotesEditor = (props: {readOnly: boolean}) => {
    return (
        <EditorProvider readOnly={props.readOnly}>
            <EditorComponent />
        </EditorProvider>
    );
};

export default NotesEditor;