import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">
                About Me
            </h1>
            <div className="prose prose-lg max-w-none text-gray-800">
                <p>
                    Hello world! I&apos;m Elsie. That&apos;s it, short and sweet. I&apos;m from Manchester and I&apos;m a student at <Link href={"https://www.pomona.edu"}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#803635] hover:[#6B2D2C] hover:underline">
                    Pomona College
                    </Link> studying computer science with a minor in chemistry. 
                </p>

                <p>
                    My main hobbies include making music (right now it&apos;s really just trumpet, piano and production), playing rugby (badly), and walking long distances from my current location, wherever that may be at a given time. Beyond that, I&apos;d probably be down for anything as long as the vibe&apos;s right.
                </p>

                <p>
                    Currently, I&apos;m working on a few personal <Link href={"/projects"} className="text-[#803635] hover:[#6B2D2C] hover:underline">projects</Link>; nothing crazy, just trying to gain some hands-on experience in the tech world.
                </p>
            </div>
        </div>
    )
}