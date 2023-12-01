"use client";

import { Shopping } from "@/components";
import { useParams } from "next/navigation";

const ListInput = () => {

    const params = useParams();

    return (
        <div className="shopping__form">
            <Shopping.Items.Provider>
                <Shopping.Items.Input listKey={String(params.key)} />
            </Shopping.Items.Provider>
        </div>
    );
};

export default ListInput;