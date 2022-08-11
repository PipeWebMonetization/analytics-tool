import { NextPage } from "next/types";
import {
  Flex,
  Heading,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
  Button,
} from "@chakra-ui/react";
import UserIcon from "../components/dashboard/userIcon";
import CircleIcon from "../components/circleIcon";
import { EmailIcon, ArrowBackIcon, CopyIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Settings: NextPage = () => {
  const [value, setValue] = useState("");
  const { hasCopied, onCopy } = useClipboard(value);
  const router = useRouter();

  return (
    <Flex w={"100vw"} h={"100vh"} m={"2"} flexDir={"column"}>
      <Flex
        flexDir={"row"}
        w={"100vw"}
        height={"5em"}
        justifyContent={"flex-end"}
      >
        <UserIcon userInitials="G"></UserIcon>
      </Flex>
      <Flex alignSelf={"center"} flexDir={"column"}>
        <Flex flexDir={"row"} mt={"10"} align={"center"}>
          <Heading size={"lg"}>
            <Link href="/">
              <ArrowBackIcon
                cursor={"pointer"}
                mr={"5"}
                color={"pipewebmonetization.black"}
              />
            </Link>
            Let&apos;s setup your Dashboard!
          </Heading>
        </Flex>
        <Flex flexDir={"row"} mt={"10"} align={"center"}>
          <CircleIcon number="1"></CircleIcon>
          <Text fontWeight={`bold`} ml={"5"}>
            First of all, give you Wordpress plugin a unique ID:
          </Text>
        </Flex>
        <Flex>
          <InputGroup mt={"5"} ml={"70px"}>
            <Input
              backgroundColor={"rgba(25, 25, 25, 0.04)"}
              border={"none"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <InputRightElement onClick={onCopy}>
              <CopyIcon
                color={hasCopied ? "green.500" : "pipewebmonetization.black"}
                cursor={"pointer"}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
        <Flex flexDir={"row"} mt={"10"} align={"center"}>
          <CircleIcon number="2"></CircleIcon>
          <Text fontWeight={`bold`} ml={"5"}>
            Copy the ID above and access the Pipe Web Monetization extension
            menu in your WordPress website admin
          </Text>
        </Flex>
        <Flex flexDir={"row"} mt={"5"} align={"center"}>
          <CircleIcon number="3"></CircleIcon>
          <Text fontWeight={`bold`} ml={"5"}>
            Click the ”Sync Analytics” menu tab
          </Text>
        </Flex>
        <Flex flexDir={"row"} mt={"5"} align={"center"}>
          <CircleIcon number="4"></CircleIcon>
          <Text fontWeight={`bold`} ml={"5"}>
            Paste the following code and confirm. That&apos;s all!
          </Text>
        </Flex>
        <Flex mt={"10"} align={"center"} flexDir={"column"}>
          <Text fontWeight={`bold`} color={"rgba(25, 25, 25, 0.57)"}>
            After following these steps, click the button below to get started!
          </Text>
          <Button
            background={"pipewebmonetization.yellow"}
            mt={5}
            onClick={() => router.push("/")}
          >
            I&apos;ve done all the steps. Let&apos;s go!
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Settings;
