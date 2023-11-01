import Button from "./Button";
import Loading from "./Loading";
import Section from "./Section";
import SyncTodosButton from "./SyncTodosButton";
import TodosCompleted from "./TodosCompleted";
import TodosContent from "./TodosContent";
import TodosDeleted from "./TodosDeleted";
import TodosInput from "./TodosInput";
import TodosCurrent from "./TodosCurrent";
import TodosMenu from "./TodosMenu";

const Todos = {
    Completed: TodosCompleted,
    Content: TodosContent,
    Deleted: TodosDeleted,
    Input: TodosInput,
    Current: TodosCurrent,
    Menu: TodosMenu,
};

export {
    Button,
    Loading,
    Section,
    Todos,
    SyncTodosButton as SyncButton,
};