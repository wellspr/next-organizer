"use client";

import { useCallback, useEffect, useState } from "react";
import type { DeltaType } from "@wellspr/react-quill-editor";
import { Editor, useEditor } from "@wellspr/react-quill-editor";
import { useParams, useRouter } from "next/navigation";
import { useNotes } from "@/context";
import { Button } from "@/components/Common";
import EditorToolbar from "./EditorToolbar";
import { store } from "@/store";

const EditorComponent = () => {

    const router = useRouter();
    const routeParams = useParams();
    const [params, setParams] = useState<{ key: string }>();
    const [title, setTitle] = useState<string>("");
    const { content, quill } = useEditor();
    const { addNote, updateNote, deleteNote } = useNotes();

    useEffect(() => {
        if (routeParams && routeParams.key) {
            if (typeof (routeParams.key) === "string") {
                const key: string = routeParams.key;
                setParams({ key });
            }
        }
    }, [routeParams]);

    useEffect(() => {
        if (params) {
            store.notes.get()
                .then(notes => {
                    return notes?.filter(note => note.key === params.key)[0];
                })
                .then(note => {
                    if (note) {
                        setTitle(note.title);
                        if (quill) {
                            if (note.content.delta) {
                                const delta: DeltaType = note.content.delta
                                quill.setContents(delta);
                                quill.focus();
                            }
                        }
                    }
                })
        }
    }, [params, quill]);

    const saveNote = useCallback(() => {
        if (params) {
            updateNote(params.key, title, content);
            router.back();
        } else {
            if (title.length > 0) {
                addNote(title, content);
                router.back();
            }
        }
    }, [
        title,
        content,
        addNote,
        updateNote,
        params,
        router,
    ]);

    return (
        <div className="editor">
            <form
                className="form editor__form"
                onSubmit={e => {
                    e.preventDefault();
                    saveNote();
                }}
            >
                <div className="editor__title-input">
                    <div className="form__group form__group--notes">
                        <label htmlFor="todo-input" className="form__group__label "></label>
                        <input
                            id="notes-input"
                            type="text"
                            className="form__group__input form__group__input--notes"
                            placeholder="Add a title..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                </div>

                <Editor height={200}>
                    <EditorToolbar />
                </Editor>
                <div className="editor__buttons">
                    <Button
                        className="button editor__buttons__button editor__buttons__button--save"
                        label="Save"
                        type="submit"
                        disabled={title.length === 0}
                    />
                    <Button
                        className="button editor__buttons__button editor__buttons__button--cancel"
                        label="Cancel"
                        type="button"
                        onClick={() => router.back()}
                    />
                    {
                        params &&
                        <Button
                            className="button editor__buttons__button editor__buttons__button--delete"
                            label="Delete"
                            type="button"
                            onClick={() => {
                                deleteNote(params.key);
                                router.back();
                            }}
                        />
                    }
                </div>
            </form>
        </div>
    );
};

export default EditorComponent;