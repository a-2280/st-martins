"use client";
import { useRef } from "react";
import HeroGraphic from "./heroGraphic";

export default function Hero() {
  const heroRef = useRef(null);

  return (
    <div
      ref={heroRef}
      className="hero h-100dvh flex flex-col space-between align-center"
    >
      <HeroGraphic heroRef={heroRef} />
      <div className="w-285px text-center flex flex-col align-center gap-40">
        <p className="m-show">Make a Reservation</p>
        <p>Dallas&rsquo;s most romantic restaurant has finally returned.</p>
      </div>
    </div>
  );
}
