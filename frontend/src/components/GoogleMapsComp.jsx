import { GoogleMap, LoadScript } from '@react-google-maps/api';


const center = { lat: 48.8584, lng: 2.2945 }; 

const GoogleMapsComp = () => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    
    >
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '380px', borderRadius: '2rem' }}
        center={center}
        zoom={8}
      >
        {/* Map content */}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsComp;