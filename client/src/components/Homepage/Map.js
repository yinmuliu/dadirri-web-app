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
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";

const SearchResult = ({ results, openDetails }) => {
  return (
    <Accordion defaultIndex={[0]} allowToggle my="5" mx="5">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Click to show search results
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {results.map((result) => (
            <Button
              key={result._id}
              colorScheme="teal"
              size="xs"
              mx="2"
              my="1"
              onClick={() => openDetails(result._id)}
            >
              {result.language_name}
            </Button>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const Map = ({ languages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [language, setLanguage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openLangDetails = (langID) => {
    const languageToShow = languages.find((lang) => lang._id === langID);
    languageToShow.language_synonym = languageToShow.language_synonym
      .split("|")
      .join(", ");
    setLanguage(languageToShow);
    onOpen();
    setSearchTerm("");
  };

  const handleSearch = async () => {
    const url = `https://data.gov.au/data/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%22e9a9ea06-d821-4b53-a05f-877409a1a19c%22%20WHERE%20language_name%20LIKE%20'%${searchTerm}%'`;
    const res = await fetch(url);
    const results = await res.json();
    setSearchResults(results.result.records);
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
          size="sm"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <FormControl mt="5">
              <FormLabel mx="5" my="3">
                Search for a language
              </FormLabel>
              <Input
                type="text"
                // value={value}
                onChange={handleSearchTermChange}
                mx="4"
                maxW={300}
                placeholder="Type in a language"
                _placeholder={{ opacity: 1, color: "gray.500" }}
              />
              <SearchIcon mx="1px" onClick={handleSearch} />
            </FormControl>

            <SearchResult
              results={searchResults}
              openDetails={openLangDetails}
            />

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
