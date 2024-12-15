const stations = [
	{
		id: "wonder_80s",
		name: "Wonder 80's",
		banner: "/radio_banners/wonder_80s.avif",
	},
];

interface StationSelectProps {
    onSelect: () => void;
}

const StationSelect = ({
    onSelect,
}: StationSelectProps) => {
	return (
		<div class="max-h-full h-full overflow-y-auto">
            <h3 class="text-lg underline">Select Radio Station</h3>
			<ul class="">
				{stations.map((station) => (
					<li key={station.id}>
						<button class="hover:opacity-70" type="button" onClick={() => onSelect()}>
							<img
								src={station.banner}
								alt=""
								style="image-rendering: pixelated;"
							/>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default StationSelect;
