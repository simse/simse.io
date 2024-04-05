import type { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";

import type { WindowProps } from "./types";
import WindowHeaderBackground from "@assets/window_header_background.svg";

interface WindowFrameProps extends WindowProps {
  children: ComponentChildren;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

const WindowFrame = ({
  children,
  title,
  initialPosition = { x: 50, y: 50 },
  initialSize = { height: 600, width: 250 },
  onClose,
  onTouch,
  active,
}: WindowFrameProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [windowPosition, setWindowPosition] = useState(initialPosition);
  const [onGrabCursorPosition, setOnGrabCursorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [onGrabWindowPosition, setOnGrabWindowPosition] = useState({
    x: 0,
    y: 0,
  });
  const [windowSize, setWindowSize] = useState(initialSize);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, [isDragging]);

  const handleMouseDown = (event: MouseEvent) => {
    setOnGrabCursorPosition({ x: event.clientX, y: event.clientY });
    setOnGrabWindowPosition({ x: windowPosition.x, y: windowPosition.y });
    setIsDragging(true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const deltaX = event.clientX - onGrabCursorPosition.x;
    const deltaY = event.clientY - onGrabCursorPosition.y;

    const newPosition = {
      x: onGrabWindowPosition.x + deltaX,
      y: onGrabWindowPosition.y + deltaY,
    };

    if (newPosition.x < 0) newPosition.x = 0;
    if (newPosition.y < 0) newPosition.y = 0;

    setWindowPosition(newPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      class="border border-black absolute shadow-window bg-[#FAF2E8]"
      style={{
        top: windowPosition.y,
        left: windowPosition.x,
        width: windowSize.width,
        height: windowSize.height,
        zIndex: active ? 1 : 0,
      }}
      onMouseDown={onTouch}
    >
      <header
        class="text-center flex justify-between select-none items-center sticky"
        style={{
          backgroundImage: `url(${WindowHeaderBackground.src})`,
          backgroundSize: "auto 100%",
          backgroundRepeat: "repeat-x",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
      >
        <div class="px-1 py-2 bg-[#FAF2E8]" />

        <button 
          class="ml-4 bg-[#FAF2E8] border border-black items-center flex justify-center text-transparent hover:text-black active:bg-black active:text-white"
          style={{
            width: 13,
            height: 13,
            marginTop: -1,
            paddingLeft: 2,
            paddingBottom: 1,
          }}
          onClick={onClose}
        >
          x
        </button>

        <span class="px-2 bg-[#FAF2E8] text-lg mx-auto">{title}</span>

        <div style={{ width: 13 + 16 }} />

        <div class="px-1 py-2 bg-[#FAF2E8]" />
      </header>

      <div class="px-2 pt-2 overflow-y-auto" style={{
        maxHeight: 'calc(100% - 36px)'
      }}>{children}</div>
    </div>
  );
};

export default WindowFrame;