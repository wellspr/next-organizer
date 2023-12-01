"use client";

import { Button, Loading } from "@/components/Common";
import { useShopping } from "@/context";
import { Lists } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListDeleted = () => {

    const { lists, deleteListPermanently } = useShopping();
    const [deleted, setDeleted] = useState<Lists>();
    const router = useRouter();

    useEffect(() => {
        if (lists) {
            setDeleted(lists.filter(list => (list.deleted === true)));
        }
    }, [lists]);

    if (!deleted) {
        return (
            <div className="shopping_lists">
                <div className="shopping__lists__empty">
                    <Loading />
                </div>
            </div>
        );
    }

    if (deleted && deleted.length === 0) {
        return (
            <div className="shopping__lists">
                <Button
                    className="button"
                    onClick={() => router.back()}
                    label="Back"
                />
                <div className="shopping__lists__no-items">
                    <p>{"There are no deleted list!"}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Button
                className="button"
                onClick={() => router.back()}
                label="Back"
            />
            <ul className="shopping__lists">
                {
                    deleted.map(list => {
                        return (
                            <li key={list.key} className="shopping__lists__item">
                                <div
                                    className="shopping__lists__item__name"
                                    onClick={() => {
                                        //router.push(`/shopping/list/${list.key}`);
                                    }}
                                >
                                    {list.name}
                                    <span className="shopping__lists__item__date">
                                        {(new Date(list.created)).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="shopping__lists__item__buttons">
                                    <Button
                                        className="button button__delete-list"
                                        label="Delete"
                                        onClick={() => deleteListPermanently(list.key)}
                                    />
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
};

export default ListDeleted;