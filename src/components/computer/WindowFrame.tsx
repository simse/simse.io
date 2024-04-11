import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import type { CSSProperties } from "preact/compat";

import "./WindowFrame.scss";
import type { WindowProps } from "./types";
import WindowHeaderBackground from "@assets/window_header_background.svg";


interface WindowFrameProps extends WindowProps {
  children: ComponentChildren;
  initialPosition?: { x: number; y: number };
  initialPositionLabel?: "center";
  initialSize?: { width: number; height?: number };
}

const WindowFrame = ({
  children,
  title,
  initialPosition = { x: 0, y: 0 },
  initialPositionLabel,
  initialSize = { height: 600, width: 250 },
  onClose,
  onTouch,
  order,
}: WindowFrameProps) => {
  const [windowPositionSource, setWindowPositionSource] = useState<
    "layout" | "user"
  >(initialPositionLabel ? "layout" : "user");
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
  const [windowSize, setWindowSize] = useState(initialSize);
  const windowRef = useRef<HTMLDivElement | null>(null);

  // on initial render, calculate window position if the source is layout
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
    setOnGrabWindowPosition({ x: windowPosition!.x, y: windowPosition!.y });
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
      class="windowFrame border border-black sm:absolute shadow-window bg-[#FAF2E8]"
      style={{
        ...calculateWindowPosition(),
        '--width': `min(${windowSize.width}px, 100%)`,
        '--height': `${windowSize.height}px` || 'fit-content',
        zIndex: order * 10 + 100,
        order: order,
      }}
      onMouseDown={onTouch}
      ref={windowRef}
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
          class="ml-4 bg-[#FAF2E8] border border-black items-center justify-center flex text-transparent hover:text-black active:bg-black active:text-white opacity-0 sm:opacity-100"
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

      <div
        class="px-2 pt-2 overflow-y-auto h-full"
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
