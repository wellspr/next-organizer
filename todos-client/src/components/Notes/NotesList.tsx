"use client";

import { useNotes } from "@/context";
import { useRouter } from "next/navigation";
import { Button, Loading } from "../Common";
import { useEffect, useState } from "react";
import { Notes } from "@/types";

const NotesList = () => {

    const { notes, deleteNote } = useNotes();
    const [current, setCurrent] = useState<Notes>();
    const router = useRouter();

    useEffect(() => {
        if (notes) {
            setCurrent(notes.filter(note => (note.deleted === false)));
        }
    }, [notes]);

    if (!current) {
        return <div className="notes__list">
            <div className="notes__list__empty">
                <Loading />
            </div>
        </div>
    }

    if (current && current.length === 0) {
        return (
            <div className="notes__list">
                <div className="notes__list__no-items">
                    <p>{"There aren't notes yet!"}</p>
                </div>
            </div>
        );
    }

    return (
        <ul className="notes__list">
            {
                current.map(note => {
                    return (
                        <li
                            key={note.key}
                            className="notes__list__item"
                        >
                            <div
                                className="notes__list__item__title"
                                onClick={() => {
                                    router.push(`/notes/edit/${note.key}`);
                                }}
                            >
                                {note.title}
                            </div>
                            <Button
                                className="button"
                                label="Delete"
                                type="button"
                                onClick={() => { deleteNote(note.key) }}
                            />
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default NotesList;