import { Inter } from 'next/font/google';
import './styles/index.css';
import Provider from './context';
import Header from './layout/Header';
import Footer from './layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="container">
                    <Provider>
                        <Header />
                        <main className="main-container">
                            {children}
                        </main>
                        <Footer />
                    </Provider>
                </div>
            </body>
        </html>
    )
}
