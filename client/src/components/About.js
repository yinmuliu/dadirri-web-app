import { Heading, Stack, Text, AspectRatio } from "@chakra-ui/react";

const About = () => {
  return (
    <>
      <Stack spacing={4} my="10" mx="10">
        <Heading fontSize={"3xl"}>About Dadirri</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Rediscover the land by being aware of the languages around you, and
          through sharing your own auditory experience. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Aenean mattis tristique nulla, ut
          convallis quam imperdiet a. Sed condimentum felis nec convallis
          imperdiet. Praesent sollicitudin arcu a ultrices pellentesque. Mauris
          bibendum lacus justo, efficitur dignissim turpis lobortis eu. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Cras quis convallis arcu. Aliquam eget tellus maximus,
          interdum ex dictum, dignissim lacus.
        </Text>
        <AspectRatio maxW="700px" ratio={1}>
          <iframe
            title="naruto"
            src="https://www.youtube.com/embed/Pahz_WBSSdA"
            allowFullScreen
          />
        </AspectRatio>
        <Heading fontSize={"xl"}>References:</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Rediscover the land by being aware of the languages around you, and
          through sharing your own auditory experience. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
        </Text>
      </Stack>
    </>
  );
};

export default About;
