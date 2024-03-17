import { useState, useRef, useEffect } from "preact/compat";
import logo from "@assets/logo.png";

interface NavbarProps {
  openMenuIcon?: any;
  closeMenuIcon?: any;
  linkIcon?: any;
  speakerIcon?: any;
  activeItem?: "Home" | "Blog" | "Projects" | "Photography" | "Contact";
}

const items = [
  {
    title: "Home",
    link: "/",
    showInBar: true,
  },
  {
    title: "Blog",
    link: "/blog",
    showInBar: true,
  },
  /*{
    title: "About",
    link: "/about",
    showInBar: true,
  },*/
  {
    title: "Projects",
    link: "/projects",
    showInBar: true,
  },
  {
    title: "Photography",
    link: "/photography",
    showInBar: false,
  },
  {
    title: "Contact",
    link: "/contact",
    showInBar: false,
  }
];

const Navbar = ({
  openMenuIcon,
  closeMenuIcon,
  linkIcon,
  speakerIcon,
  activeItem,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const logoRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsPageScrolled(true);
    } else {
      setIsPageScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoHover = () => {
    if (logoRef.current) {
      logoRef.current.play();
    }
  };

  useEffect(() => {
    document.addEventListener("mood_music", () => {
      if (musicRef.current) {
        musicRef.current.play();
        setIsMusicPlaying(true);
      }
    });
  });

  return (
    <>
      <nav
        className={`
          px-1 md:px-4 py-3 flex justify-between items-center rounded-b-lg z-40 sticky mx-auto
          backdrop-blur-sm top-0 w-full max-w-6xl border-x border-b border-transparent transition-colors
          ${isMenuOpen ? "bg-transparent" : "bg-zinc-950/90"}
          ${isPageScrolled && !isMenuOpen ? "border-zinc-700" : ""}
        `}
      >
        <a
          className="flex items-center"
          href="/"
          onMouseEnter={handleLogoHover}
        >
          <video
            muted
            playsinline
            poster={logo.src}
            className="mr-2 h-8 w-8"
            ref={logoRef}
          >
            <source src="/logo.webm" type="video/webm" />
          </video>

          <span className="font-bold">Simon <span class="hidden sm:inline-block">Sorensen</span></span>
        </a>

        <ul className={"ml-auto flex items-center"}>
          {items.map((item) => (
            item.showInBar && <li class="hidden sm:block">
              <a
                className={`
                  p-2 ${
                    item.title === activeItem ? "font-bold" : "text-zinc-300"
                  } hover:text-zinc-50
                  transition-all ${isMenuOpen ? "opacity-0" : "opacity-100"}
                `}
                href={item.link}
                data-astro-prefetch
              >
                {item.title}
              </a>
            </li>
          ))}

          <li className="ml-4">
            <button
              className="px-2 text-sm rounded-full font-bold flex items-center gap-1 uppercase"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? closeMenuIcon : openMenuIcon}
              {isMenuOpen ? "Close" : "Menu"}
              {isMusicPlaying && <div class="bg-blue-600 p-1 rounded-full ml-1">
                {speakerIcon}
              </div>}
            </button>
          </li>
        </ul>

      </nav>

      <nav
        className={`
          fixed top-0 bg-zinc-800/90 max-w-6xl w-full rounded-b-lg pt-16 pb-4 px-4 
          left-1/2 -translate-x-1/2 z-30 min-h-[32em] backdrop-blur-sm transition-all transform-gpu
          grid grid-cols-2 gap-8
          ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-2"
          }
        `}
      >
        <div class="w-full bg-zinc-700 h-full hidden md:block"></div>

        <ul className="flex flex-col">
          <li class="font-semibold text-sm text-zinc-300">PAGES</li>

          {items.map((item) => (
            <li className={"py-2 md:py-3 first:pt-0"}>
              <a
                className={`text-3xl md:text-4xl flex gap-2 hover:text-zinc-50 transition-colors ${
                  item.title === activeItem ? "font-semibold" : "text-zinc-300"
                }`}
                href={item.link}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
                {item.title !== activeItem && <span
                  class={`bg-zinc-600 rounded-full h-5 w-5 flex items-center justify-center`}
                >
                  {linkIcon}
                </span>}
              </a>
            </li>
          ))}

          <li class="mt-auto">
            <audio 
              controls 
              volume={0.2} 
              ref={musicRef}
              onPause={() => setIsMusicPlaying(false)}
              onPlay={() => setIsMusicPlaying(true)}
              onEnded={() => setIsMusicPlaying(false)}
            >
              <source src="/mood_music/seine_river.ogg" type="audio/ogg" />
            </audio>
          </li>
        </ul>
      </nav>

      <div
        className={`
          fixed w-screen h-screen z-10 bg-black/80 top-0 left-0 
          transition-opacity ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
