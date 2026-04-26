import { useEffect, useState } from "react";
import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";

interface ClockWindowProps extends WindowProps {}

const ClockEntry = ({
	time,
	timeZone,
	city,
}: {
	time: Date;
	timeZone: string;
	city: string;
}) => {
	const formattedTime = time.toLocaleTimeString("en-GB", {
		timeZone,
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<li className="border-b last:border-0 pb-2 mb-2">
			<p>{city}</p>
			<p className="text-2xl font-sans-alt tracking-tighter">{formattedTime}</p>
		</li>
	);
};

const ClockWindow = (props: ClockWindowProps) => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timerId = setInterval(() => {
			setTime(new Date());
		}, 1000); // Update every minute

		return () => {
			clearInterval(timerId);
		};
	}, []);

	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const userCity =
		userTimeZone.split("/").pop()?.replace("_", " ") || "Local Time";

	const otherClocks = [
		{ city: "Copenhagen", timeZone: "Europe/Copenhagen" },
		{ city: "Tokyo", timeZone: "Asia/Tokyo" },
		{ city: "New York", timeZone: "America/New_York" },
		{ city: "Shanghai", timeZone: "Asia/Shanghai" },
		{ city: "Sydney", timeZone: "Australia/Sydney" },
	];

	return (
		<WindowFrame
			title="Clock"
			initialSize={{ width: 350 }}
			initialPosition={{ x: 750, y: 70 }}
			{...props}
		>
			<ul className="h-full overflow-y-auto">
				<ClockEntry time={time} timeZone={userTimeZone} city={userCity} />
				{otherClocks.map((clock) => (
					<ClockEntry
						key={clock.city}
						time={time}
						timeZone={clock.timeZone}
						city={clock.city}
					/>
				))}
			</ul>
		</WindowFrame>
	);
};

export default ClockWindow;
