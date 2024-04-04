import { useState } from "preact/hooks";

import TopBar from "./TopBar";
import BiographyWindow from "./windows/Biography";
import BlogList from "./windows/BlogList";
import type { ComponentChild, FunctionalComponent } from "preact";
import type { WindowProps } from "./types";
import type { CollectionEntry } from "astro:content";
import RadioWindow from "./windows/Radio";
import BlogPost from "./windows/BlogPost";

interface Window {
  title: string;
  component: FunctionalComponent<WindowProps>;
  id: number;
  active: boolean;
  extra?: any;
}

interface ComputerProps {
  blogPosts: CollectionEntry<"blog">[];
  blogPost?: ComponentChild;
}

const Computer = ({
  blogPosts,
  blogPost
}: ComputerProps) => {
  const [windows, setWindows] = useState<Window[]>([
    {
      title: "Biography",
      component: BiographyWindow,
      id: 0,
      active: true,
    },
    {
      title: "Blog",
      component: BlogList,
      id: 1,
      active: false,
      extra: {
        posts: blogPosts,
      },
    },
    {
      title: "Radio",
      component: RadioWindow,
      id: 2,
      active: false,
    },
    /*{
      title: "Blog Post",
      component: BlogPost,
      id: 3,
      active: false,
      extra: {
        postSlug: 'github-username'
      },
    }*/
  ]);

  const closeWindow = (id: number) => {
    setWindows((prevWindows) =>
      prevWindows.filter((prevWindow) => prevWindow.id !== id)
    );
  }

  const touchWindow = (id: number) => {
    setWindows((prevWindows) =>
      prevWindows.map((prevWindow) => {
        if (prevWindow.id === id) {
          return {
            ...prevWindow,
            active: true,
          };
        }

        return {
          ...prevWindow,
          active: false,
        };
      })
    );
  }

  return (
    <div
      class="max-h-screen overflow-hidden h-screen"
    >
      <TopBar />

      <div class="relative w-full">
        {windows.map((window) => {
          const WindowComponent = window.component;

          return (
            <WindowComponent
              key={window.id}
              title={window.title}
              active={window.active}
              onClose={() => closeWindow(window.id)}
              onTouch={() => touchWindow(window.id)}
              {...window.extra}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Computer;
