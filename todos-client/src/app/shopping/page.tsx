import { ListsComponent, NameInput } from "@/components/Shopping/List";

const Page = () => {
    return (
        <div className="shopping">
            <NameInput />
            <ListsComponent />
        </div>
    );
};

export default Page;