import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        bg="white"
        p={"2px"}
        w="100%"
        m={"40px 0 15px 0"}
        justifyContent={"center"}
        borderRadius="lg"
      >
        <Text textAlign={"center"} fontSize={"4xl"} fontFamily={"Work Sans"}>
          Chit-Chat-Now
        </Text>
      </Box>
      <Box
        d="flex"
        bg="white"
        p={4}
        w="100%"
        m={"5px 0 15px 0"}
        justifyContent={"center"}
        borderRadius="lg"
      >
        <Tabs variant="soft-rounded" colorScheme="gray" isFitted mb={"1.5"}>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
