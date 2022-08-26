import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Textarea,
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
  const [audioFile, setAudioFile] = useState(null);
  const [info, setInfo] = useState(null);

  const handleAudioStop = (data) => {
    setAudioDetails(data);
  };

  const handleAudioUpload = async (file) => {
    console.log(file);
    setAudioFile(file);
  };

  const handleReset = () => {
    setAudioDetails(initialAudioDetails);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setInfo(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    formData.append("language_name", language.language_name);
    formData.append("info", info);
    console.log(...formData);
    const res = await fetch(`/new-recording/${language.language_code}`, {
      method: "POST",
      body: formData,
    });
    setInfo(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Record a sound clip</ModalHeader>
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
          <>
            <Text mb="8px">Description:</Text>
            <Textarea
              value={info}
              onChange={handleInputChange}
              placeholder="Add a few words to describe your recording"
              size="sm"
            />
          </>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RecordAudio;
