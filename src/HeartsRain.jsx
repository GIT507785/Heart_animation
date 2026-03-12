import React from "react";
import { useEffect, useRef, useState } from "react";

import haseb1 from './assets/haseb.jpg'
import haseb2 from './assets/haseb2.avif'
import haseb3 from './assets/haseb3.avif'
import haseb5 from './assets/haseb5.jpg'
import haseb4 from './assets/haseb4.avif'


export default function HeartsRain() {

  const canvasRef = useRef(null);

  const [stage, setStage] = useState("countdown");
  const [count, setCount] = useState(3);
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    haseb1,
    haseb2,
    haseb3,
    haseb4,
    haseb5
  ];

  /* -------- HEART MATRIX BACKGROUND -------- */

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = "❤";
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    function draw() {

      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ff2d55";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {

        ctx.fillText(hearts, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;

      }
    }

    const interval = setInterval(draw, 33);

    return () => clearInterval(interval);

  }, []);

  /* -------- COUNTDOWN -------- */

  useEffect(() => {

    if (stage !== "countdown") return;

    const timer = setInterval(() => {

      setCount((prev) => {

        if (prev === 1) {

          clearInterval(timer);

          setStage("birthday");

          setTimeout(() => {
            setStage("images");
          }, 4000);

          return 0;

        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [stage]);

  /* -------- IMAGE SLIDER -------- */

  useEffect(() => {

    if (stage !== "images") return;

    const slider = setInterval(() => {

      setImageIndex((prev) => (prev + 1) % images.length);

    }, 3000);

    return () => clearInterval(slider);

  }, [stage]);

  return (

    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">

      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full bg-black"
      />

      {/* COUNTDOWN */}

      {stage === "countdown" && (
        <h1 className="text-[150px] text-white font-bold z-10 animate-pulse">
          {count}
        </h1>
      )}

      {/* HAPPY BIRTHDAY */}

      {stage === "birthday" && (
        <h1 className="text-6xl text-pink-400 font-bold z-10 animate-bounce text-center">
          🎉 Happy Birthday Ali 🎂
        </h1>
      )}

      {/* IMAGES */}

      {/* IMAGES */}

{stage === "images" && (
  <div className="z-10 relative flex items-center justify-center">

    {/* Background glow */}
    <div
      className="absolute w-[340px] h-[340px] blur-3xl opacity-40 scale-110 transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[imageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    />

    <img
      key={imageIndex}
      src={images[imageIndex]}
      alt="memory"
      className="cinematic-img"
    />

  </div>
)}

<style>{`

.cinematic-img{

width:320px;
max-width:90%;

border-radius:20px;

box-shadow:
0 20px 60px rgba(0,0,0,0.9),
0 0 25px rgba(255,40,120,0.6);

animation: cinematicReveal 3s ease;

position:relative;

}

@keyframes cinematicReveal {

0%{
opacity:0;
transform:scale(0.6) translateY(80px) rotate(-6deg);
filter:blur(10px);
}

40%{
opacity:1;
transform:scale(1.05) translateY(-10px) rotate(2deg);
filter:blur(0);
}

70%{
transform:scale(1.02) rotate(-1deg);
}

100%{
opacity:1;
transform:scale(1) translateY(0) rotate(0);
}

}

`}</style>

    </div>

  );
}