"use client";

import { useActiveSection } from "@/context";
import { Section } from ".";

const TodosContent = (props: {
    current: React.ReactNode,
    completed: React.ReactNode,
    deleted: React.ReactNode,
}) => {

    const { active } = useActiveSection();

    return (
        <div className="todos__content">
            <Section
                id="current"
                className={
                    active === "current" ?
                        "todos__content__current todos__content__current--active" :
                        "todos__content__current"
                }
            >
                {props.current}
            </Section>

            <Section
                id="completed"
                className={
                    active === "completed" ?
                        "todos__content__completed todos__content__completed--active" :
                        "todos__content__completed"
                }
            >
                {props.completed}
            </Section>

            <Section
                id="deleted"
                className={
                    active === "deleted" ?
                        "todos__content__deleted todos__content__deleted--active" :
                        "todos__content__deleted"
                }
            >
                {props.deleted}
            </Section>
        </div>
    );
};

export default TodosContent;