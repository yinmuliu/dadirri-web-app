import { Heading, Stack, Text } from "@chakra-ui/react";

const WelcomeMsg = () => {
  return (
    <Stack spacing={4} my="10" mx="10">
      <Heading fontSize={"3xl"}>Welcome! username.</Heading>
      <Text color={"gray.600"} fontSize={"xl"}>
        Click on languages on the map near your location, listen to and enjoy
        the unique sound clips recorded on the land where the langauge is
        spoken.
      </Text>
    </Stack>
  );
};

export default WelcomeMsg;
