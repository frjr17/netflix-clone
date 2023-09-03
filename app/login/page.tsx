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
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const signIn = () => {
    router.push("/");
  };
  return (
    <Box backgroundImage={"/images/signin-bg.jpeg"} height={"100vh"}>
      <Center
        position="relative"
        background={"rgba(0,0,0,0.4)"}
        height={"100%"}
      >
        <Image
          src={"/svg/netflix.svg"}
          width={150}
          height={200}
          alt="Netflix Logo"
          style={{
            position: "absolute",
            top: 30,
            left: 40,
          }}
        />
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
            <Button onClick={signIn} colorScheme="red">
              Sign In
            </Button>
          </LightMode>
        </VStack>
      </Center>
    </Box>
  );
}
