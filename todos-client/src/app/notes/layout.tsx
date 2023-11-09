import { Header, Footer } from "@/components/Base";
import { Provider } from "@/context";

export default function Layout(props: {
    children: React.ReactNode,
}) {
    return (
        <Provider.Notes>
            <Header />
            <main className="main-container">
                {props.children}
            </main>
            <Footer />
        </Provider.Notes>
    );
};