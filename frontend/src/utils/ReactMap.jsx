import React, { useEffect, useRef } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const DEFAULT_CENTER = { lat: 0.3584, lng: 32.5945 };
const DEFAULT_ZOOM = 12;
const DEMO_MAP_ID = "DEMO_MAP_ID";

export default function GoogleMapWithMarkers({ className, streetViewLocation, locations }) {
   const mapRef = useRef(null);
   const streetViewRef = useRef(null);

   useEffect(() => {
      const initMap = async () => {
         const map = new window.google.maps.Map(mapRef.current, {
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            mapId: DEMO_MAP_ID
         });

         const infoWindow = new window.google.maps.InfoWindow({
            content: "",
            disableAutoPan: true
         });

         const markers = locations.map((position, i) => {
            const pin = new window.google.maps.Marker({
               position: position,
               label: {
                  text: String.fromCharCode(0xe88a),
                  fontFamily: "Material Icons",
                  color: "#ffffff",
                  fontSize: "18px"
               },
               title: position.name
            });

            pin.addListener("click", () => {
               infoWindow.setContent(`${position?.lat}, ${position?.lng}`);
               infoWindow.open(map, pin);
            });

            return pin;
         });

         new MarkerClusterer({ markers, map });

         if (streetViewLocation) {
            const panorama = new window.google.maps.StreetViewPanorama(streetViewRef.current, {
               position: streetViewLocation,
               pov: { heading: 165, pitch: 0 },
               zoom: 1
            });
            map.setStreetView(panorama);
         }
      };

      if (window.google) {
         initMap();
      }
   }, [streetViewLocation]);

   return (
      <div className={className} style={{ display: "flex", width: "100%", height: "100%" }}>
         <div ref={mapRef} style={{ width: streetViewLocation ? "70%" : "100%", height: "100%" }} />
         {streetViewLocation && <div ref={streetViewRef} style={{ width: "30%", height: "100%" }} />}
      </div>
   );
}