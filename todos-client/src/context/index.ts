import ActiveSectionProvider, { useActiveSection } from "./ActiveSectionProvider";
import NotesProvider, { useNotes } from "./NotesProvider";
import TodosProvider, { useTodos } from "./TodosProvider";
import ShoppingProvider, { useShopping } from "./ShoppingProvider";

import type { Todo, Todos } from "@/types";

const Provider = {
    ActiveSection: ActiveSectionProvider,
    Notes: NotesProvider,
    Todos: TodosProvider,
    Shopping: ShoppingProvider,
}

export { 
    Provider, 
    useActiveSection, 
    useNotes, 
    useTodos, 
    useShopping,
};

export type {Todo, Todos};