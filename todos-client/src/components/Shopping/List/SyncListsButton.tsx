"use client";

import { Button } from "@/components/Common";
import { useShopping } from "@/context";


const SyncListsButton = (props: { className: string }) => {

    const { synchronizeLists, synchronized, syncing } = useShopping();

    return (
        <Button
            className={
                synchronized ?
                    `button ${props.className} ${props.className}__sync ${props.className}__sync--synced` :
                    `button ${props.className} ${props.className}__sync`
            }
            type="button"
            disabled={synchronized || syncing}
            onClick={synchronizeLists}
            label={ synchronized ? "Synced!" : "Sync" }
        >
            { syncing && "Syncing..." }
        </Button>
    );
};

export default SyncListsButton;