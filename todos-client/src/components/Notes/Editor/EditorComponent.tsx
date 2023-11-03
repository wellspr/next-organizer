"use client"
import { Editor, useEditor } from "@wellspr/react-quill-editor";
import { useEffect } from "react";
import Toolbar from "./Toolbar";
import { useNotes } from "@/context";

const EditorComponent = () => {

    const { content } = useEditor();
    const { notes, setNotes } = useNotes();
   
    useEffect(() => {
        setNotes([content]);
    }, [content]);

    return (
        <Editor height={"calc(100vh - 10rem)"}>
            <Toolbar />
        </Editor>
    );
};

export default EditorComponent;