"use client";

import { Shopping } from "@/components";
import { Button } from "@/components/Common";
import { useShopping } from "@/context";
import Icon from "@/icons";
import { List } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const ListHeader = () => {

    const router = useRouter();
    const params = useParams();
    const { lists, updateList } = useShopping();
    const [listName, setListName] = useState<string>();
    const updateInputRef = useRef<HTMLInputElement>(null);
    const [updatedListName, setUpdatedListName] = useState<string>("");

    const [showUpdateInput, setShowUpdateInput] = useState<boolean>(false);

    useEffect(() => {
        const key = String(params.key);

        if (lists) {
            const list: List = lists.filter(list => list.key === key)[0];
            if (list) {
                setListName(list.name);
                setUpdatedListName(list.name)
            }
        }
    }, [lists, params]);

    const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const key = String(params.key);
        updateList(key, { name: updatedListName });
        setShowUpdateInput(false);
    }, [params, updatedListName]);

    const onClickListName = useCallback(() => {
        setShowUpdateInput(true);
    }, []);

    const onInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Escape") {
            event.preventDefault();
            setShowUpdateInput(false);
        }
    }, []);

    useEffect(() => {
        if (updateInputRef && updateInputRef.current) {
            updateInputRef.current.focus();
        }
    }, [showUpdateInput, updateInputRef && updateInputRef.current]);

    useEffect(() => {
        const onClick = (event: MouseEvent) => {    
            if (showUpdateInput) {
                if (updateInputRef.current) {
                    if (updateInputRef.current.contains(event.target as Node)) {
                        return;
                    }
                }
                setShowUpdateInput(false);
            }
        };

        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("click", onClick);
        };
    }, [showUpdateInput]);

    return (
        <div className="shopping__list__header">
            <Button
                className="shopping__list__header__button"
                onClick={() => router.back()}
            >
                <Icon icon="caret-left" className="shopping__list__header__button__icon" />
            </Button>

            <div className="shopping__list__header__list-name">
                <div
                    className={
                        showUpdateInput ?
                            "shopping__list__header__list-name__value--hidden" :
                            "shopping__list__header__list-name__value"
                    }
                    onClick={onClickListName}
                >
                    {listName}
                </div>
                <form onSubmit={onSubmit}>
                    <input
                        ref={updateInputRef}
                        className={
                            showUpdateInput ?
                                `shopping__list__header__list-name__updateInput--show` :
                                `shopping__list__header__list-name__updateInput`
                        }
                        value={updatedListName}
                        onChange={e => setUpdatedListName(e.target.value)}
                        onKeyDown={onInputKeyDown}
                        type="text"
                        autoFocus={true}
                    />
                </form>
            </div>

            <Shopping.List.SyncButton className="shopping__list__header__button" />
        </div>
    );
};

export default ListHeader;