import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";

const initialAudioDetails = {
  url: null,
  blob: null,
  chunks: null,
  duration: {
    h: 0,
    m: 0,
    s: 0,
  },
};

const RecordAudio = ({ isOpen, onClose, language }) => {
  const [audioDetails, setAudioDetails] = useState(initialAudioDetails);

  const handleAudioStop = (data) => {
    console.log(data);
    setAudioDetails(data);
  };

  const handleAudioUpload = async (file) => {
    console.log(language);
    console.log(file);

    const formData = new FormData();
    formData.append("audio_file", file);
    formData.append("language_name", language.language_name);
    console.log(...formData);
    const res = await fetch(`/new-recording/${language.language_code}`, {
      method: "POST",
      body: formData,
    });
  };

  const handleReset = () => {
    setAudioDetails(initialAudioDetails);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Audio Record</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Recorder
            className="recorder"
            record={true}
            title={"New recording"}
            audioURL={audioDetails.url}
            showUIAudio
            handleAudioStop={(data) => handleAudioStop(data)}
            handleAudioUpload={(data) => handleAudioUpload(data)}
            handleReset={handleReset}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RecordAudio;
