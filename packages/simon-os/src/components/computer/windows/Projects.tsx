import { useState } from "preact/hooks";
import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";

interface ProjectsWindowProps extends WindowProps {}

const ProjectsWindow = (props: ProjectsWindowProps) => {
	const projects = [
		{
			name: "simonOS",
			description: "My personal website designed to look like an old OS.",
		},
		{
			name: "faster-graphql-codegen",
			description: "My personal website designed to look like an old OS.",
		},
	];

	const [selectedProjectName, setSelectedProjectName] = useState(
		projects[0].name,
	);

	return (
		<WindowFrame
			title="Projects"
			initialSize={{ width: 800, height: 500 }}
			initialPosition={{ x: 270, y: 400 }}
			{...props}
		>
			<div class="flex gap-4 h-full">
				<ul class="w-1/3 border-r">
					{projects.map((project) => (
						<li
							key={project.name}
							class={`cursor-pointer border-b px-2 py-1 ${selectedProjectName === project.name ? "bg-black text-white" : ""}`}
							onClick={() => setSelectedProjectName(project.name)}
							onKeyDown={() => setSelectedProjectName(project.name)}
						>
							<h2 class="text-xl">{project.name}</h2>
						</li>
					))}
				</ul>

				<div class="flex-1">
					<h1 class="font-logo text-xl">{selectedProjectName}</h1>
				</div>
			</div>
		</WindowFrame>
	);
};

export default ProjectsWindow;
