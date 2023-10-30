"use client";

import { useTodos } from "@/context";
import { Button } from ".";

const SyncTodosButton = () => {

    const { synchronizeTodos, synchronized } = useTodos();

    return (
        <Button
            className={
                synchronized ?
                    "button button__sync button__sync--synced" :
                    "button button__sync"
            }
            label={synchronized ? "Synced!" : "Sync"}
            type="button"
            disabled={synchronized}
            onClick={synchronizeTodos}
        />
    );
};

export default SyncTodosButton;