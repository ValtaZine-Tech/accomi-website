import { images } from "../../assets/assets";
import { Alert } from 'antd';
import PropTypes from "prop-types";
import { useState } from 'react';

const countries = {
  "Central Region": [
    { id: 0, name: 'UAE', image: images.country1 },
    { id: 1, name: 'Uganda', image: images.country1 },
  ],
};

const popularCities = Object.values(countries).flat().slice(0, 6);

const Country = ({onSuccess}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCardClick = (id) => {
    const data = { countryId: id };
    setSelectedCountry(id);
    onSuccess(data);
  };


  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1>Choose your current or desired Country </h1>
          {selectedCountry && (
            <Alert
              message={`Selected Country: ${selectedCountry}`}
              type="info"
              showIcon
              style={{ margin: "20px 40px" }}
            />
          )}
        </div>
        <div className="step-card">
          <div className="city-container">
            {popularCities.map((country) => (
              <div 
                className={`city-card ${selectedCountry === country.name ? 'selected' : ''}`} 
                key={country.name} 
                onClick={() => handleCardClick(country.id)}
              >
                <div>
                  <img src={country.image} alt="" />
                </div>
                <div>
                  <p>{country.name}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

Country.propTypes = {
  onSuccess: PropTypes.func,
};

export default Country;