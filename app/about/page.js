import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">
                About Me
            </h1>
            <div className="prose prose-lg max-w-none text-gray-800">
                <p>
                    Hello world! I'm Elsie. That's it, short and sweet. I'm from Manchester and I'm a student at <Link href={"https://www.pomona.edu"} className="hover:underline">Pomona College</Link> studying computer science with a minor in chemistry. 
                </p>

                <p>
                    My main hobbies include making music (right now it's really just trumpet, piano and production), playing rugby (badly), and walking long distances from my current location, wherever that may be at a given time. Beyond that, I'd probably be down for anything as long as the vibe's right.
                </p>

                <p>
                    Currently, I'm working on a few personal <Link href={"/projects"} className="hover:underline">projects</Link>; nothing crazy, just trying to gain some hands-on experience in the tech world.
                </p>
            </div>
        </div>
    )
}