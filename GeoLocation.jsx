import React from "react";
import { useGeolocated } from "react-geolocated";

const GeoLocationComponent = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  return !isGeolocationAvailable ? (
    <div className="d-none">Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div></div>
  ) : coords ? (
    <table className="d-none">
      <tbody>
        <tr>
          <td>latitude</td>
          <td>{coords.latitude}</td>
        </tr>
        <tr>
          <td>longitude</td>
          <td>{coords.longitude}</td>
        </tr>
        <tr>
          <td>altitude</td>
          <td>{coords.altitude}</td>
        </tr>
        <tr>
          <td>heading</td>
          <td>{coords.heading}</td>
        </tr>
        <tr>
          <td>speed</td>
          <td>{coords.speed}</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div></div>
  );
};

export default GeoLocationComponent;
