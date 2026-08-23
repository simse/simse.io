import { useEffect, useRef } from "preact/hooks";

import type { WindowProps } from "../types";
import WindowFrame from "../WindowFrame";

interface PaintWindowProps extends WindowProps {}

const PaintWindow = (props: PaintWindowProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const displayWidth = 800;
  const displayHeight = 600;

  // Initialize canvas for HiDPI + set drawing styles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    //const dpr = window.devicePixelRatio || 1;
    const dpr = 0.25;
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    ctx.scale(dpr, dpr);

    // Base drawing style (mirrors the provided snippet)
    ctx.strokeStyle = "hsl(208, 100%, 43%)";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 0.5; // a bit thicker than 1 for visibility
    /*if ("filter" in ctx) {
			// filter not supported everywhere; guard it
			ctx.filter = "blur(0.5px)";
		}*/
  }, []);

  const getRelativePos = (e: PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: PointerEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    canvas.setPointerCapture?.(e.pointerId);
    isDrawingRef.current = true;
    const { x, y } = getRelativePos(e);
    lastPointRef.current = { x, y };
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.stroke();
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { x, y } = getRelativePos(e);
    const last = lastPointRef.current;
    if (!last) {
      lastPointRef.current = { x, y };
      return;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPointRef.current = { x, y };
  };

  const endStroke = (e?: PointerEvent) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.closePath();
    }
    lastPointRef.current = null;
    if (e && canvasRef.current) {
      try {
        canvasRef.current.releasePointerCapture?.(e.pointerId);
      } catch {}
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0); // ensure full clear even if transformed
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const setLineWidth = (width: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.lineWidth = width;
  };

  return (
    <WindowFrame
      title="Paint"
      initialSize={{ width: 818 }}
      initialPosition={{ x: 75, y: 300 }}
      {...props}
    >
      <div class="mb-4 flex w-full items-center gap-2">
        <button type="button" onClick={clearCanvas} className="border px-2 py-1">
          Clear
        </button>

        <button
          type="button"
          onClick={() => setLineWidth(1)}
          className="flex h-8 w-8 items-center justify-center border"
        >
          <div class="h-1 w-1 bg-black" />
        </button>

        <button
          type="button"
          onClick={() => setLineWidth(4)}
          className="flex h-8 w-8 items-center justify-center border"
        >
          <div className="h-2 w-2 bg-black" />
        </button>

        <button
          type="button"
          onClick={() => setLineWidth(6)}
          className="flex h-8 w-8 items-center justify-center border"
        >
          <div className="h-3 w-3 bg-black" />
        </button>

        <button
          type="button"
          onClick={() => setLineWidth(8)}
          className="flex h-8 w-8 items-center justify-center border"
        >
          <div className="h-4 w-4 bg-black" />
        </button>

        <p class="ml-auto">PAINT IS WORK IN PROGRESS</p>
      </div>

      <canvas
        ref={canvasRef}
        class="mb-4 touch-none border bg-white select-none"
        style={{
          imageRendering: "pixelated",
        }}
        // width / height set via effect for HiDPI; style kept minimal here
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endStroke}
        onPointerLeave={endStroke}
      />
    </WindowFrame>
  );
};

export default PaintWindow;
