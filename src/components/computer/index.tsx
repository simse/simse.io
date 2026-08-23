import RadioIcon from "@assets/desktop_icons/cd_audio_cd_a-4.png";
import ChatIcon from "@assets/desktop_icons/chat.png";
import ClockIcon from "@assets/desktop_icons/clock.png";
import AboutIcon from "@assets/desktop_icons/info.png";
import BiographyIcon from "@assets/desktop_icons/msagent-3.png";
import PaintIcon from "@assets/desktop_icons/paint.png";
import SettingsIcon from "@assets/desktop_icons/settings.png";
import ContextMenuWrapper from "@components/computer/ContextMenuWrapper.tsx";
import LoadingWrapper from "@components/computer/LoadingWrapper.tsx";
import ClockWindow from "@components/computer/windows/Clock";
import PaintWindow from "@components/computer/windows/Paint";
import { useLayoutEffect, useState } from "preact/hooks";

import { ReferenceDataContext } from "../../context.ts";
import Desktop from "./Desktop";
import type { ReferenceData } from "./referenceData.ts";
import TopBar from "./TopBar";
import type { WindowType } from "./types";
import AboutWindow from "./windows/About.tsx";
import BiographyWindow from "./windows/Biography";
import ChatWindow from "./windows/Chat";
import RadioWindow from "./windows/Radio";
import SettingsWindow from "./windows/Settings/Settings";

const windowDefinitions: WindowType[] = [
  {
    title: "Biography",
    component: BiographyWindow,
    id: "biography",
    type: "biography",
    icon: BiographyIcon,
    openByDefault: true,
    showOnDesktop: true,
  },
  /*{
		title: "Projects",
		component: ProjectsWindow,
		id: "projects",
		type: "projects",
		icon: ProjectsIcon,
		openByDefault: false,
		showOnDesktop: true,
	},*/
  {
    title: "Radio",
    component: RadioWindow,
    id: "radio",
    type: "radio",
    icon: RadioIcon,
    showOnDesktop: true,
  },
  {
    title: "Chat",
    component: ChatWindow,
    id: "chat",
    type: "chat",
    icon: ChatIcon,
    openByDefault: true,
    showOnDesktop: true,
  },
  {
    title: "Paint",
    component: PaintWindow,
    id: "paint",
    type: "paint",
    icon: PaintIcon,
    showOnDesktop: true,
  },
  {
    title: "Clock",
    component: ClockWindow,
    id: "clock",
    type: "clock",
    icon: ClockIcon,
    showOnDesktop: true,
  },
  {
    title: "System Preferences",
    component: SettingsWindow,
    id: "settings",
    type: "settings",
    icon: SettingsIcon,
    showOnDesktop: true,
  },
  {
    title: "About simonOS",
    component: AboutWindow,
    id: "about",
    type: "about",
    icon: AboutIcon,
    showOnDesktop: true,
  },
];

interface ComputerProps {
  referenceData: ReferenceData;
}

const Computer = ({ referenceData }: ComputerProps) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [windows, setWindows] = useState<WindowType[]>(
    windowDefinitions.filter((window) => window.openByDefault),
  );
  const [windowStack, setWindowStack] = useState<string[]>(
    windowDefinitions.filter((window) => window.openByDefault).map((window) => window.id),
  );

  // window utilities
  const getWindow = (id: string) => windows.find((window) => window.id === id);

  const closeWindow = (id: string) => {
    setWindows((prevWindows) => prevWindows.filter((prevWindow) => prevWindow.id !== id));
    setWindowStack((prevStack) => prevStack.filter((stackId) => stackId !== id));
  };

  const touchWindow = (id: string) => {
    if (windowWidth <= 640) {
      const windowElement = document.getElementById(id);
      if (windowElement) {
        windowElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      setWindowStack((prevStack) => {
        const newStack = prevStack.filter((stackId) => stackId !== id);
        newStack.push(id);
        return newStack;
      });
    }

    const window = getWindow(id);
    if (window) {
      updateMeta();
    }
  };

  const updateMeta = () => {
    /*if (window.meta) {
      //history.pushState({}, '', window.meta.path)
      //document.title = window.meta.title + '—simonOS'

      const description = document.querySelector('meta[name="description"]')
      if (description) {
        description.setAttribute('content', window.meta.description)
      }
    } else {
      history.pushState({}, '', '/')
    }*/
  };

  const openWindow = (newWindow: WindowType) => {
    // if on mobile, navigate to path instead
    /*if (windowWidth <= 640) {
			window.location.href = newWindow.meta?.path || "/";
		}*/

    if (windows.find((prevWindow) => prevWindow.id === newWindow.id)) {
      touchWindow(newWindow.id);
      return;
    }

    setWindows((prevWindows) => [...prevWindows, newWindow]);
    setWindowStack((prevStack) => {
      const newStack = prevStack.filter((stackId) => stackId !== newWindow.id);
      newStack.push(newWindow.id);
      return newStack;
    });
    updateMeta();
  };

  return (
    <ReferenceDataContext.Provider value={referenceData}>
      <LoadingWrapper>
        <ContextMenuWrapper>
          <div class="pb-4 sm:h-screen sm:max-h-screen sm:overflow-hidden sm:pb-0">
            <TopBar />

            <div class="relative flex h-full w-full flex-col-reverse gap-4 p-2 sm:block sm:p-0">
              {windows.map((window) => {
                const WindowComponent = window.component;

                // check if window is opened in stack
                if (!windowStack.includes(window.id)) return null;

                return (
                  <WindowComponent
                    key={window.id}
                    order={windowStack.indexOf(window.id)}
                    onClose={() => closeWindow(window.id)}
                    onTouch={() => {
                      // if on desktop
                      if (windowWidth > 640) {
                        touchWindow(window.id);
                      }
                    }}
                    openWindow={openWindow}
                    {...window}
                  />
                );
              })}

              <Desktop
                icons={windowDefinitions
                  .filter((window) => window.showOnDesktop)
                  .map((window) => ({
                    name: window.title,
                    icon: window.icon,
                    onDoubleClick: () => openWindow(window),
                  }))}
              />
            </div>
          </div>
        </ContextMenuWrapper>
      </LoadingWrapper>
    </ReferenceDataContext.Provider>
  );
};

export default Computer;
