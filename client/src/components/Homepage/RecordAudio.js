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
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";

const RecordAudio = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Audio Record</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Recorder
            record={true}
            title={"New recording"}
            audioURL={this.state.audioDetails.url}
            showUIAudio
            handleAudioStop={(data) => this.handleAudioStop(data)}
            handleAudioUpload={(data) => this.handleAudioUpload(data)}
            handleCountDown={(data) => this.handleCountDown(data)}
            handleReset={() => this.handleReset()}
            mimeTypeToUseWhenRecording={`audio/webm`}
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
