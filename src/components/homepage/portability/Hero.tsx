import { useEffect, useState } from "preact/compat";
import Walkman from "./Walkman";

const Hero = () => {
    const [staticWalkman, setStaticWalkman] = useState(false);

    useEffect(() => {
        // @ts-ignore this works fine in browser
        const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
        
        setStaticWalkman(isSafari);
    }, []);

    return (
        <div className="relative">
            <div className="w-full h-96 flex-col justify-start items-start inline-flex absolute top-0 -z-10">
                <div className="w-full h-12 lg:h-20 bg-pink-500" />
                <div className="w-full h-12 lg:h-20 bg-fuchsia-700" />
                <div className="w-full h-12 lg:h-20 bg-purple-800" />
                <div className="w-full h-12 lg:h-20 bg-violet-900" />
                <div className="w-full h-12 lg:h-20 bg-violet-950" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[2000px] mx-auto px-4 md:px-8">
                <div className="pt-48 lg:pt-[300px] font-bold">
                    <p className="text-3xl lg:text-6xl ">The Age of</p>

                    <h1 className="text-5xl md:text-7xl lg:text-[8rem] mb-4">Portability</h1>

                    <p className="text-xl md:text-2xl text-zinc-400">The Cassette Tape</p>
                </div>

                <div className="lg:pt-32">
                    {staticWalkman ? <div className=""></div> : <Walkman />}
                </div>
            </div>
        </div>
    );
}

export default Hero;