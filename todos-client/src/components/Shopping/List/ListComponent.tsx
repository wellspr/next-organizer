"use client";

import { useShopping } from "@/context";
import { useRouter } from "next/navigation";

const ListComponent = () => {

    const { lists } = useShopping();
    const router = useRouter();

    return (
        <ul className="shopping__list">
            {
                lists && lists.map(list => {
                    return (
                        <li key={list.key} className="shopping__list__item">
                            <div
                                className="shopping__list__item__name"
                                onClick={() => {
                                    router.push(`/shopping/list/${list.key}`);
                                }}
                            >
                                {list.name}
                            </div>
                        </li>
                    );
                })
            }
        </ul>
    );
};

export default ListComponent;