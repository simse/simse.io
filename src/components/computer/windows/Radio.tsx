import { useState, useRef, useEffect } from "preact/hooks";


import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";
import ClownRadio from "@assets/radio/clown_fm.mp3";


interface RadioWindowProps extends WindowProps {}

const RadioWindow = (props: RadioWindowProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ratio, setRatio] = useState(2);

  useEffect(() => {
    // setRatio(window.devicePixelRatio);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;
    canvasCtx.scale(ratio, ratio);
    canvasCtx.clearRect(0, 0, WIDHT, HEIGHT);
    canvasCtx.fillStyle = "rgb(0 0 0)";
    canvasCtx.fillRect(0, 0, WIDHT, HEIGHT);
  }, []);

  const WIDHT = 282;
  const HEIGHT = 40;
  
  const createAudioContext = () => {
    // check if SSR
    if (typeof window === 'undefined') return;

    const audio = audioRef.current;
    if (!audio) return;

    // if analyser already exists, return
    if (analyserRef.current) return;

    // @ts-expect-error
    const stream = audio.captureStream();

    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 128;
    
    analyser.smoothingTimeConstant = 0.85;

    analyserRef.current = analyser;

    visualize();
  };

  const visualize = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // console.log(dataArray);

    analyser.getByteFrequencyData(dataArray);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    canvasCtx.clearRect(0, 0, WIDHT, HEIGHT);
    canvasCtx.fillStyle = "rgb(0 0 0)";
    canvasCtx.fillRect(0, 0, WIDHT, HEIGHT);



    const barWidth = 2;
    const barSpacing = (WIDHT - bufferLength * barWidth) / (bufferLength - 1);
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 2;
    
      canvasCtx.fillStyle = `rgb(130 125 119)`;
      canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);
    
      x += barWidth + barSpacing;
    }

    requestAnimationFrame(visualize);
  };

  return (
    <WindowFrame 
      title="Radio"
      initialSize={{ width: 300, height: 350 }}
      initialPosition={{ x: 400, y: 700 }}
      {...props}
    >
      <canvas 
        ref={canvasRef} 
        width={WIDHT * ratio} 
        height={HEIGHT * ratio}
        style={{
          width: `${WIDHT}px`,
          height: `${HEIGHT}px`,
          imageRendering: "pixelated",
        }}
      />

      <div class="mt-2 pb-2 mb-2 border-b border-black flex items-center justify-between">
        <div>
          <span class="text-lg">Currently playing</span>
          <p class="text-2xl leading-4">Clown FM 98.2</p>
        </div>

        <button 
          class="border border-black rounded-sm h-11 w-11"
          onClick={() => audioRef.current?.play()}
        >
          ▶
        </button>
      </div>

      <div class="flex flex-col">
        <span class="opacity-70 mb-2">11:00am</span>

        <span class="text-2xl leading-3">Clown FM Intro</span>
        <span class="text-lg">Bozo the Clown</span>
      </div>

      <audio ref={audioRef} onPlay={() => {
        createAudioContext();
      }}>
        <source src={ClownRadio} type="audio/mpeg" />
      </audio>
    </WindowFrame>
  );
};

export default RadioWindow;
