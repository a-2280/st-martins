import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function MenuNav({ sections, activeId, onSelect, image, activeTitle }) {
  return (
    <>
      {image && <MenuImage image={image} activeTitle={activeTitle} />}
      <MenuItems sections={sections} activeId={activeId} onSelect={onSelect} />
    </>
  );
}

function MenuImage({ image, activeTitle }) {
  return (
    <div className="ratio-1-1 pos-rel w-200px mb-160 mx-auto m-mb-60">
      <Image
        className="bg-image contain"
        src={urlFor(image).url()}
        alt={activeTitle ?? ""}
        width={193}
        height={176}
      />
    </div>
  );
}

function MenuItems({ sections, activeId, onSelect }) {
  return (
    <div className="menu-nav w-100 flex justify-center capitalize flex gap-5 m-flex-col m-align-center m-gap-10">
      {sections.map((s, i) => (
        <span key={s.id} className="flex gap-5">
          {i > 0 && <span className="cursor-default m-hide">/</span>}
          <button
            onClick={() => onSelect(s.id)}
            className={`menu-nav-btn${activeId === s.id ? " active" : ""}`}
          >
            {s.title}
          </button>
        </span>
      ))}
    </div>
  );
}
