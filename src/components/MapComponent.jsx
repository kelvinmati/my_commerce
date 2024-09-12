import React, { useRef, useCallback, useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
const containerStyle = {
  height: "60vh",
  width: "100%",
  margin: "0px auto",
  position: "relative",
};
// const center = {
//   lat: -1.2659,
//   lng: 36.85524,
// };
const options = {
  disableDefaultUI: true,
};
// const position = {
//   lat: -1.26591,
//   lng: 36.85524,
// };
const libraries = ["places"];
const MapComponent = ({ setOpen, setDeliveryAddress }) => {
  const [marker, setMarker] = useState({
    lat: "",
    lng: "",
  });
  console.log("marker is", marker);
  // const [selected, setSelected] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setMarker(currentPosition);
  };

  // control re-renders
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  });

  // pan to the chosen address
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  });

  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey: "AIzaSyCrrqzlO5H6S3li-2B8SkfluHvQQMxq8D4",
    googleMapsApiKey: "AIzaSyBYHRGJadNySkzYGvfz2jPdKe8v6X_99gc",
    libraries,
  });
  if (loadError) return "Error loading the map";
  if (!isLoaded)
    return (
      <div className="absolute top-[30%] left-[50%]">
        {" "}
        <main className=" w-full text-center mt-10 ">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </main>
      </div>
    );

  return (
    <section className="h-screen w-full bg-[rgba(0,0,0,0.5)]  bg-blend-multiply fixed top-0">
      <div className=" bg-white text-center w-[90%] sm:w-[70%] shadow  mx-auto py-8 p-3 sm:p-5 rounded-lg  absolute top-[50px] left-[0px] right-[0px] ">
        <div
          onClick={() => setOpen(false)}
          className=" cursor-pointer absolute top-3 right-3 bg-orange text-white p-2 rounded-full w-9 h-9"
        >
          X
        </div>

        <Search panTo={panTo} setDeliveryAddress={setDeliveryAddress} />

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={marker}
          // center={marker}
          zoom={15}
          options={options}
          onLoad={onMapLoad}
        >
          <Locate panTo={panTo} />
          <Marker
            // draggable={true}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        </GoogleMap>
      </div>
    </section>
  );
};

export default MapComponent;

const Locate = ({ panTo }) => {
  return (
    <div className="absolute right-3 top-2  ">
      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
              console.log("position is", position);
            },
            () => null
          );
        }}
        className="bg-gray-300 rounded flex justify-center items-center p-1.5"
      >
        <ion-icon name="locate-outline"></ion-icon>
      </button>
    </div>
  );
};

const Search = ({ panTo, setDeliveryAddress }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();
  //   {
  //   requestOptions: {
  //     location: { lat: () => -1.26591, lng: () => 36.85524 },
  //     location: { lat: () => -1.286389, lng: () => 36.817223 },
  //     radius: 200 * 1000,
  //   },
  // }
  return (
    <div className="my-5">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          setDeliveryAddress(address);
          // console.log("Address is", address);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = getLatLng(results[0]);
            console.log("lat:", lat, "lng:", lng);
            panTo({ lat, lng });
            console.log("searched address", getLatLng(results[0]));
            // setMarker(results[0]);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          className="p-2 border  rounded w-[90%] sm:w-1/2 "
          placeholder="Enter your delivery address"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList className="m-2 bg-white">
            {status === "OK" &&
              data?.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};
