"use client";

import { useNotes } from "@/context";
import Button from "../Common/Button";

const SyncNotesButton = (props: { className: string }) => {

    const { synchronizeNotes, synchronized, syncing } = useNotes();

    return (
        <Button
            className={
                synchronized ?
                    `button ${props.className} ${props.className}__sync ${props.className}__sync--synced` :
                    `button ${props.className} ${props.className}__sync`
            }
            type="button"
            disabled={synchronized || syncing}
            onClick={synchronizeNotes}
            label={ synchronized ? "Synced!" : "Sync" }
        >
            { syncing && "Syncing..." }
        </Button>
    );
};

export default SyncNotesButton;