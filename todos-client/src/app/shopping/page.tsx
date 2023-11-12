import { ListComponent, NameInput } from "@/components/Shopping/List";

const Page = () => {
    return (
        <div className="shopping">
            <NameInput />
            <ListComponent />
        </div>
    );
};

export default Page;