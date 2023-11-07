"use client";

import { useNotes } from "@/context";
import { Button, Loading } from "../Common";
import { useEffect, useState } from "react";
import { Notes } from "@/types";

const NotesDeleted = () => {

    const { notes, restoreNote } = useNotes();
    const [deleted, setDeleted] = useState<Notes>();

    useEffect(() => {
        if (notes) {
            setDeleted(notes.filter(note => (note.deleted === true)));
        }
    }, [notes]);

    if (!deleted) {
        return <div className="notes__list">
            <div className="notes__list__empty">
                <Loading />
            </div>
        </div>
    }

    if (deleted && deleted.length === 0) {
        return (
            <div className="notes__list">
                <div className="notes__list__no-items">
                    The trash can is empty!
                </div>
            </div>
        );
    }

    return (
        <ul className="notes__list">
            {
                deleted.map(note => {
                    return (
                        <li
                            key={note.key}
                            className="notes__list__item"
                        >
                            <div className="notes__list__item__title">
                                {note.title}

                            </div>
                            <Button
                                className="button"
                                label="Restore"
                                type="button"
                                onClick={() => { restoreNote(note.key) }}
                            />
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default NotesDeleted;