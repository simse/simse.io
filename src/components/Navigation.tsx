import ArrowIcon from "~icons/lucide/arrow-up-right";

import Memoji from "../assets/icon.png";

const externalLinks = [
  {
    label: "Github",
    href: "https://github.com/simse",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/simse/",
  },
  {
    label: "CV",
    href: "/simon-sorensen-cv.pdf",
  },
];

export const Navigation = () => {
  const isScrolled = false;

  /*useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);*/

  return (
    <nav class="z-10 mb-4 flex justify-between px-2 py-3">
      <div
        class={`border bg-white/80 px-2 py-1 backdrop-blur-2xl ${isScrolled ? "border-zinc-200" : "border-transparent"} flex items-center overflow-clip rounded-xl`}
      >
        <img
          src={Memoji.src}
          alt=""
          class={`${isScrolled ? "translate-x-0" : "-translate-x-16"} mr-2 h-6 w-6 transition-all`}
        />

        <h1
          class={`${isScrolled ? "translate-x-0 text-lg" : "-translate-x-8 text-xl"} mr-4 font-medium transition-all`}
        >
          Simon Sorensen
        </h1>

        {/*<ul
          class={`flex gap-2 text-zinc-700 transition-opacity ${isScrolled ? "opacity-100" : "opacity-0"}`}
        >
          <li>Projects</li>
          <li>Hobbies</li>
          <li>Musings</li>
        </ul>*/}
      </div>

      <ul class={`flex gap-4 p-2 transition-opacity ${isScrolled ? "opacity-0" : "opacity-100"}`}>
        {externalLinks.map((link) => (
          <li>
            <a
              class="flex items-center text-zinc-500 transition-colors hover:text-zinc-800"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <ArrowIcon />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
