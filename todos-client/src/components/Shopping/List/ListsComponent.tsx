"use client";

import { Button, Loading } from "@/components/Common";
import { useShopping } from "@/context";
import { Lists } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListsComponent = () => {

    const { lists, deleteList } = useShopping();
    const [current, setCurrent] = useState<Lists>();
    const router = useRouter();

    useEffect(() => {
        if (lists) {
            setCurrent(lists.filter(list => (list.deleted === false)));
        }
    }, [lists]);

    if (!current) {
        return <div className="shopping__lists">
            <div className="shopping__lists__empty">
                <Loading />
            </div>
        </div>
    }

    if (current && current.length === 0) {
        return (
            <div className="shopping__lists">
                <div className="shopping__lists__no-items">
                    <p>{"There aren't shopping lists yet!"}</p>
                </div>
            </div>
        );
    }

    return (
        <ul className="shopping__lists">
            {
                current.map(list => {
                    return (
                        <li key={list.key} className="shopping__lists__item">
                            <div
                                className="shopping__lists__item__name"
                                onClick={() => {
                                    router.push(`/shopping/list/${list.key}`);
                                }}
                            >
                                {list.name}
                                <span className="shopping__lists__item__date">
                                    {(new Date(list.created)).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="shopping__lists__item__buttons">
                                <Button
                                    className="button"
                                    label="Delete"
                                    onClick={() => deleteList(list.key)}
                                />
                            </div>

                        </li>
                    );
                })
            }
        </ul>
    );
};

export default ListsComponent;