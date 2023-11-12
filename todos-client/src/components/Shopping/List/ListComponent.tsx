"use client";

import { useShopping } from "@/context";
import { useRouter } from "next/navigation";

const ListComponent = () => {

    const { lists, selectList } = useShopping();
    const router = useRouter();

    return (
        <ul className="shopping__list">
            {
                lists.map(list => {
                    return (
                        <li key={list.key} className="shopping__list__item">
                            <div
                                className="shopping__list__item__name"
                                onClick={() => {
                                    selectList(list.key);
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