import { useContext, useEffect, useRef, useState } from "preact/hooks";

import MuteIcon from "@components/icons/MuteIcon";
import NextArrow from "@components/icons/NextArrow.tsx";
import VolumeThree from "@components/icons/VolumeThree";
import { ReferenceDataContext } from "../../../context.ts";
import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";

interface RadioWindowProps extends WindowProps {}

const RadioWindow = (props: RadioWindowProps) => {
	const audioElementRef = useRef<HTMLAudioElement | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationFrameRef = useRef<number | null>(null);

	const { music } = useContext(ReferenceDataContext);
	const [songIndex, setSongIndex] = useState(0);
	const song = music[songIndex].data;

	const [isPlaying, setIsPlaying] = useState(false);
	const [isReady, setIsReady] = useState(true);
	const currentlyPlaying = `${song.artist} - ${song.title}`;

	const streamUrl = `/songs/${song.url}`;

	const nextSong = () => {
		setSongIndex((index) => (index + 1) % music.length);
	};

	useEffect(() => {
		if (!audioElementRef.current) {
			return;
		}

		audioElementRef.current.src = streamUrl;

		if (!isPlaying) return;
		play();
	}, [streamUrl, isPlaying]);

	const createAudioGraph = () => {
		if (audioContextRef.current) return; // guard (already created)

		const ctx = new AudioContext();
		audioContextRef.current = ctx;

		const audioElement = new Audio();
		audioElement.crossOrigin = "anonymous";
		audioElement.src = streamUrl;
		audioElement.loop = true;
		audioElementRef.current = audioElement;

		audioElement.addEventListener("play", () => setIsPlaying(true));
		audioElement.addEventListener("pause", () => setIsPlaying(false));
		//audioElement.addEventListener("ended", () => set);

		const source = ctx.createMediaElementSource(audioElement);
		sourceRef.current = source;

		const analyser = ctx.createAnalyser();
		analyser.fftSize = 256;
		analyser.minDecibels = -90;
		analyser.maxDecibels = -10;
		analyser.smoothingTimeConstant = 0.85;
		analyserRef.current = analyser;

		source.connect(analyser);
		analyser.connect(ctx.destination);

		visualize();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: run on mount and unmount only
	useEffect(() => {
		createAudioGraph();

		return () => {
			// cleanup on unmount
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			const audio = audioElementRef.current;
			if (audio) {
				audio.pause();
				audio.removeAttribute("src");
				try {
					audio.load();
				} catch {}
			}
			sourceRef.current?.disconnect();
			analyserRef.current?.disconnect();
			if (audioContextRef.current) {
				// close releases hardware; ignore errors if already closed
				audioContextRef.current.close().catch(() => {});
			}
			audioElementRef.current = null;
			sourceRef.current = null;
			analyserRef.current = null;
			audioContextRef.current = null;
		};
	}, []);

	const play = async () => {
		createAudioGraph(); // ensure graph exists
		const audioElement = audioElementRef.current;
		const audioContext = audioContextRef.current;
		if (!audioElement || !audioContext) return;

		if (audioContext.state === "suspended") {
			await audioContext.resume();
		}
		audioElement.volume = 1;
		await audioElement
			.play()
			.catch((e) => console.error("Error playing audio:", e));
	};

	const pause = () => {
		audioElementRef.current?.pause();
	};

	const ratio = 2;
	const WIDHT = 282;
	const HEIGHT = 40;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.reset();
		ctx.scale(ratio, ratio);
		ctx.clearRect(0, 0, WIDHT, HEIGHT);
		ctx.fillStyle = "rgb(0 0 0)";
		ctx.fillRect(0, 0, WIDHT, HEIGHT);
	}, []);

	const visualize = () => {
		const analyser = analyserRef.current;
		if (!analyser) return;

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		analyser.getByteFrequencyData(dataArray);

		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		ctx.clearRect(0, 0, WIDHT, HEIGHT);
		ctx.fillStyle = "rgb(0 0 0)";
		ctx.fillRect(0, 0, WIDHT, HEIGHT);

		const barWidth = 2;
		const barSpacing =
			(WIDHT - (bufferLength - 8) * barWidth) / (bufferLength - 1) + 1.5;

		let x = 0;
		for (let i = 0; i < bufferLength; i++) {
			if (i < 8) continue;
			const barHeight = dataArray[i] / 2;
			ctx.fillStyle = "rgb(130 125 119)";
			ctx.fillRect(x, HEIGHT - barHeight / 3, barWidth, barHeight);
			x += barWidth + barSpacing;
		}

		animationFrameRef.current = requestAnimationFrame(visualize);
	};

	return (
		<WindowFrame
			title="Radio"
			initialSize={{ width: 300, height: 210 }}
			initialPosition={{ x: 350, y: 450 }}
			{...props}
		>
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
						<p class="text-xl leading-4">80s Music</p>
					</div>

					<button
						type="button"
						class="ml-auto mr-2 border border-black rounded-sm h-11 w-11 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center hover:cursor-pointer"
						onClick={() => {
							if (isPlaying) pause();
							else play();
						}}
						disabled={!isReady}
					>
						{isPlaying ? <VolumeThree /> : <MuteIcon />}
					</button>

					<button
						type="button"
						class="mt-auto border border-black rounded-sm h-8 w-8 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center hover:cursor-pointer"
						onClick={() => nextSong()}
					>
						<NextArrow height={16} width={16} />
					</button>
				</div>

				{!isReady && <p>Connecting to station...</p>}

				{isReady && currentlyPlaying && (
					<>
						<p>Currently Playing</p>
						<div class="flex flex-col">
							<div class="w-[282px] overflow-hidden">
								<span
									class={`text-2xl leading-5 whitespace-nowrap inline-flex ${
										currentlyPlaying.length > 25 ? "animate-bounce-marquee" : ""
									}`}
									style={{
										animationDuration: `${currentlyPlaying.length * 0.4}s`,
									}}
								>
									{currentlyPlaying}
								</span>
							</div>
						</div>
					</>
				)}
			</>
		</WindowFrame>
	);
};

export default RadioWindow;
