import type { SVGProps } from "preact/compat";

export function MuteIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.2em"
			height="1.2em"
			viewBox="0 0 24 24"
			{...props}
		>
			<title>Speaker icon with cross overlaid</title>
			<path
				fill="currentColor"
				d="M13 2h-2v2H9v2H7v2H3v8h4v2h2v2h2v2h2zM9 18v-2H7v-2H5v-4h2V8h2V6h2v12zm10-6.777h-2v-2h-2v2h2v2h-2v2h2v-2h2v2h2v-2h-2zm0 0h2v-2h-2z"
			/>
		</svg>
	);
}
export default MuteIcon;
