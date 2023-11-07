import { Notes } from "@/components";

const Editor = ({ params }: { params: { key: string } }) => {

    return (
        <Notes.Editor readOnly={false} params={params} />
    );
};

export default Editor;