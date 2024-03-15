import { useRef, useState, useEffect, useLayoutEffect } from "preact/compat";
import { useDebounce } from 'use-debounce-preact';

import happyMemoji from "@assets/memojies/happy.png";
import cheekyMemoji from "@assets/memojies/cheeky.png";
import ponderingMemoji from "@assets/memojies/pondering.png";
import relievedMemoji from "@assets/memojies/relieved.png";
import winkMemoji from "@assets/memojies/wink.png";
import surprisedMemoji from "@assets/memojies/surprised.png";

/*
import happyMemoji from "@assets/shapes/red.png";
import cheekyMemoji from "@assets/shapes/yellow.png";
import ponderingMemoji from "@assets/shapes/purple.png";
import relievedMemoji from "@assets/shapes/blue.png";
import winkMemoji from "@assets/shapes/orange.png";
import surprisedMemoji from "@assets/shapes/green.png";
*/

interface Particle {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  rotation: number;
  image?: string;
}

const ParticleHeader = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [debouncedDimensions] = useDebounce(dimensions, 50);

  const handleResize = () => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: 600 - 100,
      });
    }
  };

  useLayoutEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const calculateParticleCount = () => {
    const particleCount = Math.floor(
      (dimensions.width * dimensions.height) / 10000
    );
    return particleCount / 4;
  };

  const getRandomCoordinate = (dimensions: {
    width: number;
    height: number;
  }): {
    x: number;
    y: number;
  } => {
    const forbiddenWidthZoneStart = dimensions.width * 0.3;
    const forbiddenWidthZoneEnd = dimensions.width * 0.7;

    const forbiddenHeightZoneStart = dimensions.height * 0.3;
    const forbiddenHeightZoneEnd = dimensions.height * 0.7;

    const randomX = Math.random() * dimensions.width;
    const randomY = Math.random() * dimensions.height;

    if (
      randomX > forbiddenWidthZoneStart &&
      randomX < forbiddenWidthZoneEnd
    ) {
      return getRandomCoordinate(dimensions);
    }

    return { x: randomX, y: randomY };
  };

  // determine scale based on close to forbidden zone
  // closer is smaller, range is 0.2 - 1
  const getScale = (x: number, y: number) => {
    const forbiddenWidthZoneStart = dimensions.width * 0.3;
    const forbiddenWidthZoneEnd = dimensions.width * 0.7;

    /*const forbiddenHeightZoneStart = dimensions.height * 0.4;
    const forbiddenHeightZoneEnd = dimensions.height * 0.6;*/

    const distanceToForbiddenZoneX = Math.min(
      Math.abs(x - forbiddenWidthZoneStart),
      Math.abs(x - forbiddenWidthZoneEnd)
    );

    /*const distanceToForbiddenZoneY = Math.min(
      Math.abs(y - forbiddenHeightZoneStart),
      Math.abs(y - forbiddenHeightZoneEnd)
    );*/

    const distanceToForbiddenZone = Math.min(
      distanceToForbiddenZoneX,
      // distanceToForbiddenZoneY
    );

    return 1 + distanceToForbiddenZone / (dimensions.width / 2);
  };

  const getOpacity = (x: number, y: number) => {
    const forbiddenWidthZoneStart = dimensions.width * 0.3;
    const forbiddenWidthZoneEnd = dimensions.width * 0.7;

    /*const forbiddenHeightZoneStart = dimensions.height * 0.4;
    const forbiddenHeightZoneEnd = dimensions.height * 0.6;*/

    const distanceToForbiddenZoneX = Math.min(
      Math.abs(x - forbiddenWidthZoneStart),
      Math.abs(x - forbiddenWidthZoneEnd)
    );

   /* const distanceToForbiddenZoneY = Math.min(
      Math.abs(y - forbiddenHeightZoneStart),
      Math.abs(y - forbiddenHeightZoneEnd)
    );*/

    const distanceToForbiddenZone = Math.min(
      distanceToForbiddenZoneX,
      // distanceToForbiddenZoneY
    );

    return 1 -  distanceToForbiddenZone / (dimensions.width / 2);
  };

  const randomImage = () => {
    const images = [
      happyMemoji,
      cheekyMemoji,
      ponderingMemoji,
      relievedMemoji,
      winkMemoji,
      surprisedMemoji,
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  useEffect(() => {
    let particlesToAdd: Particle[] = [];

    for (let i = 0; i < calculateParticleCount(); i++) {
      const { x, y } = getRandomCoordinate(debouncedDimensions);

      // if coordinates are within 20 pixels of any other particle, skip
      if (
        particlesToAdd.some(
          (particle) =>
            Math.abs(particle.x - x) < 60 && Math.abs(particle.y - y) < 60
        )
      ) {
        continue;
      }

      particlesToAdd.push({
        x,
        y,
        scale: getScale(x, y),
        opacity: getOpacity(x, y),
        rotation: 0,
        image: randomImage().src,
      });
    }

    setParticles(particlesToAdd);
  }, [debouncedDimensions]);

  return (
    <div class="w-full h-[600px] relative overflow-clip" ref={targetRef}>
      {particles.map((particle, index) => (
        <img
          key={dimensions.width * index}
          src={particle.image}
          alt=""
          aria-hidden="true"
          role="presentation"
          class="absolute z-0 animate-fadeIn pointer-events-none"
          style={{
            right: particle.x,
            top: particle.y,
            height: "50px",
            width: "50px",
            transform: `scale(${particle.scale})`,
            opacity: particle.opacity,
            '--opacity': particle.opacity,
            filter: `blur(${1 - particle.opacity}px)`,
            animationDelay: `${index * 0.25}s`,
            animationDuration: '2s',
            animationFillMode: 'both',
          }}
        />
      ))}
    </div>
  );
};

export default ParticleHeader;
