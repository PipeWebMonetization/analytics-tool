import {
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import * as EmailValidator from "email-validator";
import { EmailIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    await signIn("email", values);
  });

  const isValidEmail = EmailValidator.validate(watch("email") ?? "");

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <Flex
      flexDir={"row"}
      w={"100vw"}
      h={"100vh"}
      backgroundColor={"pipewebmonetization.yellow"}
    >
      <Flex
        flexDir={"column"}
        w={"40%"}
        backgroundColor={"pipewebmonetization.white"}
        px={"7%"}
        justifyContent={"center"}
      >
        <Heading size={"lg"}>Welcome</Heading>
        <Text mt={4}>
          Welcome to Pipe Web Monetization! Please enter your email to receive
          the login link.
        </Text>
        <chakra.form onSubmit={onSubmit} mt={20}>
          <FormControl isInvalid={errors.email}>
            <Text mb="8px">Email</Text>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color={"gray.500"} />
              </InputLeftElement>
              <Input
                backgroundColor={"rgba(25, 25, 25, 0.04)"}
                borderRadius="0"
                type="email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "This is required",
                  validate: {
                    isEmail: EmailValidator.validate,
                  },
                })}
              />
            </InputGroup>
          </FormControl>
          <Button
            float={"right"}
            mt={10}
            isDisabled={!isValidEmail}
            backgroundColor="pipewebmonetization.yellow"
            color={"pipewebmonetization.black"}
            type="submit"
          >
            Submit
          </Button>
        </chakra.form>
      </Flex>
    </Flex>
  );
};

export default Login;
