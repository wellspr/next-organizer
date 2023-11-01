import { Todos } from "@/components";

const ContentLayout = (props: {
    current: React.ReactNode,
    completed: React.ReactNode,
    deleted: React.ReactNode,
}) => <Todos.Content { ...props } />

export default ContentLayout;