"use client";

import { Button } from "@/components/Common";
import { useShopping } from "@/context";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ListNameInput = () => {

    const router = useRouter();
    const { createList } = useShopping();
    const [listName, setListName] = useState<string>("");

    return (
        <form
            className="shopping__form"
            onSubmit={e => {
                e.preventDefault();
                createList(listName)
                    .then(key => {
                        setListName("");
                        router.push(`/shopping/list/${key}`);
                    })
            }}
        >

            <div className="shopping__form__group shopping__form__group__list__name">
                <input
                    className="shopping__form__group__input"
                    type="text"
                    placeholder="Give your list a name"
                    value={listName}
                    onChange={e => setListName(e.target.value)}
                />
            </div>
            <Button
                className="shopping__form__group__button"
                label="Create"
                type="submit"
            />
        </form>
    );
};

export default ListNameInput;