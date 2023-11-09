"use client";

import { Header, Footer } from "@/components/Base";
import dynamic from "next/dynamic";
//import { Provider } from "@/context";

const NotesProvider = dynamic(() => 
    import("@/context").then(m => m.Provider.Notes),
    { ssr: false },
);

export default function Layout(props: {
    children: React.ReactNode,
}) {
    return (
        <NotesProvider>
            <Header />
            <main className="main-container">
                {props.children}
            </main>
            <Footer />
        </NotesProvider>
    );
};