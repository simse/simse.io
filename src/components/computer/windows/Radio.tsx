import { useState, useRef, useEffect } from "preact/hooks";

import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";

interface PlayItem {
  starts: string;
  ends: string;
  type: string;
  name: string;
  metadata: {
    id: number;
    mime: string;
    artist_name: string;
    track_title: string;
    album_title: string;
    year: string;
    artwork_url: string;
  }
}

interface Show {
  start_timestamp: string;
  end_timestamp: string;
  starts: string;
  ends: string;
  name: string;
  description: string;
  id: number;
}

interface LibreTimeResponse {
  env: 'production';
  schedulerTime: string;
  timezone: string;
  timezoneOffset: number;
  currentShow: Show[];
  nextShow: Show[];
  current: PlayItem;
  next: PlayItem;
}

interface RadioWindowProps extends WindowProps {}

const RadioWindow = (props: RadioWindowProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [radioInfo, setRadioInfo] = useState<LibreTimeResponse | null>(null);

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
    const res = await fetch("https://radio.sorensen.engineer/api/live-info");
    const data = await res.json();

    setRadioInfo(data);
  }

  useEffect(() => {
    fetchRadioInfo();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRadioInfo();
    }, 6000);

    return () => clearInterval(interval);
  })

  const createAudioContext = () => {
    // check if SSR
    if (typeof window === "undefined") return;

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
    const barSpacing = (WIDHT - (bufferLength - 8) * barWidth) / (bufferLength - 1) + 1.5;
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

  const formatShowName = (show: Show | undefined): string => {
    if (!show) return "Off air";

    return show.name;
  }

  const formatShowRange = (show: Show | undefined): string => {
    if (!show) return "";

    const start = new Date(show.starts);
    const end = new Date(show.ends);

    return `${start.toLocaleTimeString("en-UK", {
      hour: "numeric",
      minute: "numeric",
    })} - ${end.toLocaleTimeString("en-UK", {
      hour: "numeric",
      minute: "numeric",
    })}`;
  }

  const formatShowDate = (date?: string): string => {
    if (!date) return "No show scheduled";

    const d = new Date(date);

    // if show is today, return time only
    if (d.toDateString() === new Date().toDateString()) {
      return d.toLocaleTimeString("en-UK", {
        hour: "numeric",
        minute: "numeric",
      });
    }

    d.setFullYear(1988);
    
    return d.toLocaleString("en-UK", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  const formatDate = (date?: string): string => {
    if (!date) return "No show scheduled";

    // parse date and adjust for timezone which is UTC
    const d = new Date(date);
    d.setHours(d.getHours() + 1);

    return d.toLocaleTimeString("en-UK", {
      hour: "numeric",
      minute: "numeric",
    });
  }

  const formatTitle = (item: PlayItem | undefined): string => {
    if (!item) return "No show scheduled";

    if (item.metadata.artist_name === "ADVERT") {
      return item.metadata.track_title + " [ADVERT]";
    }

    return item.name;
  }

  return (
    <WindowFrame
      title="Radio"
      initialSize={{ width: 300, height: 350 }}
      initialPosition={{ x: 400, y: 700 }}
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
              <span>Currently playing</span>
              <p class="text-xl leading-4">{formatShowName(radioInfo?.currentShow[0])}</p>
              <p>{formatShowRange(radioInfo?.currentShow[0])}</p>
            </div>

            <button
              class="border border-black rounded-sm h-11 w-11"
              onClick={() => {
                const audio = audioRef.current;
                if (!audio) return;

                createAudioContext();

                // if not playing yet, create audio context
                if (audio.paused) {
                  
                  audio.play();
                  return;
                } else {
                  audio.pause();
                }
              }}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
          </div>

          {radioInfo?.nextShow && !radioInfo.current && <>
            <p>Upcoming Programming</p>

            <div class="flex flex-col mb-2">
              <span class="opacity-70">{formatShowDate(radioInfo.nextShow[0].start_timestamp)}</span>

              <span class="text-2xl leading-5">{radioInfo.nextShow[0].name}</span>
            </div>
          </>}

          {radioInfo?.current && 
            <>
              <p>Schedule</p>

              <div class="flex flex-col mb-2">
                <span class="opacity-70">{formatDate(radioInfo.current.starts)}</span>

                <span class="text-2xl leading-5" dangerouslySetInnerHTML={{
                  __html: formatTitle(radioInfo.current)
                }} />
              </div>

              {radioInfo.next && <div class="flex flex-col mb-2 opacity-50">
                <span class="">{formatDate(radioInfo.next.starts)}</span>

                <span class="text-2xl leading-5" dangerouslySetInnerHTML={{
                  __html: formatTitle(radioInfo.next)
                }} />
              </div>}
          </>}


          <audio
            ref={audioRef}
            crossOrigin={"anonymous"}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="https://radio.sorensen.engineer:8443/main-low" type="audio/ogg" />
          </audio>
        </>
      ) : (
        <p>Nothing playing right now</p>
      )}
    </WindowFrame>
  );
};

export default RadioWindow;
