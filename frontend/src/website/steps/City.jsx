/* eslint-disable no-unused-vars */
import { images } from "../../assets/assets";
import { Select, Alert } from 'antd';
import { useState } from 'react';

const cities = {
  "Central Region": [
    { name: 'Kampala', image: images.city1 },
    { name: 'Entebbe', image: images.city1 },
    { name: 'Jinja', image: images.city1 },
  ],
  "Western Region": [
    { name: 'Mbarara', image: images.city1 },
    { name: 'Kabale', image: images.city1 },
  ],
  "Eastern Region": [
    { name: 'Mbale', image: images.city1 },
    { name: 'Soroti', image: images.city1 },
  ],
  "Northern Region": [
    { name: 'Gulu', image: images.city1 },
    { name: 'Lira', image: images.city1 },
  ],
};

const popularCities = Object.values(cities).flat().slice(0, 6);

const City = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const handleCardClick = (cityName) => {
    setSelectedCity(cityName);
  };

  const cityOptions = Object.entries(cities).map(([region, cities]) => ({
    label: <span>{region}</span>,
    title: region,
    options: cities
      .filter((city) => !popularCities.some((popularCity) => popularCity.name === city.name))
      .map((city) => ({
        label: <span>{city.name}</span>,
        value: city.name,
      })),
  }));

  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1>Choose your desired City Destination</h1>
        </div>
        <div className="step-card">
          <div className="city-container">
            {popularCities.map((city) => (
              <div 
                className={`city-card ${selectedCity === city.name ? 'selected' : ''}`} 
                key={city.name} 
                onClick={() => handleCardClick(city.name)}
              >
                <div>
                  <img src={city.image} alt="" />
                </div>
                <div>
                  <p>{city.name}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <h3>Other Cities</h3>
          <div className="city-select">
            <Select
              style={{ width: '100%', height: '40px', fontSize: '16px' }}
              placeholder="Select a city"
              onChange={handleCityChange}
              options={cityOptions}
            />
          </div> */}
          {selectedCity && (
            <Alert
              message={`Selected City: ${selectedCity}`}
              type="info"
              showIcon
              style={{ margin: "20px 40px" }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default City;