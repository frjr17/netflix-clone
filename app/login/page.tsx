"use client";
import {
  Center,
  VStack,
  Heading,
  FormControl,
  Input,
  Button,
  FormLabel,
} from "@chakra-ui/react";

export default function Login() {
  return (
    <Center>
      <VStack>
        <Heading>Sign In</Heading>
        <FormControl>
          <FormLabel>Email Adress</FormLabel>
          <Input />
        </FormControl>
        <Button>Sign In</Button>
      </VStack>
    </Center>
  );
}
