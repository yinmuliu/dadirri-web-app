import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Map = ({ languages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [language, setLanguage] = useState(null);

  const openLangDetails = (langID) => {
    const languageToShow = languages.find((lang) => lang._id === langID);
    // format languageToShow.language_synonym from | to ,
    languageToShow.language_synonym = languageToShow.language_synonym
      .split("|")
      .join(", ");
    setLanguage(languageToShow);
    onOpen();
  };

  return (
    <>
      <MapContainer center={[-26.5, 133]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {languages.map((lang) => (
          <Marker
            key={lang._id}
            position={[
              lang.approximate_latitude_of_language_variety,
              lang.approximate_longitude_of_language_variety,
            ]}
          >
            <Popup>
              {lang.language_name} <br />{" "}
              <Link ref={btnRef} onClick={() => openLangDetails(lang._id)}>
                More..
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {language && (
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerHeader>{language.language_name}</DrawerHeader>

            <DrawerBody>
              <h4>
                Synonym: <br /> {language.language_synonym}
              </h4>
              <br />
              <h4>
                AIATSIS Code:{" "}
                <Link href={language.uri} isExternal>
                  {language.language_code} <ExternalLinkIcon mx="1px" />
                </Link>
              </h4>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Map;
