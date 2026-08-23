import AppearanceTab from "@components/computer/windows/Settings/tabs/Appearance.tsx";
import BrushIcon from "@components/icons/BrushIcon.tsx";
import { useState } from "preact/hooks";

import type { WindowProps } from "../../types.ts";
import WindowFrame from "../../WindowFrame.tsx";

interface SettingsWindowProps extends WindowProps {}

const SettingsWindow = (props: SettingsWindowProps) => {
  const settingsCategories = [
    /*{
			id: "general",
			name: "General",
			icon: SettingsIcon,
			tabComponent: () => <div>General Settings</div>,
		},*/
    {
      id: "appearance",
      name: "Appearance",
      icon: BrushIcon,
      tabComponent: AppearanceTab,
    },
  ];

  const [selectedTabId, setSelectedTabId] = useState<string>("appearance");

  return (
    <WindowFrame
      title="System Preferences"
      initialSize={{ width: 620, height: 400 }}
      initialPosition={{ x: 20, y: 600 }}
      {...props}
    >
      <div class="flex h-full gap-4">
        <ul class="h-full w-1/3 border-r pr-2">
          {settingsCategories.map((category) => (
            <li
              key={category.id}
              class="flex cursor-pointer items-center gap-2 border-b p-2"
              onClick={() => setSelectedTabId(category.id)}
              onKeyDown={() => setSelectedTabId(category.id)}
            >
              <category.icon width={16} height={16} />
              {category.name}

              {selectedTabId === category.id ? <div class="ml-auto h-1 w-1 bg-black" /> : null}
            </li>
          ))}
        </ul>

        <div class="w-full">
          {settingsCategories.map((category) => {
            if (category.id === selectedTabId) {
              const TabComponent = category.tabComponent;
              return <TabComponent key={category.id} />;
            }
          })}
        </div>
      </div>
    </WindowFrame>
  );
};

export default SettingsWindow;
