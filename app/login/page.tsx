"use client";
import {
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
    <Center>
      <VStack>
        <Heading>Sign In</Heading>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
          <FormHelperText>We&apos;ll never share your email.</FormHelperText>
        </FormControl>
        <LightMode>
          <Button colorScheme="red">Sign In</Button>
        </LightMode>
      </VStack>
    </Center>
  );
}
