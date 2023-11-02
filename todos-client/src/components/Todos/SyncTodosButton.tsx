"use client";

import { useTodos } from "@/context";
import Button from "../Common/Button";

const SyncTodosButton = () => {

    const { synchronizeTodos, synchronized, syncing } = useTodos();

    return (
        <Button
            className={
                synchronized ?
                    "button button__sync button__sync--synced" :
                    "button button__sync"
            }
            type="button"
            disabled={synchronized || syncing}
            onClick={synchronizeTodos}
            label={ synchronized ? "Synced!" : "Sync" }
        >
            { syncing && "Syncing..." }
        </Button>
    );
};

export default SyncTodosButton;