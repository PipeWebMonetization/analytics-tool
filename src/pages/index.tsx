import {
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Select,
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
import { PluginIdDocument, verifyPluginIDs } from "../modules";
import { MonetizationEvent, Batcher } from "../lib/monetization/monetization";

const Dashboard: NextPage = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const router = useRouter();
  const [loadingRevenue, setLoadingRevenue] = useState<boolean>(false);
  const [revenueStatistics, setRevenueStatistics] =
    useState<transactionsResults>({
      yearData: [],
      monthData: [],
      weekData: [],
    });
  const [pluginIds, setPluginIds] = useState<PluginIdDocument[]>([]);
  const [selectedPluginId, setSelectedPluginId] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("2022");

  useEffect(() => {
    const batcher = new Batcher();
    // @ts-ignore
    document.monetization?.addEventListener(
      "tip",
      (event: MonetizationEvent) => {
        batcher.add({
          date: new Date().getTime(),
          value: Number(
            (
              Number(event.detail.amount) *
              10 ** (-1 * event.detail.assetScale)
            ).toFixed(event.detail.assetScale)
          ),
        });
      }
    );
    // @ts-ignore
    document.monetization?.addEventListener(
      "monetizationprogress",
      (event: MonetizationEvent) => {
        batcher.add({
          date: new Date().getTime(),
          value: Number(
            (
              Number(event.detail.amount) *
              10 ** (-1 * event.detail.assetScale)
            ).toFixed(event.detail.assetScale)
          ),
        });
      }
    );
    batcher.scheduleFlush();
  }, []);

  useEffect(() => {
    /* Checking if the user has any pluginIds. If not, it redirects to the settings page. */
    const fetchData = async () => {
      const pluginIdsData = await verifyPluginIDs(email);
      if (pluginIdsData.Count == 0) {
        router.push("/first-use");
      } else {
        setPluginIds(pluginIdsData.Items);
        setSelectedPluginId(pluginIdsData.Items[0].pluginId);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email, router]);

  useEffect(() => {
    setLoadingRevenue(true);
    if (email && selectedPluginId && selectedYear) {
      fetch(
        `/api/transactions/all?pluginId=${selectedPluginId}&dateYear=${selectedYear}&type=all`
      )
        .then((res) => res.json())
        .then((data) => {
          setRevenueStatistics(data);
          setLoadingRevenue(false);
        });
    }
  }, [selectedPluginId, selectedYear, email]);

  useEffect(() => {
    if (!session && status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router, status]);

  if (!session && status === "unauthenticated") {
    return <div>Not Logged In</div>;
  } else if (!session) {
    return <div></div>;
  }
  return (
    <Flex w={"100vw"} h={"100vh"} flexDir={"column"}>
      <Flex
        flexDir={"row"}
        w={"70vw"}
        height={"5em"}
        alignItems={"center"}
        alignSelf={"center"}
        justifyContent={"space-between"}
      >
        <Flex flexDir={"row"}>
          <Select
            placeholder="Select your Plugin ID"
            w={"15vw"}
            mr={"2"}
            value={selectedPluginId}
            onChange={(event) => setSelectedPluginId(event.target.value)}
          >
            {pluginIds &&
              pluginIds.map((pluginId) => (
                <option key={pluginId.pluginId} value={pluginId.pluginId}>
                  {pluginId.pluginId}
                </option>
              ))}
          </Select>
          <Select
            placeholder="Select a year"
            w={"15vw"}
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
          >
            {[2022, 2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Flex>
        <UserIcon></UserIcon>
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
                  <Heading size={"md"} ml={"5%"}>
                    Revenue of current week
                  </Heading>
                  <Heading size={"md"} ml={"5"}>
                    {selectedYear}
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
                  <Heading size={"md"} ml={"5%"}>
                    Revenue per Month
                  </Heading>
                  <Heading size={"md"} ml={"5"}>
                    {selectedYear}
                  </Heading>
                </Flex>
                {revenueStatistics && (
                  <TransactionsPerMonth
                    revenueStatistics={revenueStatistics}
                  ></TransactionsPerMonth>
                )}
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
                  <Heading size={"md"} ml={"5%"}>
                    Revenue per Year
                  </Heading>
                  <Heading size={"md"} ml={"5"}>
                    {selectedYear}
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
            Total Revenue per Payment Pointer
          </Heading>
          <Flex
            flexDir={"row"}
            alignSelf="center"
            position={"relative"}
            width="100%"
            height="75%"
          >
            {revenueStatistics && (
              <DoughnutChart
                revenueStatistics={revenueStatistics}
              ></DoughnutChart>
            )}
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
            Total Revenue per Content
          </Heading>
          <Text ml={6}>This feature is coming soon... </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
