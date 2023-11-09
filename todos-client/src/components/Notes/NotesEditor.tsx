"use client";

import dynamic from "next/dynamic";

const EditorComponent = dynamic(() => 
    import("./Editor").then(m => m.EditorComponent),
    { ssr: false },
);

const EditorProvider = dynamic(() => 
    import("./Editor").then(m => m.EditorProvider),
    { ssr: false },
);

const NotesEditor = (props: {readOnly: boolean, params?: { key: string }}) => {

    return (
        <EditorProvider readOnly={props.readOnly}>
            <EditorComponent params={props.params} />
        </EditorProvider>
    );
};

export default NotesEditor;