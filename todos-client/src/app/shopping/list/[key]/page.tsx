import { 
    ListComponent, 
    ListHeader, 
    ListInput,
    TotalValue,
} from "@/components/Shopping/List";

const Page = () => {
    return (
        <div className="shopping__list">
            <ListHeader />
            <ListInput />
            <ListComponent />
            <TotalValue />
        </div>
    );
}

export default Page;