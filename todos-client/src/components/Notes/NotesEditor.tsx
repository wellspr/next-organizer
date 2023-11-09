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

const NotesEditor = (props: {readOnly: boolean}) => {

    return (
        <EditorProvider readOnly={props.readOnly}>
            <EditorComponent />
        </EditorProvider>
    );
};

export default NotesEditor;