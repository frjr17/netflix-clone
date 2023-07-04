"use client";
import {
  Center,
  VStack,
  Heading,
  FormControl,
  Input,
  Button,
  FormLabel,
  LightMode,
} from "@chakra-ui/react";

export default function Login() {
  return (
    <Center backgroundImage={"/images/signin-bg.jpeg"} height={"100vh"}>
      <Center background={"rgba(0,0,0,0.3)"} width={"100vw"} height={"100vh"}>
        <VStack
          background={"rgba(0,0,0,0.7)"}
          width={"350px"}
          height={"350px"}
          padding={7}
          justify={"space-around"}
        >
          <Heading>Sign In</Heading>
          <FormControl>
            <FormLabel>Email Adress</FormLabel>
            <Input />
          </FormControl>
          <LightMode>
            <Button colorScheme="red">Sign In</Button>
          </LightMode>
        </VStack>
      </Center>
    </Center>
  );
}
