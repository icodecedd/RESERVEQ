import {
  Box,
  Heading,
  Text,
  HStack,
  Circle,
  Flex,
  VStack,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useStatsStore } from "@/store/statsStore";

const BarGraph = () => {
  const { /*data,*/ loading } = useStatsStore();

  // Mock Data
  const data = {
    barGraph: [
      { month: "Jan", approved: 5, pending: 3 },
      { month: "Feb", approved: 8, pending: 1 },
      { month: "Mar", approved: 6, pending: 3 },
      { month: "Apr", approved: 4, pending: 5 },
      { month: "May", approved: 10, pending: 4 },
      { month: "Jun", approved: 2, pending: 4 },
      { month: "Jul", approved: 4, pending: 2 },
      { month: "Aug", approved: 10, pending: 4 },
      { month: "Sep", approved: 3, pending: 7 },
      { month: "Oct", approved: 10, pending: 4 },
      { month: "Nov", approved: 18, pending: 9 },
      { month: "Dec", approved: 1, pending: 4 },
    ],
  };

  if (loading) {
    return <Skeleton height="420px" width="100%" borderRadius="xl" mx="auto" />;
  }

  return (
    <Box bg="white" borderRadius="2xl" p={5} boxShadow="md" w="100%" h="420px">
      <Flex justify="space-between" mb={5}>
        <VStack>
          <Heading size="md" mb={-2} mr={6}>
            Request Overview
          </Heading>
          <Text fontSize="13px" textColor="gray.500">
            Monthly Approvals and Pendings
          </Text>
        </VStack>
        <HStack mb={1}>
          <Circle size="10px" bg="#166534" />
          <Text fontSize="sm" textColor="gray.500">
            Approvals
          </Text>
          <Circle size="10px" bg="#8b0000" />
          <Text fontSize="sm" textColor="gray.500">
            Pendings
          </Text>
        </HStack>
      </Flex>
      {loading ? (
        <Skeleton height="300px" width="96%" borderRadius="lg" mx="auto" />
      ) : data?.barGraph.length > 0 ? (
        <ResponsiveContainer
          width="96%"
          height="85%"
          className="recharts-wrapper"
        >
          <BarChart data={data?.barGraph}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px" }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            />
            <Bar dataKey="approved" fill="#166534" radius={[3, 3, 0, 0]} />
            <Bar dataKey="pending" fill="#8b0000" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Center h="70%">
          <Heading fontSize="14px" color="#4a5568">
            No request data available
          </Heading>
        </Center>
      )}
    </Box>
  );
};

export default BarGraph;
