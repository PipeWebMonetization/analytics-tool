import {
  Flex,
  Heading,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import UserIcon from "../components/dashboard/userIcon";
import TransactionsPerMonth from "../components/dashboard/barsCharts/transactionsPerMonth";
import DoughnutChart from "../components/dashboard/doughnutChart";
import { useEffect, useState } from "react";
import { transactionsResults } from "../lib/database/databaseService";
import TransactionsPerDayOfWeek from "../components/dashboard/barsCharts/transactionsPerDayOfWeek";
import TransactionsPerYear from "../components/dashboard/barsCharts/transactionsPerYear";

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loadingRevenue, setLoadingRevenue] = useState<boolean>(false);
  const [revenueStatistics, setRevenueStatistics] =
    useState<transactionsResults>({});

  useEffect(() => {
    setLoadingRevenue(true);
    fetch("/api/transactions/all")
      .then((res) => res.json())
      .then((data) => {
        setRevenueStatistics(data);
        console.log(data);
        setLoadingRevenue(false);
      });
    fetch(`/api/pluginIds/pluginIds?email=${session?.user?.email}`);
  }, []);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (!session) {
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
        <UserIcon userInitials="G"></UserIcon>
      </Flex>
      <Flex
        alignSelf={"center"}
        w={"70vw"}
        h={"40vh"}
        border={"1px solid rgba(25, 25, 25, 0.16)"}
        borderRadius={"8px"}
        flexDir={"column"}
      >
        <Tabs
          isLazy
          align="end"
          variant="unstyled"
          colorScheme="green"
          defaultIndex={1}
        >
          <TabList>
            <Tab
              _selected={{
                color: "pipewebmonetization.black",
                bg: "pipewebmonetization.yellow",
              }}
            >
              Day
            </Tab>
            <Tab
              _selected={{
                color: "pipewebmonetization.black",
                bg: "pipewebmonetization.yellow",
              }}
            >
              Month
            </Tab>
            <Tab
              _selected={{
                color: "pipewebmonetization.black",
                bg: "pipewebmonetization.yellow",
                borderTopRightRadius: "7px",
              }}
            >
              Year
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <Flex
                flexDir={"column"}
                textAlign={"start"}
                w={"100%"}
                maxH={"28vh"}
              >
                <Flex flexDir={"row"} alignItems={"center"} mb={"1rem"}>
                  <Heading size={"lg"} ml={"5%"}>
                    Revenue per Day of Week
                  </Heading>
                  <Heading size={"md"} ml={"5"}>
                    2022
                  </Heading>
                </Flex>
                <TransactionsPerDayOfWeek
                  revenueStatistics={revenueStatistics}
                ></TransactionsPerDayOfWeek>
              </Flex>
            </TabPanel>
            <TabPanel p={0}>
              <Flex
                flexDir={"column"}
                textAlign={"start"}
                w={"100%"}
                maxH={"28vh"}
              >
                <Flex flexDir={"row"} alignItems={"center"} mb={"1rem"}>
                  <Heading size={"lg"} ml={"5%"}>
                    Revenue per Month
                  </Heading>
                  <Heading size={"md"} ml={"5"}>
                    2022
                  </Heading>
                </Flex>
                <TransactionsPerMonth
                  revenueStatistics={revenueStatistics}
                ></TransactionsPerMonth>
              </Flex>
            </TabPanel>
            <TabPanel p={0}>
              <Flex
                flexDir={"column"}
                textAlign={"start"}
                w={"100%"}
                maxH={"28vh"}
              >
                <Flex flexDir={"row"} alignItems={"center"} mb={"1rem"}>
                  <Heading size={"lg"} ml={"5%"}>
                    Revenue per Year
                  </Heading>
                  <Heading size={"md"} ml={"5"}>
                    2022
                  </Heading>
                </Flex>
                <TransactionsPerYear
                  revenueStatistics={revenueStatistics}
                ></TransactionsPerYear>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <Flex
        alignSelf={"center"}
        w={"70vw"}
        h={"40vh"}
        flexDir={"row"}
        justifyContent={"space-between"}
      >
        <Flex
          alignSelf={"center"}
          border={"1px solid rgba(25, 25, 25, 0.16)"}
          borderRadius={"8px"}
          w={"34vw"}
          h={"35vh"}
          flexDir={"column"}
        >
          <Heading size={"md"} ml={"5%"} mt={"1rem"} mb={"1rem"}>
            Revenue by Payment Pointer
          </Heading>
          <Flex
            flexDir={"row"}
            alignSelf="center"
            position={"relative"}
            width="100%"
            height="75%"
          >
            <DoughnutChart></DoughnutChart>
          </Flex>
        </Flex>
        <Flex
          alignSelf={"center"}
          border={"1px solid rgba(25, 25, 25, 0.16)"}
          borderRadius={"8px"}
          w={"34vw"}
          h={"35vh"}
          flexDir={"column"}
          px={5}
        >
          <Heading size={"md"} ml={"5%"} mt={"1rem"} mb={"1rem"}>
            Revenue by Content
          </Heading>

          <Table size={"sm"}>
            <Thead>
              <Tr>
                <Td fontWeight={"bold"}>Content</Td>
                <Td fontWeight={"bold"}>Revenue</Td>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Page 1</Td>
                <Td>U$ 200</Td>
              </Tr>
              <Tr>
                <Td>Page 2</Td>
                <Td>U$ 200</Td>
              </Tr>
              <Tr>
                <Td>Page 3</Td>
                <Td>U$ 5000</Td>
              </Tr>
              <Tr>
                <Td>Page 4</Td>
                <Td>U$ 12000</Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
