import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: {
    default: 'ElsieThe Explorer',
    template: '%s | ElsieThe Explorer',
  },
  description: 'Personal blog',
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
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main style={{ flex: 1, background: "var(--bg-page)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}