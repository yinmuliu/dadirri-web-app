import { Heading, Stack, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const Userpage = ({ user }) => {
  const [audioClips, setAudioClips] = useState([]);

  useEffect(() => {
    const getAudioClips = async () => {
      try {
        const url = `/user/${user.id}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setAudioClips(data.files);
      } catch (err) {
        console.log("Error in getting user's audio data");
      }
    };
    getAudioClips();
  }, []);

  const clips = audioClips.map((clip) => {
    return (
      <div>
        <ReactAudioPlayer src={clip.url} controls />
      </div>
    );
  });

  return (
    <>
      <Stack spacing={4} my="10" mx="10">
        <Heading fontSize={"3xl"}>{user.username}'s Sound Clips</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          View your audio experiences, edit or delete.
        </Text>
        <Box>{clips}</Box>
      </Stack>
    </>
  );
};

export default Userpage;
