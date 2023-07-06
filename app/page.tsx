/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Box, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Navbar from "./components/navbar";
import { BsFillPlayFill } from "react-icons/bs";
import Card from "./components/card";
import Carousel from "./components/carousel";
import { VideoObject } from "./lib/videos";
import { useVideosState } from "./lib/state/videos";
import { useEffect } from "react";

export default function Home() {
  const videosState = useVideosState();
  useEffect(() => {
    videosState.getAll();
  }, []);
  return (
    <Box>
      <Navbar />
      <VStack
        backgroundImage={"/images/clifford.webp"}
        backgroundSize={"cover"}
        paddingX={4}
        height={"80vh"}
        align="start"
        justify={"center"}
      >
        <Heading>Clifford the Red Dog</Heading>
        <Text fontStyle={"italic"}> a very cute and interesting dog...</Text>
        <HStack>
          <Button
            background={"white"}
            color={"black"}
            sx={{ ":hover": { color: "white" } }}
            leftIcon={<BsFillPlayFill />}
          >
            Play
          </Button>
          <Text cursor={"pointer"}>+ Add to My List</Text>
        </HStack>
      </VStack>
      <VStack spacing={3} align={"start"} paddingX={4} marginY={10}>
        <Heading as={"h3"} fontSize={"3xl"} fontWeight={500}>
          Most Popular
        </Heading>
        <Carousel
          cards={videosState.popular.map((video, i) => (
            <Card imageUrl={video.imgUrl} key={video.id} />
          ))}
        />
      </VStack>
      <VStack spacing={3} align={"start"} paddingX={4} marginY={10}>
        <Heading as={"h3"} fontSize={"3xl"} fontWeight={500}>
          Disney
        </Heading>
        <Carousel
          cards={videosState.disney.map((video, i) => (
            <Card imageUrl={video.imgUrl} key={video.id} />
          ))}
        />
      </VStack>
      <VStack spacing={3} align={"start"} paddingX={4} marginY={10}>
        <Heading as={"h3"} fontSize={"3xl"} fontWeight={500}>
          Travel
        </Heading>
        <Carousel
          cards={videosState.travel.map((video, i) => (
            <Card imageUrl={video.imgUrl} key={video.id} />
          ))}
        />
      </VStack>
      <VStack spacing={3} align={"start"} paddingX={4} marginY={10}>
        <Heading as={"h3"} fontSize={"3xl"} fontWeight={500}>
          Productivity
        </Heading>
        <Carousel
          cards={videosState.productivity.map((video, i) => (
            <Card imageUrl={video.imgUrl} key={video.id} />
          ))}
        />
      </VStack>
      <VStack spacing={3} align={"start"} paddingX={4} marginY={10}>
        <Heading as={"h3"} fontSize={"3xl"} fontWeight={500}>
          Landscapes
        </Heading>
        <Carousel
          cards={videosState.landscapes.map((video, i) => (
            <Card imageUrl={video.imgUrl} key={video.id} />
          ))}
        />
      </VStack>
    </Box>
  );
}
