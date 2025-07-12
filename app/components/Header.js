import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-[#BA5958] text-white p-4 shadow-xl">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href="/" className="text-2xl font-bold text-gray-900">
                    ElsieThe Explorer
                    </Link>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="text-gray-900 hover:underline">
                        Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className="text-gray-900 hover:underline">
                        Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" className="text-gray-900 hover:underline">
                        Projects
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="text-gray-900 hover:underline">
                        About
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}