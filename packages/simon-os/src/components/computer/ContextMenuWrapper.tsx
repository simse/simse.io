import type { JSX } from "preact";
import { useState } from "preact/hooks";

interface ContextMenuWrapperProps {
	children: JSX.Element;
}

const ContextMenuWrapper = ({ children }: ContextMenuWrapperProps) => {
	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div
			/*onContextMenu={(e) => {
				e.preventDefault();

				setPosX(e.pageX + 5);
				setPosY(e.pageY + 5);
				setIsVisible(true);
			}}*/
			onMouseDown={() => setIsVisible(false)}
		>
			<ul
				class="fixed bg-[#FAF2E8] border"
				style={{
					top: posY,
					left: posX,
					display: isVisible ? "block" : "none",
					zIndex: 1000,
				}}
			>
				<li class="px-2 py-1 min-w-48 cursor-pointer">Hello world</li>
			</ul>

			{children}
		</div>
	);
};

export default ContextMenuWrapper;
