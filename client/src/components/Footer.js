import * as React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  ButtonGroup,
  Image,
} from "@chakra-ui/react";

const Logo = (props) => {
  return (
    <Stack direction="row">
      <Image
        boxSize="50px"
        objectFit="cover"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Australian_Aboriginal_Flag.svg/800px-Australian_Aboriginal_Flag.svg.png"
        alt="Australia Aboriginal Flag"
      />
      <Image
        boxSize="50px"
        objectFit="cover"
        src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Flag_of_the_Torres_Strait_Islanders.svg/1200px-Flag_of_the_Torres_Strait_Islanders.svg.png"
        alt="Torres Strait Islander Flag"
      />
      <Image
        boxSize="50px"
        src="https://media.them.us/photos/5b1ef721bfa1890010f0e15e/3:2/w_1079,h_719,c_limit/new-pride-flag-01.jpg"
        alt="Rainbow Flag"
      />
    </Stack>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "4fr 2fr" }}
          spacing={8}
        >
          <Stack align={"flex-start"}>
            <Text as="em" fontSize="md" color="black">
              Acknowledgement of Country
            </Text>
            <Text fontSize="sm" color="subtle">
              With respect, curiosity and empathy for many of the world's oldest
              languages and cultures in the land I am now living in, I made
              'Dadirri' to acknowledge the Traditional Custodians of country
              throughout Australia, and their connections to land, sea and
              community. As a first-generation migrant living on the land
              belonging to the Wurundjeri people of the Kulin Nation, I pay my
              respect to the Elders past, present and emerging, and extend that
              respect to all Aboriginal and Torres Strait Islander peoples
              today.
            </Text>
          </Stack>
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue("gray.700", "white")} />
            </Box>
            <Text fontSize={"sm"}>
              © Dadirri is made by Yinmu with respect and love, 2022
            </Text>
            <Stack direction={"row"} spacing={6}>
              <ButtonGroup variant="ghost">
                <IconButton
                  as="a"
                  href="#"
                  aria-label="LinkedIn"
                  icon={<FaLinkedin fontSize="1.5rem" />}
                />
                <IconButton
                  as="a"
                  href="#"
                  aria-label="GitHub"
                  icon={<FaGithub fontSize="1.5rem" />}
                />
              </ButtonGroup>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
