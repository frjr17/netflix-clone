import { Box } from "@chakra-ui/react";
import React from "react";
import ReactCarousel from "react-multi-carousel";
import type { CarouselProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export type ICarouselProps = CarouselProps & {
  cards: React.ReactNode[];
};

export default function Carousel(props: ICarouselProps) {
  const { cards, ...restProps } = props;
  return (
    <ReactCarousel infinite={true} {...restProps} responsive={responsive}>
      <Box bg="red" width={225} height={125}></Box>
      <Box bg="red" width={225} height={125}></Box>
      <Box bg="red" width={225} height={125}></Box>
      <Box bg="red" width={225} height={125}></Box>
      <Box bg="red" width={225} height={125}></Box>
      <Box bg="red" width={225} height={125}></Box>
      <Box bg="red" width={225} height={125}></Box>
    </ReactCarousel>
  );
}
