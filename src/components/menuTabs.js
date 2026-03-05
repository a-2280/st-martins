"use client";
import { useState, useEffect } from "react";
import MenuNav from "./menuNav";
import MenuSection from "./menuSection";
import Spacer from "./spacer";
import { initSal } from "@/utils/sal";

export default function MenuTabs({ data, dinnerItems, wineItems, cocktailItems }) {
  const [activeId, setActiveId] = useState("dinner-menu");

  useEffect(() => {
    initSal()
  }, [activeId]);

  const sections = [
    { id: "dinner-menu", title: data?.dinner?.name ?? "Dinner Menu", items: dinnerItems, image: data?.dinner?.image },
    { id: "wine-list", title: data?.wine?.name ?? "Wine List", items: wineItems, image: data?.wine?.image },
    { id: "cocktails-spirits", title: data?.cocktails?.name ?? "Cocktails & Spirits", items: cocktailItems, image: data?.cocktails?.image },
  ];

  const active = sections.find((s) => s.id === activeId);

  return (
    <>
      <MenuNav sections={sections} activeId={activeId} onSelect={setActiveId} image={active?.image} activeTitle={active?.title} />
      {active && <MenuSection id={active.id} items={active.items} />}
    </>
  );
}
