import {
  Text,
  Flex
} from "@chakra-ui/react";

const CircleIcon = (props: { number: string }) => {
  return (
    <Flex>
        <Flex
            backgroundColor={"pipewebmonetization.yellow"}
            w={"50px"}
            h={"50px"}
            borderRadius={"25px"}
            justifyContent={"center"}
            align={"center"}
            fontWeight={"bold"}
            alignSelf={"center"}
        >
            <Text fontWeight={`bold`}>{props.number}</Text>
        </Flex>
    </Flex>
  );
};

export default CircleIcon;
