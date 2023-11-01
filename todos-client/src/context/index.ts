import TodosProvider, { useTodos } from "./TodosProvider";
import ActiveSectionProvider, { useActiveSection } from "./ActiveSectionProvider";
import type { Todo, Todos } from "@/types";

const Provider = {
    Todos: TodosProvider,
    ActiveSection: ActiveSectionProvider
}

export { Provider, useActiveSection, useTodos };
export type {Todo, Todos};