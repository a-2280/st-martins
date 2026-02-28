"use client";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const svgRef = useRef(null);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    fetch("/images/hero.svg")
      .then((r) => r.text())
      .then(setSvg);
  }, []);

  useEffect(() => {
    function handleMouseMove(e) {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const max = 4;
      const dx =
        ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * max;
      const dy =
        ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * max;
      svgRef.current.querySelectorAll("feOffset").forEach((el) => {
        el.setAttribute("dx", dx);
        el.setAttribute("dy", dy);
      });
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="h-100vh flex flex-col space-between align-center"
    >
      <div
        ref={svgRef}
        className="flex-1 flex align-center hero-logo"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <p className="w-300px text-center">
        Dallas&rsquo;s most romantic restaurant has finally returned.
      </p>
    </div>
  );
}
