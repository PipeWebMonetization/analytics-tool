import { NextPage } from "next/types";
import { Flex, Heading, Text, Input, InputGroup, InputRightElement, useClipboard } from "@chakra-ui/react";
import UserIcon from "../components/dashboard/userIcon";
import CircleIcon from "../components/circleIcon";
import { EmailIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Link from 'next/link';

const Settings: NextPage = () => {
    const [value, setValue] = useState('123e4567-e89b-12d3-a456-426655440000')
    const { hasCopied, onCopy } = useClipboard(value)

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
                            <ArrowBackIcon cursor={"pointer"} mr={"5"} color={"pipewebmonetization.black"} />
                        </Link>
                        Set up your dashboard
                    </Heading>
                </Flex>
                <Flex flexDir={"row"} mt={"10"} align={"center"}>
                    <CircleIcon number="1"></CircleIcon>
                    <Text fontWeight={`bold`} ml={"5"}>
                        Access the Pipe Web Monetization extension menu in your WordPress website admin
                    </Text>
                </Flex>
                <Flex flexDir={"row"} mt={"5"} align={"center"}>
                    <CircleIcon number="2"></CircleIcon>
                    <Text fontWeight={`bold`} ml={"5"}>
                        Click the ”Sync Analytics” menu tab
                    </Text>
                </Flex>
                <Flex flexDir={"row"} mt={"5"} align={"center"}>
                    <CircleIcon number="3"></CircleIcon>
                    <Text fontWeight={`bold`} ml={"5"}>
                        Paste the following code and confirm. That's all!
                    </Text>
                </Flex>
                <Flex>
                <InputGroup mt={'5'} ml={'70px'}>
                    <Input 
                        isReadOnly 
                        backgroundColor={"rgba(25, 25, 25, 0.04)"} 
                        border={"none"} 
                        value={value}
                    />
                    <InputRightElement onClick={onCopy}>
                        <EmailIcon cursor={"pointer"} color={"pipewebmonetization.black"} />
                    </InputRightElement>
                </InputGroup>
                </Flex>
                <Flex mt={"10"} align={"center"}>
                    <Text fontWeight={`bold`} color={"rgba(25, 25, 25, 0.57)"}>
                        After following these steps, you will be able to see your dashboard here
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Settings;