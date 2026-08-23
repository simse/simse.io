import WindowHeaderBackground from "@assets/window_header_background.svg";
import type { ComponentChildren } from "preact";
import type { CSSProperties } from "preact/compat";

import "./WindowFrame.css";
import { useEffect, useRef, useState } from "preact/hooks";

import type { WindowProps } from "./types";

interface WindowFrameProps extends WindowProps {
  children: ComponentChildren;
  initialPosition?: { x: number; y: number };
  initialPositionLabel?: "center";
  initialSize?: { width: number; height?: number };
}

const WindowFrame = ({
  children,
  id,
  title,
  initialPosition = { x: 0, y: 0 },
  initialPositionLabel,
  initialSize = { height: 600, width: 250 },
  onClose,
  onTouch,
  order,
}: WindowFrameProps) => {
  const [windowPositionSource, setWindowPositionSource] = useState<"layout" | "user">(
    initialPositionLabel ? "layout" : "user",
  );
  const [isDragging, setIsDragging] = useState(false);
  const [windowPosition, setWindowPosition] = useState<{
    x: number;
    y: number;
  }>(initialPosition);
  const [onGrabCursorPosition, setOnGrabCursorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [onGrabWindowPosition, setOnGrabWindowPosition] = useState({
    x: 0,
    y: 0,
  });
  const [windowSize] = useState(initialSize);
  const windowRef = useRef<HTMLDivElement | null>(null);

  // on initial render, calculate window position if the source is layout
  // biome-ignore lint/correctness/useExhaustiveDependencies: this is to run on mount
  useEffect(() => {
    if (windowPositionSource === "layout") {
      const layoutPosition = windowRef.current?.getBoundingClientRect();
      if (layoutPosition) {
        setWindowPosition({
          x: layoutPosition.left,
          y: layoutPosition.top - 25,
        });
        setWindowPositionSource("user");
      }
    }
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, [isDragging]);

  const handleMouseDown = (event: MouseEvent) => {
    setOnGrabCursorPosition({ x: event.clientX, y: event.clientY });
    setOnGrabWindowPosition({ x: windowPosition?.x, y: windowPosition?.y });
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
    // -1 is to account for the topbar border
    if (newPosition.y < -1) newPosition.y = -1;

    setWindowPosition(newPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const calculateWindowPosition = (): CSSProperties => {
    if (windowPositionSource === "layout") {
      if (initialPositionLabel === "center") {
        return {
          left: `calc(50% - ${windowSize.width / 2}px)`,
          top: windowPosition.y,
        };
      }
    }

    return {
      top: windowPosition.y,
      left: windowPosition.x,
    };
  };

  return (
    <div
      class="windowFrame shadow-os-window border border-black bg-[#FAF2E8] sm:absolute"
      style={{
        ...calculateWindowPosition(),
        "--width": `min(${windowSize.width}px, 100%)`,
        "--height": windowSize.height === undefined ? "fit-content" : `${windowSize.height}px`,
        zIndex: order * 10 + 100,
        order: order,
      }}
      onMouseDown={onTouch}
      ref={windowRef}
      id={id}
    >
      <header
        class="sticky flex items-center justify-between text-center select-none"
        style={{
          backgroundImage: `url(${WindowHeaderBackground.src})`,
          backgroundSize: "auto 100%",
          backgroundRepeat: "repeat-x",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
      >
        <div class="bg-[#FAF2E8] px-1 py-2" />

        <button
          class="ml-4 flex items-center justify-center border border-black bg-[#FAF2E8] text-transparent opacity-0 hover:cursor-pointer hover:text-black active:bg-black active:text-white sm:opacity-100"
          style={{
            width: 13,
            height: 13,
            marginTop: -1,
            paddingLeft: 2,
            paddingBottom: 1,
          }}
          onClick={onClose}
          type="button"
        >
          x
        </button>

        <span class="mx-auto bg-[#FAF2E8] px-2 text-lg">{title}</span>

        <div style={{ width: 13 + 16 }} />

        <div class="bg-[#FAF2E8] px-1 py-2" />
      </header>

      <div
        class="h-full scrollbar-thin overflow-y-auto px-2 pt-2"
        style={{
          maxHeight: "calc(100% - 36px)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default WindowFrame;
