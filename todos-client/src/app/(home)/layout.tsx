import '@/styles/index.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TodosProvider from '@/context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Next Todo App',
    description: 'A Todo App Powered by Next JS',
};

export default function RootLayout(props: {
    todos: React.ReactNode,
    header: React.ReactNode,
    main: React.ReactNode,
    footer: React.ReactNode,
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="container">
                    <TodosProvider>
                        { props.header }
                        { props.main }
                        { props.footer }
                    </TodosProvider>
                </div>
            </body>
        </html>
    );
}
