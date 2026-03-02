"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function useMediaQuery(query) {
  const matchesRef = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => {
      matchesRef.current = mql.matches;
    };

    update();
    if (mql.addEventListener) {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }

    // Safari < 14
    mql.addListener(update);
    return () => mql.removeListener(update);
  }, [query]);

  return matchesRef;
}

export default function HeroGraphic({ heroRef }) {
  const svgHostRef = useRef(null);
  const [svg, setSvg] = useState("");
  const offsetsRef = useRef([]);
  const rafRef = useRef(0);
  const targetRef = useRef({ dx: 0, dy: 0 });

  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const isFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  const maxOffset = 4;
  const filterPadding = maxOffset + 4;

  const resetShadow = useCallback(() => {
    targetRef.current = { dx: 0, dy: 0 };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        for (const { el, dx0, dy0 } of offsetsRef.current) {
          el.setAttribute("dx", String(dx0));
          el.setAttribute("dy", String(dy0));
        }
      });
    }
  }, []);

  useEffect(() => {
    fetch("/images/hero.svg")
      .then((r) => r.text())
      .then(setSvg);
  }, []);

  useEffect(() => {
    const host = svgHostRef.current ?? heroRef?.current;
    const svgEl = host?.querySelector?.("svg");
    if (!svgEl) return;

    for (const filterEl of svgEl.querySelectorAll("filter")) {
      if (filterEl.getAttribute("filterUnits") !== "userSpaceOnUse") continue;

      const x = Number.parseFloat(filterEl.getAttribute("x") ?? "");
      const y = Number.parseFloat(filterEl.getAttribute("y") ?? "");
      const w = Number.parseFloat(filterEl.getAttribute("width") ?? "");
      const h = Number.parseFloat(filterEl.getAttribute("height") ?? "");
      if (![x, y, w, h].every(Number.isFinite)) continue;

      filterEl.setAttribute("x", String(x - filterPadding));
      filterEl.setAttribute("y", String(y - filterPadding));
      filterEl.setAttribute("width", String(w + filterPadding * 2));
      filterEl.setAttribute("height", String(h + filterPadding * 2));
    }

    offsetsRef.current = Array.from(svgEl.querySelectorAll("feOffset")).map(
      (el) => {
        const dx0 = Number.parseFloat(el.getAttribute("dx") ?? "0") || 0;
        const dy0 = Number.parseFloat(el.getAttribute("dy") ?? "0") || 0;
        return { el, dx0, dy0 };
      },
    );

    resetShadow();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [filterPadding, heroRef, resetShadow, svg]);

  const scheduleApply = useCallback(() => {
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;

      const { dx, dy } = targetRef.current;
      for (const { el, dx0, dy0 } of offsetsRef.current) {
        el.setAttribute("dx", (dx0 + dx).toFixed(2));
        el.setAttribute("dy", (dy0 + dy).toFixed(2));
      }
    });
  }, []);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (prefersReducedMotion.current || !isFinePointer.current) return;

      const root = heroRef?.current ?? svgHostRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const insideX = e.clientX >= rect.left && e.clientX <= rect.right;
      const insideY = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!insideX || !insideY) {
        resetShadow();
        return;
      }

      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      targetRef.current = {
        dx: clamp(-nx * maxOffset, -maxOffset, maxOffset),
        dy: clamp(-ny * maxOffset, -maxOffset, maxOffset),
      };

      scheduleApply();
    };

    const handlePointerLeave = () => {
      resetShadow();
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      resetShadow();
    };
  }, [heroRef, isFinePointer, prefersReducedMotion, resetShadow, scheduleApply]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("DeviceOrientationEvent" in window)) return;

    const handleOrientation = (e) => {
      if (prefersReducedMotion.current || isFinePointer.current) {
        resetShadow();
        return;
      }

      const root = heroRef?.current ?? svgHostRef.current;
      if (!root) return;

      const { beta, gamma } = e;
      if (beta == null || gamma == null) return;

      const nx = clamp(gamma / 45, -1, 1);
      const ny = clamp(beta / 45, -1, 1);

      targetRef.current = {
        dx: clamp(-nx * maxOffset, -maxOffset, maxOffset),
        dy: clamp(-ny * maxOffset, -maxOffset, maxOffset),
      };

      scheduleApply();
    };

    const handleOrientationEnd = () => {
      resetShadow();
    };

    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("blur", handleOrientationEnd);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("blur", handleOrientationEnd);
      resetShadow();
    };
  }, [heroRef, isFinePointer, maxOffset, prefersReducedMotion, resetShadow, scheduleApply]);

  return (
    <div
      ref={svgHostRef}
      className="flex-1 flex align-center hero-logo"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
