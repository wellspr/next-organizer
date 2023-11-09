"use client";

import { Notes } from "@/components";

const EditPage = () => {
    return (
        <Notes.Editor readOnly={false} />
    );
};

export default EditPage;