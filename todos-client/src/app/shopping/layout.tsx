import { Provider } from "@/context";
import { Footer, Header } from "@/components/Base";

export default function Layout(props: {
    children: React.ReactNode,
}) {
    return (
        <Provider.Shopping>
            <Header />
            <main className="main-container">
                {props.children}
            </main>
            <Footer />
        </Provider.Shopping>
    );
}