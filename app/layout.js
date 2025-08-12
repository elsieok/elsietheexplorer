import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
    title: 'ElsieThe Explorer',
    description: 'A personal blog and portfolio website for ElsieThe Explorer, showcasing posts, projects, and more!',
    other: {
        "google-site-verification": "FRaBDzG4NceDi8XBmhf6f0SSA60YFwaZHtB-IL38G2Y"
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="google-site-verification" content="FRaBDzG4NceDi8XBmhf6f0SSA60YFwaZHtB-IL38G2Y" />
            </head>
            
            <body>
                <Header />
                  <main className="min-h-screen p-4 bg-[#F2DFDE]">
                  {children}
                  </main>
                <Footer />
            </body>
        </html>
    );
}