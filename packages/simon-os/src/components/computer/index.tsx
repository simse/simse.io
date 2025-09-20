import { useLayoutEffect, useState } from "preact/hooks";

import Desktop from "./Desktop";
import TopBar from "./TopBar";
import type { WindowType } from "./types";
import BiographyWindow from "./windows/Biography";
import ChatWindow from "./windows/Chat";
import RadioWindow from "./windows/Radio";
import SettingsWindow from "./windows/Settings/Settings";

// import BlogIcon from "@assets/desktop_icons/address_book_pad.png";
import RadioIcon from "@assets/desktop_icons/cd_audio_cd_a-4.png";
import ChatIcon from "@assets/desktop_icons/chat.png";
import BiographyIcon from "@assets/desktop_icons/msagent-3.png";
import SettingsIcon from "@assets/desktop_icons/settings.png";

const windowDefinitions: WindowType[] = [
	{
		title: "Biography",
		component: BiographyWindow,
		id: "biography",
		type: "biography",
		icon: BiographyIcon,
		openByDefault: true,
		meta: {
			title: "Biography",
			description: "Simon's biography",
			path: "/",
		},
	},
	{
		title: "Radio",
		component: RadioWindow,
		id: "radio",
		type: "radio",
		icon: RadioIcon,
		meta: {
			title: "Radio",
			description: "Simon's radio",
			path: "/",
		},
	},
	{
		title: "Chat",
		component: ChatWindow,
		id: "chat",
		type: "chat",
		icon: ChatIcon,
		openByDefault: true,
		meta: {
			title: "Chat",
			description: "Chat with me",
			path: "/",
		},
	},
	{
		title: "System Preferences",
		component: SettingsWindow,
		id: "settings",
		type: "settings",
		icon: SettingsIcon,
		meta: {
			title: "Chat",
			description: "Chat with me",
			path: "/",
		},
	},
];

const Computer = () => {
	//const BiographyWindowDefinition: WindowType = ;

	/*const BlogWindowDefinition: WindowType = {
		title: "Blog",
		component: BlogList,
		id: "blog",
		type: "blogList",
		meta: {
			title: "Blog",
			description: "Simon's blog",
			path: "/blog",
		},
	};*/

	/*const RadioWindowDefinition: WindowType = ;

    const ChatWindowDefinition: WindowType = ;*/

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
		windowDefinitions
			.filter((window) => window.openByDefault)
			.map((window) => window.id),
	);

	const getWindow = (id: string) => windows.find((window) => window.id === id);

	const closeWindow = (id: string) => {
		setWindows((prevWindows) =>
			prevWindows.filter((prevWindow) => prevWindow.id !== id),
		);
		setWindowStack((prevStack) =>
			prevStack.filter((stackId) => stackId !== id),
		);
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
			updateMeta(window);
		}
	};

	const updateMeta = (window: WindowType) => {
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
		if (windowWidth <= 640) {
			window.location.href = newWindow.meta?.path || "/";
		}

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
		updateMeta(newWindow);
	};

	return (
		<div class="sm:max-h-screen sm:overflow-hidden pb-4 sm:pb-0 sm:h-screen">
			<TopBar />

			<div class="relative w-full h-full flex flex-col-reverse gap-4 p-2 sm:block sm:p-0">
				{windows.map((window) => {
					const WindowComponent = window.component;

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
					icons={windowDefinitions.map((window) => ({
						name: window.title,
						icon: window.icon,
						onDoubleClick: () => openWindow(window),
					}))}
				/>
			</div>
		</div>
	);
};

export default Computer;
