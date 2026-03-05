import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function MenuNav({ sections, activeId, onSelect, image, activeTitle }) {
  return (
    <div className="flex flex-col align-center gap-160 m-gap-60">
      {image && <MenuImage image={image} activeTitle={activeTitle} />}
      <MenuItems sections={sections} activeId={activeId} onSelect={onSelect} />
    </div>
  );
}

function MenuImage({ image, activeTitle }) {
  return (
    <div className="ratio-1-1 pos-rel w-200px">
      <Image
        className="bg-image"
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
    <div className="w-100 flex justify-center capitalize flex gap-5 m-flex-col m-align-center m-gap-10">
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
