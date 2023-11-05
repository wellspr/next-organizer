import Footer from "@/components/Base/Footer";
import Header from "@/components/Base/Header";
import { Provider } from "@/context";

export default function Layout(props: {
    list: React.ReactNode,
    children: React.ReactNode,
}) {
    return (
        <Provider.Notes>
            <Header />
            <main className="main-container">
                {props.list}
                {props.children}
            </main>
            <Footer />
        </Provider.Notes>
    );
};