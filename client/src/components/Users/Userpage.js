import { Heading, Stack, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const AudioList = ({ audioClips, handleDelete }) => {
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
          <Button variant="outline" colorScheme="green">
            Edit Description
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

  return (
    <>
      <Stack spacing={4} my="10" mx="10">
        <Heading fontSize={"3xl"}>{user.username}'s Sound Clips</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          View your audio experiences, edit or delete.
        </Text>
        <AudioList audioClips={audioClips} handleDelete={handleDelete} />
      </Stack>
    </>
  );
};

export default Userpage;
