'use client'
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="bg-[#C56462] text-gray-900 p-4 shadow-md sticky top-0 z-50">
            <nav className="container mx-auto">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-lg font-bold">
                        <Link 
                            href="/" 
                            className="text-xl md:text-2xl font-bold hover:text-[#803635] transition-colors"
                            onClick={closeMenu}
                        >
                            ElsieThe Explorer
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-md hover:bg-[#803635] hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop navigation */}
                    <ul className="hidden md:flex space-x-6">
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
                </div>

                {/* Mobile navigation menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <ul className="flex flex-col space-y-3">
                            <li>
                                <Link 
                                    href="/" 
                                    className="block py-2 px-4 rounded-lg hover:bg-[#803635] hover:text-white transition-colors"
                                    onClick={closeMenu}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/blog" 
                                    className="block py-2 px-4 rounded-lg hover:bg-[#803635] hover:text-white transition-colors"
                                    onClick={closeMenu}
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/projects" 
                                    className="block py-2 px-4 rounded-lg hover:bg-[#803635] hover:text-white transition-colors"
                                    onClick={closeMenu}
                                >
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/photography" 
                                    className="block py-2 px-4 rounded-lg hover:bg-[#803635] hover:text-white transition-colors"
                                    onClick={closeMenu}
                                >
                                    Photography
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/about" 
                                    className="block py-2 px-4 rounded-lg hover:bg-[#803635] hover:text-white transition-colors"
                                    onClick={closeMenu}
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}