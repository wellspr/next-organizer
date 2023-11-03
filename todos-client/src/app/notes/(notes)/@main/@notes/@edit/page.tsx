import { Notes } from "@/components";

const Edit = () => {

    return (
        <Notes.EditorProvider>
            <Notes.Editor />
        </Notes.EditorProvider>
    );
};

export default Edit;