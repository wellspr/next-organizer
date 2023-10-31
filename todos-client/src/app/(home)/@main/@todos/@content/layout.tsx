import { TodosContent } from "@/components";

const ContentLayout = (props: {
    current: React.ReactNode,
    completed: React.ReactNode,
    deleted: React.ReactNode,
}) => <TodosContent { ...props } />

export default ContentLayout;