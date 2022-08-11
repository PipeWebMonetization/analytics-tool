import {
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserIcon = (props: { userInitials: string }) => {
  const { data: session } = useSession();
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
          <Text pl={3} mt={2}>
            {session?.user?.email ?? ""}
          </Text>
          <MenuItem mt={5}>
            <Link href="/settings">Settings</Link>
          </MenuItem>
          <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserIcon;
