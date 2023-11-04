"use client"
import { Editor, useEditor } from "@wellspr/react-quill-editor";
import EditorToolbar from "./EditorToolbar";
import { useNotes } from "@/context";
import { Button } from "@/components/Common";

const EditorComponent = () => {

    const { content } = useEditor();
    const { addNote } = useNotes();

    return (
        <div className="editor">
            <Button
                className="button"
                label="Save"
                onClick={() => {
                    addNote("Title", content);
                }}
            />
            <Editor height={"calc(100vh - 10rem)"}>
                <EditorToolbar />
            </Editor>
        </div>
    );
};

export default EditorComponent;