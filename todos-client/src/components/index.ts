import Button from "./Common/Button";
import Loading from "./Common/Loading";
import Section from "./Common/Section";
import SyncTodosButton from "./Todos/SyncTodosButton";
import TodosCompleted from "./Todos/TodosCompleted";
import TodosContent from "./Todos/TodosContent";
import TodosDeleted from "./Todos/TodosDeleted";
import TodosInput from "./Todos/TodosInput";
import TodosCurrent from "./Todos/TodosCurrent";
import TodosMenu from "./Todos/TodosMenu";

const Common = {
    Button, 
    Loading,
    Section,
};

const Todos = {
    SyncButton: SyncTodosButton,
    Completed: TodosCompleted,
    Content: TodosContent,
    Deleted: TodosDeleted,
    Input: TodosInput,
    Current: TodosCurrent,
    Menu: TodosMenu,
};

export {
    Common,
    Todos,
};