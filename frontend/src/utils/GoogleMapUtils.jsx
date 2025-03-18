import { Wrapper } from "@googlemaps/react-wrapper";
import PropTypes from 'prop-types';

const apiKeyHandler = () => {
   if (window.location.href.includes("http://localhost")) {
      return "AIzaSyCm5bW5ptLGPPA_az9aHBgccqJKpR5b-1c";
   } else {
      return "AIzaSyBLzletcXGf4MyXHtFBnQ9AueNc7wlMh4k";
   }
};
export const GoogleMapsWrapper = ({ children }) => {
   const apiKey = apiKeyHandler();

   if (!apiKey) {
      return <div>Cannot display the map: google maps api key missing</div>
   }

   return <Wrapper apiKey={apiKey}>{children}</Wrapper>
};
GoogleMapsWrapper.propTypes = {
   children: PropTypes.node.isRequired,
};

export const GMP_API_KY = apiKeyHandler;