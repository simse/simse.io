import { useState } from "preact/hooks";
import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";

interface ProjectsWindowProps extends WindowProps {}

const ProjectsWindow = (props: ProjectsWindowProps) => {
	const projects = [
		{
			name: "simonOS",
			description: "My personal website designed to look like an old OS",
		},
		{
			name: "faster-graphql-codegen",
			description: "Prototype reimplementation of graphql-codegen in Go",
		},
	];

	const [selectedProjectName, setSelectedProjectName] = useState(
		projects[0].name,
	);

    const selectedProject = projects.find((project) => project.name === selectedProjectName);

	return (
		<WindowFrame
			title="Projects"
			initialSize={{ width: 800, height: 500 }}
			initialPosition={{ x: 270, y: 400 }}
			{...props}
		>
			<div class="flex gap-4 h-full">
				<ul class="w-1/3 border-r overflow-y-scroll scrollbar-thin">
					{projects.map((project) => (
						<li
							key={project.name}
							class={`cursor-pointer border-b px-2 py-1 ${selectedProjectName === project.name ? "bg-black text-white" : ""}`}
							onClick={() => setSelectedProjectName(project.name)}
							onKeyDown={() => setSelectedProjectName(project.name)}
						>
							<h2 class="text-xl">{project.name}</h2>
                            <p class="font-sans-alt text-sm pb-1">{project.description}</p>
						</li>
					))}
				</ul>

                {selectedProject ? (
                    <div class="flex-1">
                        <header class="border-b pb-2 mb-2">
                            <h1 class="font-logo text-xl">{selectedProject.name}</h1>
                            <p>{selectedProject.description}</p>

                            <ul>
                                <li></li>
                            </ul>
                        </header>
                    </div>
                ) : null}
			</div>
		</WindowFrame>
	);
};

export default ProjectsWindow;
