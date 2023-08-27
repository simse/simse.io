import { useState } from 'preact/compat';
import Hero from "./Hero";

const funFacts = [
    {
        title: "Portability Unleashed",
        description: "In the 70s and 80s, the cassette tape was the go-to medium for portable music. This pocket-sized innovation was a game-changer, allowing music lovers to take their favorite tunes on the go.",
        longDescription: '<p>In the vibrant decades of the 70s and 80s, the cassette tape emerged as a groundbreaking innovation in the realm of music and technology. Compact and portable, these tiny rectangular devices were a far cry from the bulky vinyl records and 8-track tapes that had dominated the music scene till then. Suddenly, music was no longer confined to living rooms or concert halls - it was something you could slip into your pocket, carry with you, and enjoy wherever you went.</p><p>The cassette tape was more than just a medium for music; it was a symbol of a cultural shift towards personalization and portability. Its impact was transformative, as it introduced a new way of experiencing music that was entirely user-centric. Whether it was a teenager with a Walkman playing a mixtape in a suburban park, or a group of friends sharing their favorite songs on a road trip, the cassette tape made music an integral part of everyday life, setting the stage for the personal media revolution that would follow in the decades to come.</p>',
        href: 'https://en.wikipedia.org/wiki/Walkman'
    },
    {
        title: "The Birth of Personal Playlists",
        description: "Cassette tapes offered more than just portability. They introduced a personal element to music consumption. With the ability to create custom mixtapes, listeners could curate their own playlists long before the advent of digital streaming platforms.",
        longDescription: '',
        href: 'https://en.wikipedia.org/wiki/Walkman'
    },
    {
        title: 'A Cultural Icon',
        description: 'The cassette tape was more than a technological marvel; it was a cultural icon. It became an integral part of music sharing culture, setting the stage for social listening experiences that are now commonplace in the digital age.',
        longDescription: '',
        href: ''
    },
    {
        title: 'Pioneering Portable Media',
        description: 'The impact of cassette tapes extends beyond music. They pioneered the concept of portable personal media, influencing the development of subsequent technologies like portable CD players, MP3 players, and eventually, smartphones.',
        longDescription: '',
        href: ''
    }
]

const PortabilitySection = () => {
    const [openModal, setOpenModal] = useState<number | null>(null);

    return (
        <div className="relative overflow-clip">
            <svg
		class="absolute left-4 top-7 mt-1 h-full w-6 border-t border-zinc-300"
		aria-hidden="true"
		><defs
			><pattern
				id=":R1t6:"
				width="32"
				height="8"
				patternUnits="userSpaceOnUse"
				><path
					d="M 0 0 H 10 M 0 8 H 10"
					class="stroke-white/30"
					fill="none"></path></pattern
			></defs
		><rect width="100%" height="100%" fill="url(#:R1t6:)"></rect></svg
	>

            <div className="font-bold p-4 text-lg text-zinc-300 pl-16">
                <p>1970s — 1980s</p>
            </div>

            <div className="">
                <Hero />

                <div className="max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 pb-8 px-8">
                    {funFacts.map((funFact, index) => (
                        <div key={`walkman-funfact-${index}`}>
                            <h2 className="font-bold text-3xl mb-4">{funFact.title}</h2>

                            <p className="text-zinc-200 text-lg mb-4">{funFact.description}</p>

                            <a
                                className="px-6 py-3 rounded-full border-orange-400 border inline-block text-orange-400 hover:cursor-pointer hover:bg-orange-400 hover:text-black transition-colors"
                            /*onClick={() => setOpenModal(index)}*/
                            >Read more ⟶</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PortabilitySection;