import { useEffect, useState } from "preact/hooks";
const useSize = () => {
	if (typeof window === "undefined") return [0, 0];

	const [windowSize, setWindowSize] = useState([
		window.innerHeight,
		window.innerWidth,
	]);

	useEffect(() => {
		const windowSizeHandler = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};
		window.addEventListener("resize", windowSizeHandler);

		return () => {
			window.removeEventListener("resize", windowSizeHandler);
		};
	}, []);

	return windowSize;
};

export default useSize;
