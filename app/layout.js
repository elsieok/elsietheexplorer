import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
    title: 'ElsieThe Explorer',
    description: 'A personal blog and portfolio website for ElsieThe Explorer, showcasing posts, projects, and more!',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                  <main className="min-h-screen p-4 bg-[#CE8988]">
                  {children}
                  </main>
                <Footer />
            </body>
        </html>
    );
}