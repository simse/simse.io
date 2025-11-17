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

			<div class="mb-4">
				<h1 class="text-2xl font-logo">Simon Sorensen</h1>
				<span class="font-sans-alt tracking-tighter leading-3">
					24-year old Software Engineer™ in London, UK.
				</span>

				<hr class="mt-2" />
			</div>

			<div class="font-sans-alt leading-5 tracking-tighter mb-4">
				<p className="my-4">
					Hello! Welcome to my website, feel free to have a look around.
				</p>

				<p className="my-4">
					I've spent my entire working life at The LEGO Group, first as a
					student worker, then a software engineering intern and now a full-time
					software engineer.
				</p>

				<p className="my-4">
					Currently I'm on the Pick a Brick team, but I've previously worked on
					platform services, cart services, payment services, cart and checkout,
					experiences, and finally internal applications.
				</p>
			</div>
		</WindowFrame>
	);
};

export default BiographyWindow;
