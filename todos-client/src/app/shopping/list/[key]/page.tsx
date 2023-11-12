"use client";

import { Items } from "@/components/Shopping";
import { useShopping } from "@/context";
import { useParams } from "next/navigation";

const Page = () => {

    const params = useParams();
    const { list } = useShopping();

    return (
        <>
            <div className="shopping__form">
                <Items.Input listKey={String(params.key)} />

            </div>
            <div className="shopping__list">
                {list && list.key}
                {list && list.name}

                <ul className="shopping__list__items">
                    {
                        (list && list.items) && list.items.map(item => {
                            return <li key={list.key}>
                                <div className="shopping__list__items__name">
                                    {item.name}
                                </div>
                                <div className="shopping__list__items__quantity">
                                    {item.quantity}
                                </div>
                                <div className="shopping__list__items__price">
                                    {item.price}
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    );
};

export default Page;