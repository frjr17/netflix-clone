"use client";
import { useVideosState } from "@/app/state/videos";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { renderToString } from "react-dom/server";

export default function Video() {
  const router = useRouter();
  const { videoId } = useParams();
  const videosState = useVideosState();
  const video = videosState.currentVideo;
  useEffect(() => {
    videosState.getVideo(videoId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const regex = /https?:\/\/[^\s]+/gi;

  /**
   * Replaces links in the video description with Link components.
   * @param {string} match - The link URL.
   * @param {number} index - The index of the link in the description.
   * @returns {string} The Link component string for the link.
   */
  const renderedText = video?.description.replace(
    regex,
    (match: string, index: number) => {
      return renderToString(
        <Link
          style={{ color: "#4299E1", textDecoration: "underline" }}
          href={match}
          target="_blank"
          key={index}
        >
          {match}
        </Link>
      );
    }
  );
  return (
    <Center alignItems={"start"} marginTop={"70px"} minHeight={"100vh"}>
      <Box
        position={"relative"}
        maxW={{ base: "100%", md: "800px" }}
        width={"100%"}
        marginBottom={10}
      >
        <Box
          id="videoPart"
          height={{ base: "fit-content", md: 400 }}
          width={"100%"}
          background={"red"}
        >
          <iframe
            id="player"
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&rel=0&controls=0&loop=1`}
          ></iframe>
          <Button
            zIndex={99}
            onClick={router.back}
            border={"2px solid"}
            top={{ base: 5, md: 0 }}
            left={{ base: 5, md: -75 }}
            position={"absolute"}
            width={{ base: "40px", md: 50 }}
            height={{ base: "40px", md: 50 }}
            rounded={"full"}
          >
            <Icon as={ArrowBackIcon} boxSize={{ md: "5" }} />
          </Button>
        </Box>
        <Stack
          background={"black"}
          direction={{ md: "row", base: "column-reverse" }}
          paddingY={{ md: 5 }}
          justify={"space-between"}
          align={"start"}
          paddingX={10}
        >
          <VStack
            align={"start"}
            spacing={{ base: 3, md: 5 }}
            width={{ base: "100%", md: "65%" }}
            marginBottom={{ base: 10, md: "none" }}
          >
            <Text fontSize={"sm"} color={"gray"}>
              {video?.publishTime}
            </Text>
            <Heading as={"h1"} fontSize={"2xl"} textAlign={"left"}>
              {video?.title}
            </Heading>
            <Text
              whiteSpace={"pre-wrap"}
              color={"whiteAlpha.700"}
              dangerouslySetInnerHTML={{ __html: renderedText as string }}
            />
          </VStack>
          <Divider display={{ base: "block", md: "none" }} />
          <Stack
            width={{ base: "100%", md: "30%" }}
            direction={{ base: "row", md: "column" }}
            justify={{ base: "space-between" }}
            paddingTop={10}
            align={"start"}
          >
            <HStack>
              <Text color={"gray"}>Cast:</Text>
              <Text>{video?.channelTitle}</Text>
            </HStack>
            <HStack>
              <Text color={"gray"}>View Count:</Text>
              <Text>{video?.viewCount}</Text>
            </HStack>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
