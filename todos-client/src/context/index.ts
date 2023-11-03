import TodosProvider, { useTodos } from "./TodosProvider";
import ActiveSectionProvider, { useActiveSection } from "./ActiveSectionProvider";
import NotesProvider, { useNotes } from "./NotesProvider";
import type { Todo, Todos } from "@/types";

const Provider = {
    Todos: TodosProvider,
    Notes: NotesProvider,
    ActiveSection: ActiveSectionProvider
}

export { Provider, useActiveSection, useTodos, useNotes };
export type {Todo, Todos};