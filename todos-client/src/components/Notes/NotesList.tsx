"use client";

import { useNotes } from "@/context";

const NotesList = () => {

    const { notes } = useNotes();

    return (
        <ul className="notes__list">
            {
                notes && notes.map(note => {
                    return (
                        <li key={note.key} className="notes__list__item">
                            { note.title }
                        </li>
                    )
                })
            }
        </ul>
    );
};

export default NotesList;