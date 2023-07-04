import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ReactNode } from "react";

interface ICarouselProps {
  cards: ReactNode[];
}

export default function Carousel(props: ICarouselProps) {
  return (
    <Swiper spaceBetween={25} slidesPerView={"auto"}>
      {props.cards.map((card, i) => (
        <SwiperSlide key={i}>{card}</SwiperSlide>
      ))}
    </Swiper>
  );
}
