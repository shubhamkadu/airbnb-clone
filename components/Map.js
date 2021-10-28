import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";
function Map({ searchResult }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  // transform the search result object into the
  // {latitude:45.254236,loagitude:765.435452}
  // object

  const coordinates = searchResult.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));

  // the latitude and longitude of the center of locations coordinates

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/shubhampkadu/ckvafu7ng22zn14rnf0l24w41"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResult.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              aria-label="push-pin"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
            >
              📍
            </p>
          </Marker>
          {/* the popup that should show id we click in a marker */}

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              <div>{result.title}</div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
