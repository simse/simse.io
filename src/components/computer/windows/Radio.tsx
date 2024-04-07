import { useState, useRef, useEffect } from "preact/hooks";

import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";
import MuteIcon from "@components/icons/MuteIcon";
import VolumeThree from "@components/icons/VolumeThree";

interface RadioWindowProps extends WindowProps {}

const RadioWindow = (props: RadioWindowProps) => {
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [currentlyPlayingRange, setCurrentlyPlayingRange] = useState<string | null>(null);

  const streamUrl = "https://radio.sorensen.engineer/listen/simon_fm/main.aac";

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    if (!audioElementRef.current) {
      const audioElement = new Audio();
      audioElement.crossOrigin = "anonymous";
      audioElement.src = streamUrl;
      audioElementRef.current = audioElement;
    }

    const audioContext = audioContextRef.current;
    const audioElement = audioElementRef.current;

    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);

    audioElement.addEventListener("pause", () => {
      audioElement.play();
      audioElement.volume = 0;
      setIsPlaying(false);
    });

    return () => {
      audioElement.pause();
    };
  }, []);

  const play = () => {
    const playAudio = async () => {
      const audioElement = audioElementRef.current;
      if (!audioElement) return;

      const audioContext = audioContextRef.current;
      if (!audioContext) return;

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
      audioElement.volume = 1;
      await audioElement
        .play()
        .catch((error) => console.error("Error playing audio:", error));

      createAudioContext();
    };

    playAudio();
    setIsPlaying(true);
  };

  const pause = () => {
    const audioElement = audioElementRef.current;
    if (!audioElement) return;

    audioElement.volume = 0;
    setIsPlaying(false);
  };

  const ratio = 2;
  const WIDHT = 282;
  const HEIGHT = 40;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    canvasCtx.reset();

    canvasCtx.scale(ratio, ratio);
    canvasCtx.clearRect(0, 0, WIDHT, HEIGHT);
    canvasCtx.fillStyle = "rgb(0 0 0)";
    canvasCtx.fillRect(0, 0, WIDHT, HEIGHT);
  }, []);

  async function fetchRadioInfo() {
    const res = await fetch("https://radio.sorensen.engineer/api/nowplaying/simon_fm");
    const data = await res.json();

    setCurrentlyPlaying(data.now_playing.song.text);
    
    const playedAt = new Date(data.now_playing.played_at * 1000);
    const endsAt = new Date(data.now_playing.played_at * 1000 + data.now_playing.duration * 1000);

    setCurrentlyPlayingRange(`${playedAt.toLocaleTimeString("en-UK", {
      hour: "numeric",
      minute: "numeric",
    })} - ${endsAt.toLocaleTimeString("en-UK", {
      hour: "numeric",
      minute: "numeric",
    })}`);
    setIsReady(true);
  }

  useEffect(() => {
    fetchRadioInfo();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRadioInfo();
    }, 3000);

    return () => clearInterval(interval);
  });

  const createAudioContext = () => {
    // check if SSR
    if (typeof window === "undefined") return;

    const audio = audioElementRef.current;
    if (!audio) return;

    // if analyser already exists, return
    if (analyserRef.current) return;

    // @ts-expect-error
    const stream = audio.captureStream();

    const audioCtx = audioContextRef.current;
    if (!audioCtx) return;

    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;

    analyser.smoothingTimeConstant = 0.9;

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
    const barSpacing =
      (WIDHT - (bufferLength - 8) * barWidth) / (bufferLength - 1) + 1.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      if (i < 8) continue;

      barHeight = dataArray[i] / 2;

      canvasCtx.fillStyle = `rgb(130 125 119)`;
      canvasCtx.fillRect(x, HEIGHT - barHeight / 3, barWidth, barHeight);

      x += barWidth + barSpacing;
    }

    requestAnimationFrame(visualize);
  };

  return (
    <WindowFrame
      title="Radio"
      initialSize={{ width: 300, height: 250 }}
      initialPosition={{ x: 350, y: 450 }}
      {...props}
    >
      {true ? (
        <>
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

          <div class="mt-2 pb-3 mb-1 border-b border-black flex items-center justify-between">
            <div>
              <span>Current Station</span>
              <p class="text-xl leading-4">
                Simon FM 98.3
              </p>
            </div>

            <button
              class="border border-black rounded-sm h-11 w-11 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center"
              onClick={() => {
                if (isPlaying) {
                  pause();
                } else {
                  play();
                }
              }}
              disabled={!isReady}
            >
              {isPlaying ? <VolumeThree /> : (
                <MuteIcon />
              )}
            </button>
          </div>

          {!isReady && (
            <p>Connecting to station...</p>
          )}

          {(isReady && currentlyPlaying && currentlyPlayingRange) && (
            <>
              <p>Currently Playing</p>

              <div class="flex flex-col mb-4">
                <span class="opacity-70">
                  {currentlyPlayingRange}
                </span>

                <span class="text-2xl leading-5" dangerouslySetInnerHTML={{
                  __html: currentlyPlaying
                }} />
              </div>
            </>
          )}
        </>
      ) : (
        <p>Nothing playing right now</p>
      )}
    </WindowFrame>
  );
};

export default RadioWindow;
