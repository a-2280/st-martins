"use client";

import { useEffect, useState } from "react";

function isRestaurantOpenInDallas() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");

  const day = now.getDay(); // 0 = Sunday, 6 = Saturday

  const timeInMinutes = hour * 60 + minute;
  const openAt = 17 * 60; // 5:00 PM
  const closeSunThu = 22 * 60; // 10:00 PM
  const closeFriSat = 23 * 60; // 11:00 PM

  if (timeInMinutes < openAt) return false;

  if (day === 5 || day === 6) {
    // Friday & Saturday
    return timeInMinutes < closeFriSat;
  }

  // Sunday–Thursday
  return timeInMinutes < closeSunThu;
}

export default function RestaurantHours() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function update() {
      setIsOpen(isRestaurantOpenInDallas());
    }

    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col align-center gap-5">
      <div className="flex flex-col align-center m-flex-row m-gap-10 m-f14">
        <div>Sun-Thu: 5-10pm</div>
        <div>Fri & Sat: 5-11pm</div>
      </div>
      <div className="capitalize f12 op-4">
        {isOpen ? "Open Now" : "Closed Now"}
      </div>
    </div>
  );
}

