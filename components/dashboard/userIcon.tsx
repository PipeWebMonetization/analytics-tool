import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";

const UserIcon = (props: { userInitials: string }) => {
  return (
    <Flex
      backgroundColor={"pipewebmonetization.yellow"}
      w={"50px"}
      h={"50px"}
      borderRadius={"25px"}
      justifyContent={"center"}
      align={"center"}
      fontWeight={"bold"}
      alignSelf={"center"}
      mr={"15vw"}
    >
      <Menu>
        <MenuButton>
          <Text fontWeight={`bold`}>{props.userInitials}</Text>
        </MenuButton>
        <MenuList>
          <Text pl={3}>Gabriel Piva</Text>
          <MenuItem>Settings</MenuItem>
          <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserIcon;
