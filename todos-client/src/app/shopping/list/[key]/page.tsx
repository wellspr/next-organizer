import { ListComponent, ListHeader, ListInput } from "@/components/Shopping/List";
import ListTotalValue from "@/components/Shopping/List/ListTotalValue";

const Page = () => {
    return (
        <div className="shopping__list">
            <ListHeader />
            <ListInput />
            <ListComponent />
            <ListTotalValue />
        </div>
    );
}

export default Page;