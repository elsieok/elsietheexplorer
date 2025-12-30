import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-[#C56462] text-gray-900 p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href="/" className="text-2xl font-bold hover:text-[#803635] transition-colors">
                        ElsieThe Explorer
                    </Link>
                </div>
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/" className="hover:underline hover:text-[#803635] transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className="hover:underline hover:text-[#803635] transition-colors">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" className="hover:underline hover:text-[#803635] transition-colors">
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link href="/photography" className="hover:underline hover:text-[#803635] transition-colors">
                            Photography
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:underline hover:text-[#803635] transition-colors">
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}