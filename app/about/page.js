import Link from "next/link";
import Image from "next/image";
import { SiInstagram } from "react-icons/si";
import { SiLinkedin } from "react-icons/si";
import { SiSubstack } from "react-icons/si";
import ContactForm from "../components/ContactForm";

const socialLinks = [
    {
        name: 'Instagram',
        url: 'https://instagram.com/4kewii',
        icon: SiInstagram,
        color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/elsie-okon/',
        icon: SiLinkedin,
        color: 'bg-blue-600'
    },
    {
        name: 'Substack',
        url: 'https://overlady.substack.com',
        icon: SiSubstack,
        color: 'bg-orange-500'
    },
];

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {/* Hero Section with Photo */}
            <div className="flex items-center justify-center">
                <div className="rounded-2xl p-4 sm:p-8 mb-8 sm:mb-12">
                    {/* Profile Photo */}
                    <div className="flex-shrink-0">
                        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#C56462] shadow-xl bg-[#F5E6E6] mx-auto">
                            <Image
                                src="/photos/about.jpg"
                                alt="Elsie"
                                fill
                                sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                {/* Quick Intro */}
                <div className="flex-1 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-900">
                        Hi, I&apos;m Elsie!
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 sm:space-y-8">
                {/* About Me Section */}
                <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 border border-[#E2B9B8]">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 border-b-2 border-[#C56462] pb-2">
                        About Me
                    </h2>
                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800 space-y-4">
                        <p>
                            Hello world! I&apos;m Elsie. That&apos;s it, short and sweet. I&apos;m from Manchester and I&apos;m a student at{' '}
                            <Link 
                                href="https://www.pomona.edu"
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-[#803635] hover:text-[#6B2D2C] hover:underline font-semibold transition-colors"
                            >
                                Pomona College
                            </Link>
                            {' '}studying computer science with a minor in chemistry.
                        </p>

                        <p>
                            My main hobbies include making music (right now it&apos;s really just trumpet, piano and production), playing rugby (badly), and walking long distances from my current location, wherever that may be at a given time. Beyond that, I&apos;m always down to try something new!
                        </p>

                        <p>
                            Currently, I&apos;m working on a few personal{' '}
                            <Link 
                                href="/projects" 
                                className="text-[#803635] hover:text-[#6B2D2C] hover:underline font-semibold transition-colors"
                            >
                                projects
                            </Link>
                            ; nothing crazy, just trying to gain some hands-on experience in the tech world.
                        </p>
                    </div>
                </section>

                {/* Connect Section */}
                <section className="bg-gradient-to-r from-[#C56462] to-[#CE8988] rounded-xl shadow-lg p-4 sm:p-6 md:p-8 text-center text-white">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                        Let&apos;s Connect!
                    </h2>
                    <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
                        Want to chat? Find me online or send me a message!
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex gap-3 sm:gap-4 justify-center flex-wrap mb-6 sm:mb-8">
                        {socialLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${link.color} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md flex items-center gap-2`}
                                    title={link.name}
                                >
                                    <Icon size={20} />
                                </Link>
                            )
                        })}
                    </div>

                    <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
                        <Link 
                            href="/blog"
                            className="bg-white text-[#C56462] px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#F5E6E6] transition-colors shadow-md text-sm sm:text-base"
                        >
                            Read My Blog
                        </Link>
                        <Link 
                            href="/projects"
                            className="bg-[#803635] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#6B2D2C] transition-colors shadow-md text-sm sm:text-base"
                        >
                            View My Projects
                        </Link>
                    </div>
                </section>

                {/* Contact Form */}
                <section>
                    <ContactForm />
                </section>
            </div>
        </div>
    )
}