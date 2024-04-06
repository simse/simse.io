import { useState } from "preact/hooks";

import TopBar from "./TopBar";
import BiographyWindow from "./windows/Biography";
import BlogList from "./windows/BlogList";
import type { ComponentChild, FunctionalComponent } from "preact";
import type { WindowProps } from "./types";
import type { CollectionEntry } from "astro:content";
import RadioWindow from "./windows/Radio";
import BlogPost from "./windows/BlogPost";
import Desktop from "./Desktop";

interface Window {
  title: string;
  component: FunctionalComponent<WindowProps>;
  id: number;
  extra?: any;
}

interface ComputerProps {
  blogPosts: CollectionEntry<"blog">[];
  blogPost?: ComponentChild;
}

const BiographyWindowDefinition: Window = {
  title: "Biography",
  component: BiographyWindow,
  id: 0,
}

const Computer = ({
  blogPosts,
  blogPost
}: ComputerProps) => {
  const [windows, setWindows] = useState<Window[]>([
    BiographyWindowDefinition,
    {
      title: "Blog",
      component: BlogList,
      id: 1,
      extra: {
        posts: blogPosts,
      },
    },
    {
      title: "Radio",
      component: RadioWindow,
      id: 2,
    },
    /*{
      title: "Blog Post",
      component: BlogPost,
      id: 3,
      extra: {
        postSlug: 'github-username'
      },
    }*/
  ]);
  const [windowStack, setWindowStack] = useState<number[]>([0, 1, 2, 3]);

  const closeWindow = (id: number) => {
    setWindows((prevWindows) =>
      prevWindows.filter((prevWindow) => prevWindow.id !== id)
    );
  }

  const touchWindow = (id: number) => {
    setWindowStack((prevStack) => {
      const newStack = prevStack.filter((stackId) => stackId !== id);
      newStack.push(id);
      return newStack;
    });
  }

  const calculateZIndex = (id: number) => {
    return ((windowStack.indexOf(id) + 1) * 10) + 100;
  }

  return (
    <div
      class="max-h-screen overflow-hidden h-screen"
    >
      <TopBar />

      <div class="relative w-full h-full">
        {windows.map((window) => {
          const WindowComponent = window.component;

          return (
            <WindowComponent
              key={window.id}
              title={window.title}
              zIndex={calculateZIndex(window.id)}
              onClose={() => closeWindow(window.id)}
              onTouch={() => touchWindow(window.id)}
              {...window.extra}
            />
          );
        })}

        <Desktop
          onIconDoubleClick={(name) => {
            if (name === "Biography") {
              // if biography is no longer in the list, add it back
              if (!windows.find((window) => window.id === 0)) {
                setWindows((prevWindows) => [
                  ...prevWindows,
                  BiographyWindowDefinition,
                ]);
              } else {
                touchWindow(0);
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Computer;
