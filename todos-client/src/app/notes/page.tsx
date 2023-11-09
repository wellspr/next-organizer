"use client";

import { Button } from "@/components/Common";
import { List as NotesList } from "@/components/Notes";
import { SyncButton } from "@/components/Notes";
import { useRouter } from "next/navigation";

const Notes = () => {

    const router = useRouter();
    
    return (
        <div className="notes">
            <div className="notes__buttons">
                <Button
                    className="button notes__buttons__button notes__buttons__button__new"
                    label="New"
                    type="button"
                    onClick={() => router.push("/notes/edit")}
                />
                <Button
                    className="button notes__buttons__button notes__buttons__button__trash"
                    label="Trash"
                    type="button"
                    onClick={() => router.push("/notes/deleted")}
                />
                <SyncButton className="notes__buttons__button" />
            </div>
            <NotesList />
        </div>
    );
};

export default Notes;