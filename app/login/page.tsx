"use client";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  LightMode,
  VStack,
} from "@chakra-ui/react";

export default function Login() {
  return (
    <Box backgroundImage={"/images/signin-bg.jpeg"} height={"100vh"}>
      <Center background={"rgba(0,0,0,0.4)"} height={"100%"}>
        <VStack
          background={"rgba(0,0,0,0.7)"}
          width={{ base: "90%", md: "400px" }}
          padding={10}
          spacing={10}
          rounded={"md"}
        >
          <Heading>Sign In</Heading>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
            <FormHelperText fontStyle="italic">
              We&apos;ll never share your email.
            </FormHelperText>
          </FormControl>
          <LightMode>
            <Button colorScheme="red">Sign In</Button>
          </LightMode>
        </VStack>
      </Center>
    </Box>
  );
}
