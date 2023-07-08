/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Box,
  Button,
  HStack,
  Heading,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import Navbar from "./components/navbar";
import { BsFillPlayFill } from "react-icons/bs";
import Card from "./components/card";
import Carousel from "./components/carousel";
import { VideoObject } from "./lib/videos";
import { useVideosState } from "./state/videos";
import { useEffect } from "react";
import { Link } from "@chakra-ui/next-js";

export default function Home() {
  const videosState = useVideosState();
  useEffect(() => {
    videosState.getAll();
  }, []);
  return (
    <Box>
      <Navbar />
      <Skeleton
        isLoaded={!videosState.isFetching && Boolean(videosState.disney.length)}
      >
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
      </Skeleton>

      {videosState.orderAll(videosState).map((props) => {
        const name = props[0] as string;
        const videos = props[1] as VideoObject[];
        return (
          <VStack
            key={name}
            spacing={3}
            align={"start"}
            paddingX={4}
            marginY={10}
          >
            <Heading as={"h3"} fontSize={"3xl"} fontWeight={500}>
              {name}
            </Heading>
            <Carousel
              cards={videos.map((video, i) => (
                <Skeleton
                  rounded={"md"}
                  isLoaded={!videosState.isFetching}
                  key={video.id}
                >
                  <Link href={`video/${video.id}`}>
                    <Card imageUrl={video.imgUrl} />
                  </Link>
                </Skeleton>
              ))}
            />
          </VStack>
        );
      })}
    </Box>
  );
}
