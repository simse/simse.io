import { useState } from "preact/hooks";

import type { WindowProps } from "../types";
import WindowFrame from "../WindowFrame";

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

  const [selectedProjectName, setSelectedProjectName] = useState(projects[0].name);

  const selectedProject = projects.find((project) => project.name === selectedProjectName);

  return (
    <WindowFrame
      title="Projects"
      initialSize={{ width: 800, height: 500 }}
      initialPosition={{ x: 270, y: 400 }}
      {...props}
    >
      <div class="flex h-full gap-4">
        <ul class="w-1/3 scrollbar-thin overflow-y-scroll border-r">
          {projects.map((project) => (
            <li
              key={project.name}
              class={`cursor-pointer border-b px-2 py-1 ${selectedProjectName === project.name ? "bg-black text-white" : ""}`}
              onClick={() => setSelectedProjectName(project.name)}
              onKeyDown={() => setSelectedProjectName(project.name)}
            >
              <h2 class="text-xl">{project.name}</h2>
              <p class="font-os-alt pb-1 text-sm">{project.description}</p>
            </li>
          ))}
        </ul>

        {selectedProject ? (
          <div class="flex-1">
            <header class="mb-2 border-b pb-2">
              <h1 class="font-os-logo text-xl">{selectedProject.name}</h1>
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
