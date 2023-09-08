"use client";
import {
  Button,
  Center,
  HStack,
  Heading,
  LightMode,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* banner */}
      <Center
        flexDirection={"column"}
        height={{ base: "50vh", md: "75vh" }}
        backgroundImage={"/images/clifford.webp"}
        objectPosition={{ md: "0% 0%" }}
        backgroundSize={"cover"}
        width={"100%"}
        alignItems={"start"}
        paddingLeft={{ base: 25, md: 100 }}
        gap={30}
      >
        <VStack align={"start"}>
          <Heading fontSize={{ base: "4xl", md: "5xl" }}>
            Clifford the Red Dog
          </Heading>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontStyle={"italic"}>
            A very interesting dog...
          </Text>
        </VStack>
        <HStack fontSize={"xl"}>
          <LightMode>
            <Button>Play</Button>
          </LightMode>
          <Text>Add to List</Text>
        </HStack>
      </Center>
      {/* slider one */}

      {/* slider two */}
      {/* slider three */}
    </>
  );
}
