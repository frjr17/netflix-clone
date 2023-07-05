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
import { useAuthState } from "../lib/state/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const authState = useAuthState();
  const router = useRouter();
  const loginForm = authState.useForm("loginForm");

  const handleSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    try {
      await authState.login({ email: loginForm.values.email });
      router.push("/");
    } catch (error) {}
  };

  return (
    <Center backgroundImage={"/images/signin-bg.jpeg"} height={"100vh"}>
      <Center background={"rgba(0,0,0,0.3)"} width={"100vw"} height={"100vh"}>
        <VStack
          background={"rgba(0,0,0,0.7)"}
          width={"350px"}
          height={"350px"}
          padding={7}
          justify={"space-around"}
          rounded={"md"}
          as={"form"}
          onSubmit={handleSubmit}
        >
          <Heading>Sign In</Heading>
          {loginForm.components({ isLoading: authState.isFetching })}
          <LightMode>
            <Button
              loadingText={""}
              isLoading={authState.isFetching}
              colorScheme="red"
              type="submit"
            >
              Sign In
            </Button>
          </LightMode>
        </VStack>
      </Center>
    </Center>
  );
}
