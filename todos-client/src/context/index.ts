import TodosProvider, { useTodos } from "./TodosProvider";
import ActiveSectionProvider, { useActiveSection } from "./ActiveSectionProvider";
import type { Todo, Todos } from "@/types";

export { TodosProvider as default, ActiveSectionProvider, useActiveSection, useTodos };
export type {Todo, Todos};