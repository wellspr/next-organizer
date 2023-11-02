import '@/styles/index.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Next Notes',
    description: 'A Notes App Powered by Next JS',
};

export default function RootLayout(props: {
    children: React.ReactNode,
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="container">
                    {props.children}
                </div>
            </body>
        </html>
    );
}