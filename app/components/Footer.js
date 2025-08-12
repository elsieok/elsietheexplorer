export default function Footer() {
    // This component renders a footer for the website
    // It includes copyright information and a note about the technology used
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-[#C56462] text-gray-900 p-4">
            <div className="container mx-auto max-w-6xl text-center">
                <p className="text-sm">
                &copy; {currentYear} by ElsieThe Explorer. All rights reserved.
                </p>
                <p className="text-sm">
                Built with Next.js and Tailwind CSS.
                </p>
            </div>
        </footer>
    );
}