import { useEffect, useRef, useState } from "preact/hooks";
import Sockette from "sockette";

import MuteIcon from "@components/icons/MuteIcon";
import VolumeThree from "@components/icons/VolumeThree";
import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";

interface RadioWindowProps extends WindowProps {}

const RadioWindow = (props: RadioWindowProps) => {
	const audioElementRef = useRef<HTMLAudioElement | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

	useEffect(() => {
		const ws = new Sockette("wss://radio-proxy.simse.io/currently-playing", {
			timeout: 5e3,
			maxAttempts: 10,
			onmessage: (e) => {
				setCurrentlyPlaying(e.data);
				setIsReady(true);
			},
			onclose: () => setIsReady(false),
		});

		return () => ws.close();
	}, []);

	const streamUrl = "https://radio-proxy.simse.io/stream";

	const createAudioContext = () => {
		audioContextRef.current = new AudioContext();

		const audioElement = new Audio();
		audioElement.crossOrigin = "anonymous";
		audioElement.src = streamUrl;
		audioElementRef.current = audioElement;

		audioElement.addEventListener("play", () => {
			setIsPlaying(true);
		});

		audioElement.addEventListener("pause", () => {
			setIsPlaying(false);
		});

		const audioContext = audioContextRef.current;

		const source = audioContext.createMediaElementSource(audioElement);
		const analyser = audioContext.createAnalyser();
		analyser.fftSize = 256;
		analyserRef.current = analyser;

		source.connect(analyser);
		analyser.connect(audioContext.destination);

		visualize();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: this is to run on mount
	useEffect(() => {
		createAudioContext();
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
			await audioElement
				.play()
				.catch((error) => console.error("Error playing audio:", error));
		};

		createAudioContext();
		playAudio();
	};

	const pause = () => {
		const audioElement = audioElementRef.current;
		if (!audioElement) return;

		audioElement.pause();
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

	const visualize = () => {
		if (!analyserRef.current) return;

		const analyser = analyserRef.current;
		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);

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
		let barHeight: number;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			if (i < 8) continue;

			barHeight = dataArray[i] / 2;

			canvasCtx.fillStyle = "rgb(130 125 119)";
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
						<p class="text-xl leading-4">Wonder 80's</p>
					</div>

					<button
						type="button"
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
						{isPlaying ? <VolumeThree /> : <MuteIcon />}
					</button>
				</div>

				{!isReady && <p>Connecting to station...</p>}

				{isReady && currentlyPlaying && (
					<>
						<p>Currently Playing</p>

						<div class="flex flex-col mb-4">
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
