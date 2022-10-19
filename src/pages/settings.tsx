import {
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import UserIcon from "../components/dashboard/userIcon";
import { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { PluginIdDocument, verifyPluginIDs } from "../modules";
import { BsFillTrashFill } from "react-icons/bs";

const Dashboard: NextPage = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const [pluginIds, setPluginIds] = useState<PluginIdDocument[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [newPluginID, setnewPluginID] = useState("");
  const router = useRouter();

  const addPluginID = () => {
    setisLoading(true);
    if (newPluginID.length > 0) {
      fetch("/api/pluginIds/add", {
        method: "POST",
        body: JSON.stringify({ email: email, pluginId: newPluginID }),
      }).then((res) => {
        if (res.status == 200) {
          setPluginIds([
            ...pluginIds,
            { pluginId: newPluginID, userEmail: email ?? "" },
          ]);
          setnewPluginID("");
          setIsAdding(false);
          setisLoading(false);
        } else {
          setIsAdding(false);
          setisLoading(false);
        }
      });
    }
  };

  const deletePluginID = (pluginId: string) => {
    setisLoading(true);
    fetch("/api/pluginIds/delete", {
      method: "DELETE",
      body: JSON.stringify({ email: email, pluginId: pluginId }),
    }).then((res) => {
      if (res.status == 200) {
        setPluginIds(pluginIds.filter((p) => p.pluginId != pluginId));
        setisLoading(false);
      } else {
        console.error("Failed to delete pluginId");
        setisLoading(false);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const pluginIdsData = await verifyPluginIDs(email);
      setPluginIds(pluginIdsData.Items);
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  useEffect(() => {
    if (!session && status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router, status]);

  if (!session && status === "unauthenticated") {
    return <div>Not Logged In</div>;
  }
  return (
    <Flex w={"100vw"} h={"100vh"} flexDir={"column"}>
      <Flex
        flexDir={"row"}
        w={"100vw"}
        height={"5em"}
        justifyContent={"flex-end"}
      >
        <UserIcon></UserIcon>
      </Flex>
      <Flex
        alignSelf={"center"}
        w={"70vw"}
        h={"80vh"}
        border={"1px solid rgba(25, 25, 25, 0.16)"}
        borderRadius={"8px"}
        flexDir={"column"}
        py={5}
        px={8}
      >
        <Heading size={"lg"}>
          <Link href="/">
            <ArrowBackIcon
              cursor={"pointer"}
              mr={"5"}
              color={"pipewebmonetization.black"}
            />
          </Link>
          Settings
        </Heading>
        <Divider py={2}></Divider>
        <Heading size={"sm"} mt={10} ml={6}>
          Plugin Installations IDs
        </Heading>
        <Table>
          <Tbody>
            {pluginIds.map((pluginId) => (
              <Tr key={pluginId.pluginId}>
                <Td>{pluginId.pluginId}</Td>
                <Td>
                  <IconButton
                    colorScheme={"red"}
                    aria-label={"Delete"}
                    isLoading={isLoading}
                    onClick={() => deletePluginID(pluginId.pluginId)}
                  >
                    <BsFillTrashFill />
                  </IconButton>
                </Td>
              </Tr>
            ))}
            {isAdding && (
              <Tr>
                <Td>
                  <Input
                    type="text"
                    placeholder="Plugin installation unique ID"
                    value={newPluginID}
                    onChange={(e) => setnewPluginID(e.target.value)}
                  ></Input>
                </Td>
                <Td>
                  <Button
                    colorScheme={"green"}
                    isLoading={isLoading}
                    onClick={() => addPluginID()}
                  >
                    Save
                  </Button>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        <Button
          size={"sm"}
          w={60}
          background={"pipewebmonetization.yellow"}
          mt={5}
          isLoading={isLoading}
          onClick={() => setIsAdding(true)}
        >
          Add new plugin installation
        </Button>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
