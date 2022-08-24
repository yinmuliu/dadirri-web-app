import { useEffect, useState } from "react";

const DisplayAudio = ({ language }) => {
  const [audioClips, setAudioClips] = useState([]);

  useEffect(() => {
    const getAudioClips = async () => {
      try {
        const url = `/language/${language.language_code}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setAudioClips(data);
      } catch (err) {
        console.log("Error in getting audio data");
      }
    };
    getAudioClips();
  }, [language]);

  const clips = audioClips.map((clip) => {
    return <li>{clip.url}</li>;
  });

  return (
    <>
      <h1>Sound clips:</h1>
      <p>No one has recorded anything yet. Record the first sound clip!</p>
      <ul>{clips}</ul>
    </>
  );
};

export default DisplayAudio;
