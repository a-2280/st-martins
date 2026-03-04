"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default function FoodGallery({ data }) {
  const swiperRef = useRef(null);

  return (
    <Swiper
      loop
      speed={650}
      className="food-gallery"
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      centeredSlides
      breakpoints={{
        0: { slidesPerView: 1.5, spaceBetween: 20 },
        769: { slidesPerView: 3.6, spaceBetween: 25 },
      }}
    >
      {data?.images?.map((item, i) => (
        <SwiperSlide key={i}>
          {({ isActive }) => (
            <>
              <div
                className="ratio-4-5 pos-rel"
                onClick={() => !isActive && swiperRef.current?.slideToLoop(i)}
              >
                <Image
                  className="bg-image"
                  src={urlFor(item.image).url()}
                  alt={item.title}
                  width={800}
                  height={600}
                />
              </div>
              <div className="f-12">
                <p className="op-4">{item.title}</p>
                {item.ingredients && (
                  <p className="capitalize op-4">{item.ingredients}</p>
                )}
              </div>
            </>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
