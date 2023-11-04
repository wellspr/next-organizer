import { Notes } from "@/components";

export default function ContentLayout(props: {
    list: React.ReactNode
}) {
    return <Notes.Content { ...props } />;
};