import {
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Image,
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
import { useEffect, useState } from "react";

const Login: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    console.log(process.env.NEXT_PUBLIC_NEXTAUTH_SECRET)
    console.log(process.env.NEXT_PUBLIC_SMTP_HOST)
    console.log(process.env.NEXT_PUBLIC_SMTP_PORT)
    console.log(process.env.NEXT_PUBLIC_SMTP_USER)
    console.log(process.env.NEXT_PUBLIC_SMTP_PASSWORD)
    console.log(process.env.NEXT_PUBLIC_SMTP_FROM)
    console.log('--------------------------------')
    console.log(process.env.NEXT_PUBLIC_NEXT_AUTH_AWS_ACCESS_KEY)
    console.log(process.env.NEXT_PUBLIC_NEXT_AUTH_AWS_SECRET_KEY)
    console.log(process.env.NEXT_PUBLIC_NEXT_AUTH_AWS_REGION)
    console.log('--------------------------------')
    setLoading(true);
    await signIn("email", values);
    setLoading(false);
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
      backgroundImage={"/login-background.svg"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
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
          <FormControl isInvalid={isValidEmail}>
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
            isLoading={loading}
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
      <Flex
        flexDir={"row"}
        w={"60%"}
        px={"10"}
        py={"10"}
        justifyContent={"end"}
        backgroundImage={"url(/people.svg)"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"60%"}
        backgroundPosition={"center"}
      >
        <Flex
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={"auto"}
        >
          <Image
            marginEnd={"5"}
            objectFit={"cover"}
            src={"/pipe-logo.svg"}
            alt={"Pipe Logo"}
          />
          <Image
            objectFit={"cover"}
            src={"/pipe-name.svg"}
            alt={"Pipe Logo"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
