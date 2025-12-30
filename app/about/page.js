import Link from "next/link";
import Image from "next/image";
import ContactForm from "../components/ContactForm";

const socialLinks = [
    {
        name: 'Instagram',
        url: 'https://instagram.com/4kewii',
        //icon: Instagram,
        color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/elsie-okon/',
        //icon: Linkedin,
        color: 'bg-blue-600'
    },
    {
        name: 'Substack',
        url: 'https://overlady.substack.com',
        //icon: FileText,
        color: 'bg-orange-500'
    },
    // Uncomment when you have a Spotify link:
    // {
    //     name: 'Spotify',
    //     url: 'https://open.spotify.com/artist/yourartistid',
    //     icon: Music,
    //     color: 'bg-green-500'
    // },
];

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Hero Section with Photo */}
            <div className="flex items-center justify-center">
                <div className="rounded-2xl p-8 mb-12">
                    {/* Profile Photo */}
                    <div className="flex-shrink-0">
                        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#C56462] shadow-xl bg-[#F5E6E6]">
                            {/* <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#CE8988] to-[#C56462]">
                                <span className="text-white text-6xl font-bold">E</span>
                            </div> */}
                            <Image
                                src="/photos/about.jpg"
                                alt="Elsie"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                {/* Quick Intro */}
                <div className="flex-1 text-center ">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
                        Hi, I'm Elsie!
                    </h1>
                    {/* <p className="text-xl text-gray-700 mb-4">
                        Computer Science Student • Traveler • Music Maker
                    </p> */}
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
                {/* About Me Section */}
                <section className="bg-white rounded-xl shadow-md p-8 border border-[#E2B9B8]">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-[#C56462] pb-2">
                        About Me
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-800 space-y-4">
                        <p>
                            Hello world! I'm Elsie. That's it, short and sweet. I'm from Manchester and I'm a student at{' '}
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
                            My main hobbies include making music (right now it's really just trumpet, piano and production), playing rugby (badly), and walking long distances from my current location, wherever that may be at a given time. Beyond that, I'm always down to try something new!
                        </p>

                        <p>
                            Currently, I'm working on a few personal{' '}
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

                {/* Education Section
                <section className="bg-[#F5E6E6] rounded-xl shadow-md p-8 border border-[#E2B9B8]">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-[#C56462] pb-2">
                        Education
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-[#C56462] rounded-full flex items-center justify-center text-white font-bold text-xl">
                                🎓
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Pomona College</h3>
                                <p className="text-gray-700 font-semibold">Bachelor of Arts in Computer Science</p>
                                <p className="text-gray-600">Minor in Chemistry</p>
                                <p className="text-gray-500 text-sm mt-1">Claremont, California</p>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* Interests & Hobbies
                <section className="bg-white rounded-xl shadow-md p-8 border border-[#E2B9B8]">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-[#C56462] pb-2">
                        Interests & Hobbies
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#F5E6E6] rounded-lg p-6 border border-[#E2B9B8]">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                🎵 Music
                            </h3>
                            <p className="text-gray-700">
                                I play trumpet and piano, and I'm always experimenting with music production. There's something magical about creating sounds and melodies.
                            </p>
                        </div>

                        <div className="bg-[#F5E6E6] rounded-lg p-6 border border-[#E2B9B8]">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                🏉 Rugby
                            </h3>
                            <p className="text-gray-700">
                                Playing rugby (admittedly badly) keeps me active and reminds me that teamwork and persistence matter both on and off the field.
                            </p>
                        </div>

                        <div className="bg-[#F5E6E6] rounded-lg p-6 border border-[#E2B9B8]">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                🌍 Travel
                            </h3>
                            <p className="text-gray-700">
                                From studying abroad in Australia to exploring Indonesia and Thailand, I've caught the travel bug. Always looking for the next adventure!
                            </p>
                        </div>

                        <div className="bg-[#F5E6E6] rounded-lg p-6 border border-[#E2B9B8]">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                🚶 Long Walks
                            </h3>
                            <p className="text-gray-700">
                                Walking long distances from wherever I am helps me clear my mind and discover new places. Simple but satisfying.
                            </p>
                        </div>
                    </div>
                </section> */}

                {/* Connect Section */}
                <section className="bg-gradient-to-r from-[#C56462] to-[#CE8988] rounded-xl shadow-lg p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Let's Connect!
                    </h2>
                    <p className="text-lg mb-6 opacity-90">
                        Want to chat about tech, travel, or music? Find me online or send me a message!
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex gap-4 justify-center flex-wrap mb-8">
                        {socialLinks.map((link) => {
                            //const Icon = link.icon
                            return (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${link.color} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md flex items-center gap-2`}
                                    title={link.name}
                                >
                                    {/* <Icon size={20} /> */}
                                    {link.name}
                                </Link>
                            )
                        })}
                    </div>

                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link 
                            href="/blog"
                            className="bg-white text-[#C56462] px-6 py-3 rounded-lg font-semibold hover:bg-[#F5E6E6] transition-colors shadow-md"
                        >
                            Read My Blog
                        </Link>
                        <Link 
                            href="/projects"
                            className="bg-[#803635] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6B2D2C] transition-colors shadow-md"
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