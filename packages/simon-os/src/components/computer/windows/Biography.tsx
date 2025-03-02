import SimonPicture from "@assets/me_but_dithered.png";
import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";

interface BiographyWindowProps extends WindowProps {}

const BiographyWindow = (props: BiographyWindowProps) => {
	return (
		<WindowFrame
			title="Biography"
			initialSize={{ width: 350, height: 500 }}
			initialPosition={{ x: 50, y: 50 }}
			{...props}
		>
			<div class="float-left mr-3">
				<img
					src={SimonPicture.src}
					alt="Simon"
					class="w-28 h-28 mb-1 bg-black/10"
					style={{
						imageRendering: "pixelated",
					}}
				/>
			</div>

			<p class="mb-4">
				<h1 class="text-2xl">Simon Sorensen</h1>
				<span class="font-sans-alt text-xs leading-3">
					23-year old Software Engineer™ in London, UK.
				</span>
			</p>

			<div class="font-sans-alt prose text-xs leading-5 mb-4">
				<p>
					I've always been fascinated with technology, and as a child I broke
					many things through tinkering.
				</p>

				<p>
					Around the age of 10, I learned the HTML, CSS and JS basics from
					Youtube. When I was 12, my dad got me a subscription to Treehouse,
					where I learned about PHP, Wordpress and jQuery.{" "}
				</p>

				<p>
					Since then I've known I wanted to be a Software Engineer, and now 11
					years later, I am!
				</p>

				<p>
					Currently I work at The LEGO Group as a Junior Software Engineer doing
					all sorts of cool stuff.
				</p>
			</div>
		</WindowFrame>
	);
};

export default BiographyWindow;
