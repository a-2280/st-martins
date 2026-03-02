"use client";

import React from "react";
import { ReactLenis } from "lenis/react";

const SCROLL_OPTIONS = {
  duration: 1.2,
  orientation: "vertical",
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
};

export default function LenisProvider({ children }) {
  return (
    <ReactLenis root options={SCROLL_OPTIONS}>
      {children}
    </ReactLenis>
  );
}
