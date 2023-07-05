"use client";
import { Box, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Navbar from "./components/navbar";
import { BsFillPlayFill } from "react-icons/bs";
import Card from "./components/card";
import Carousel from "./components/carousel";

export default function Home() {
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
          Travel
        </Heading>
      </VStack>
    </Box>
  );
}
