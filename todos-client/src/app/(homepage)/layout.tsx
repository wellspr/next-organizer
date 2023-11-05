import { Header, Footer } from "@/components/Base";

export default function Layout(props: {
    children: React.ReactNode,
}) {
    return (
        <>
            <Header />
            <main className="main-container">
                {props.children}
            </main>
            <Footer />
        </>
    );
};