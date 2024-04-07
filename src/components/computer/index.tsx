import { useState } from "preact/hooks";
import type { CollectionEntry } from "astro:content";

import TopBar from "./TopBar";
import BiographyWindow from "./windows/Biography";
import BlogList from "./windows/BlogList";
import RadioWindow from "./windows/Radio";
import Desktop from "./Desktop";
import type { WindowType } from "./types";

import BiographyIcon from "@assets/desktop_icons/msagent-3.png";
import BlogIcon from "@assets/desktop_icons/address_book_pad.png";
import RadioIcon from "@assets/desktop_icons/cd_audio_cd_a-4.png";

interface ComputerProps {
  blogPosts: CollectionEntry<"blog">[];
}

const Computer = ({ blogPosts }: ComputerProps) => {
  const BiographyWindowDefinition: WindowType = {
    title: "Biography",
    component: BiographyWindow,
    id: 'biography',
    type: "biography",
  };
  
  const BlogWindowDefinition: WindowType = {
    title: "Blog",
    component: BlogList,
    id: 'blog',
    type: "blogList",
    posts: blogPosts,
  };
  
  const RadioWindowDefinition: WindowType = {
    title: "Radio",
    component: RadioWindow,
    id: 'radio',
    type: "radio",
  };

  const [windows, setWindows] = useState<WindowType[]>([
    BiographyWindowDefinition,
    BlogWindowDefinition,
    RadioWindowDefinition,
  ]);
  const [windowStack, setWindowStack] = useState<string[]>(['blog', 'radio', 'biography']);

  const closeWindow = (id: string) => {
    setWindows((prevWindows) =>
      prevWindows.filter((prevWindow) => prevWindow.id !== id)
    );
  };

  const touchWindow = (id: string) => {
    setWindowStack((prevStack) => {
      const newStack = prevStack.filter((stackId) => stackId !== id);
      newStack.push(id);
      return newStack;
    });
  };

  const calculateZIndex = (id: string) => {
    return (windowStack.indexOf(id) + 1) * 10 + 100;
  };

  const openWindow = (window: WindowType) => {
    if (windows.find((prevWindow) => prevWindow.id === window.id)) {
      touchWindow(window.id);
      return;
    }

    setWindows((prevWindows) => [...prevWindows, window]);
    touchWindow(window.id);
  }

  return (
    <div class="max-h-screen overflow-hidden h-screen">
      <TopBar />

      <div class="relative w-full h-full">
        {windows.map((window) => {
          const WindowComponent = window.component;

          return (
            <WindowComponent
              key={window.id}
              zIndex={calculateZIndex(window.id)}
              onClose={() => closeWindow(window.id)}
              onTouch={() => touchWindow(window.id)}
              openWindow={openWindow}
              {...window}
            />
          );
        })}

        <Desktop
          icons={[
            {
              name: "Biography",
              icon: BiographyIcon,
              onDoubleClick: () => openWindow(BiographyWindowDefinition),
            },
            {
              name: "Blog",
              icon: BlogIcon,
              onDoubleClick: () => openWindow(BlogWindowDefinition),
            },
            {
              name: "Radio",
              icon: RadioIcon,
              onDoubleClick: () => openWindow(RadioWindowDefinition),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Computer;
