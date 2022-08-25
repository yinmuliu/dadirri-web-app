import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useDisclosure, Button } from "@chakra-ui/react";
import RecordAudio from "./RecordAudio";

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
      <div>
        <ReactAudioPlayer src={clip.url} controls />
      </div>
    );
  });

  return (
    <>
      <h1>Sound clips:</h1>
      {audioClips.length === 0 ? (
        <>
          <p>No one has recorded anything yet. Record the first sound clip!</p>
          <Button onClick={onOpen} colorScheme="blue" variant="ghost">
            Record
          </Button>
          <RecordAudio isOpen={isOpen} onClose={onClose} />
        </>
      ) : (
        <ul>
          {clips}
          <a href="#">Record one for this langauge</a>
        </ul>
      )}
    </>
  );
};

export default DisplayAudio;
