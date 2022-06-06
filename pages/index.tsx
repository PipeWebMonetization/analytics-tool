import {
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import UserIcon from "../components/dashboard/userIcon";
import BarsChart from "../components/dashboard/barsChart";
import DoughnutChart from "../components/dashboard/doughnutChart";
import { useEffect, useState } from "react";
import { transactionsResults } from "../lib/database/databaseService";

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loadingRevenue, setLoadingRevenue] = useState<boolean>(false);
  const [revenueStatistics, setRevenueStatistics] =
    useState<transactionsResults>({
      perMonth: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
        "11": 0,
        "12": 0,
        dateYear: 0,
        userId: "",
      },
    });

  useEffect(() => {
    setLoadingRevenue(true);
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        setRevenueStatistics(data);
        setLoadingRevenue(false);
      });
  }, []);

  if (!session) {
    return (
      <Flex>
        <Heading>You are not signed in!</Heading>
      </Flex>
    );
  } else {
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
          <Flex flexDir={"row"} justifyContent={"space-between"} w={"100%"}>
            <Heading size={"md"} ml={"5%"} mt={"1%"}>
              Revenue by Month
            </Heading>
            <Flex flexDir={"row"}>
              <Button borderRadius={0}>Day</Button>
              <Button borderRadius={0} bgColor={"pipewebmonetization.yellow"}>
                Month
              </Button>
              <Button borderRadius={0}>Year</Button>
            </Flex>
          </Flex>
          <Flex w={"65vw"} h={"25vh"} alignSelf={"center"} mt={"4%"}>
            <BarsChart revenueStatistics={revenueStatistics}></BarsChart>
          </Flex>
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
            <Heading size={"md"} ml={"5%"} mt={"1%"}>
              Revenue by Payment Pointer
            </Heading>
            <Flex w={"14vw"} h={"25vh"}>
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
            <Heading size={"md"} ml={"5%"} mt={"1%"}>
              Revenue by Content
            </Heading>
            <Table>
              <Thead>
                <Tr>
                  <Td>Content</Td>
                </Tr>
                <Tr>
                  <Td>Revenue</Td>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Danilinho&apos;s pancake recipe</Td>
                  <Td>U$ 200</Td>
                </Tr>
                <Tr>
                  <Td>Pivas&apos;s cupcake recipe</Td>
                  <Td>U$ 200</Td>
                </Tr>
                <Tr>
                  <Td>Andrey&apos;s guide to a long term romance</Td>
                  <Td>U$ 5000</Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
        </Flex>
      </Flex>
    );
  }
};

export default Dashboard;
