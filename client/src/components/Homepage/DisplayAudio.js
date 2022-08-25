import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import {
  useDisclosure,
  Button,
  Box,
  List,
  ListItem,
  ListIcon,
  Heading,
  Text,
} from "@chakra-ui/react";
import RecordAudio from "./RecordAudio";
import { ChevronRightIcon } from "@chakra-ui/icons";

const DisplayAudio = ({ language }) => {
  const [audioClips, setAudioClips] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getAudioClips = async () => {
      try {
        const url = `/language/${language.language_code}`;
        const res = await fetch(url);
        const data = await res.json();
        setAudioClips(data);
      } catch (err) {
        console.log("Error in getting audio data");
      }
    };
    getAudioClips();
  }, [language]);

  const clips = audioClips.map((clip) => {
    return (
      <ListItem>
        <ListIcon as={ChevronRightIcon} color="green.500" />
        <ReactAudioPlayer src={clip.url} controls />
      </ListItem>
    );
  });

  return (
    <Box my="5">
      <Heading as="h4" size="md">
        Sound clips
      </Heading>
      {audioClips.length === 0 ? (
        <Text fontSize="md" my="2">
          No one has recorded anything yet. Record the first sound clip!
        </Text>
      ) : (
        <List spacing={3}>{clips}</List>
      )}
      <Button my="2" onClick={onOpen} colorScheme="blue" variant="ghost">
        Record New
      </Button>
      <RecordAudio isOpen={isOpen} onClose={onClose} language={language} />
    </Box>
  );
};

export default DisplayAudio;
