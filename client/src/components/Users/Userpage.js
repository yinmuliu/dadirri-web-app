import {
  Heading,
  Stack,
  Text,
  Button,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const EditInfo = ({ isOpen, onClose, audioClip, handleUpdateInfo }) => {
  const [info, setInfo] = useState(audioClip.info);

  const handleInputChange = (e) => {
    const updatedInput = e.target.value;
    setInfo(updatedInput);
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("info", info);
    const res = await fetch(`/editfile/${audioClip.file_id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    handleUpdateInfo(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Description</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="8px">Description:</Text>
          <Textarea
            value={info}
            onChange={handleInputChange}
            placeholder="Add a few words to describe your recording"
            size="sm"
          />
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

const AudioList = ({ audioClips, handleDelete, handleUpdateInfo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cards = audioClips.map((clip) => (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">Language: {clip.language_name}</Text>
      </Stack>

      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
          {clip.info}
          <ReactAudioPlayer src={clip.url} controls />
        </Text>
        <Stack direction={{ base: "column", md: "row" }}>
          <Button variant="outline" colorScheme="green" onClick={onOpen}>
            Edit Description
            <EditInfo
              isOpen={isOpen}
              onClose={onClose}
              audioClip={clip}
              handleUpdateInfo={handleUpdateInfo}
            />
          </Button>
          <Button
            colorScheme="green"
            onClick={() => handleDelete(clip.file_id)}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Stack>
  ));

  return <>{cards}</>;
};

const Userpage = ({ user }) => {
  const [audioClips, setAudioClips] = useState([]);

  useEffect(() => {
    const getAudioClips = async () => {
      try {
        const url = `/user/${user.id}`;
        const res = await fetch(url);
        const data = await res.json();
        setAudioClips(data.files);
      } catch (err) {
        console.log("Error in getting user's audio data");
      }
    };
    getAudioClips();
  }, []);

  const handleDelete = async (fileID) => {
    await fetch(`/file/${fileID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedClips = audioClips.filter((clip) => clip.file_id !== fileID);
    setAudioClips(updatedClips);
  };

  const handleUpdate = (updatedAudioFile) => {
    const index = audioClips.findIndex(
      (clip) => clip.file_id === updatedAudioFile.file_id
    );
    setAudioClips([
      ...audioClips.slice(0, index),
      updatedAudioFile,
      ...audioClips.slice(index + 1),
    ]);
  };

  return (
    <>
      <Stack spacing={4} my="10" mx="10">
        <Heading fontSize={"3xl"}>{user.username}'s Sound Clips</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          View your audio experiences, edit or delete.
        </Text>
        <AudioList
          audioClips={audioClips}
          handleDelete={handleDelete}
          handleUpdateInfo={handleUpdate}
        />
      </Stack>
    </>
  );
};

export default Userpage;
