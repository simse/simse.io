import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";

interface AboutWindowProps extends WindowProps {}

const AboutWindow = (props: AboutWindowProps) => {
	return (
		<WindowFrame
			title="Biography"
			initialSize={{ width: 300 }}
			initialPosition={{ x: 300, y: 150 }}
			{...props}
		>
			<div class="flex flex-col items-center text-center h-full">
				<header class="select-none">
					<p class="text-3xl font-logo">simonOS</p>
					<p>Version 1.0</p>
				</header>
				<p class="font-sans-alt text-sm tracking-tighter leading-4 mt-4">
					simonOS is developed in London, United Kingdom. Due to technical
					challenges the clock is stuck in 1988.
				</p>

				<p class="mt-12 mb-4">
					© All rights reserved Simon Software Industries 1986-1988
				</p>
			</div>
		</WindowFrame>
	);
};

export default AboutWindow;
