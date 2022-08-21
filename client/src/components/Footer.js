import {
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
  Image,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";
import * as React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <Container as="footer" role="contentinfo" py={{ base: "10", md: "10" }}>
        <Stack spacing={{ base: "4", md: "4" }}>
          <Stack>
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
          </Stack>
          <Text fontSize="sm" color="subtle">
            &copy; {new Date().getFullYear()} Dadirri is made by Yinmu with
            respect and love, 2022
          </Text>

          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
      </Container>
    </div>
  );
};

export default Footer;
