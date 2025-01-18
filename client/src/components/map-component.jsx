/**
 * @component MapComponent
 * @description Renders a map component using Leaflet, displaying the user's location based on provided latitude and longitude.
 */

/* NOT USING AS OF NOW */
"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

/**
 * MapComponent
 * @param {Object} props - Component properties
 * @param {number} props.userLatitude - The latitude of the user's location
 * @param {number} props.userLongitude - The longitude of the user's location
 * @returns {JSX.Element} The rendered map component displaying the user's location
 */
const MapComponent = ({ userLatitude, userLongitude }) => {
  useEffect(() => {
    if (userLatitude && userLongitude) {
      // Initialize your map or do something with the coordinates
    }
  }, [userLatitude, userLongitude]);

  return (
    <MapContainer center={[userLatitude || 20.5937, userLongitude || 78.9629]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLatitude && userLongitude && (
        <Marker position={[userLatitude, userLongitude]}>
          <Popup>Your location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
