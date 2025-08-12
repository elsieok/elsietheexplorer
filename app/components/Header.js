import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-[#C56462] text-gray-900 p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href="/" className="text-2xl font-bold ">
                    ElsieThe Explorer
                    </Link>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:underline">
                        Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className="hover:underline">
                        Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" className="hover:underline">
                        Projects
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:underline">
                        About
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}