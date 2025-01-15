import './styles.css'
import { Select, Alert } from 'antd';
import { useState } from 'react';
import { images } from "../../assets/assets";

const houseTypes = [
  { name: 'Apartment', image: images.houseType1 },
  { name: 'Studio', image: images.houseType2 },
  { name: 'Shared Room', image: images.houseType3 },
  { name: 'Single Room', image: images.houseType4 },
  { name: 'Hostel', image: images.houseType5 },
];

const HouseType = () => {
  const [selectedHouseType, setSelectedHouseType] = useState(null);

  const handleHouseTypeChange = (value) => {
    setSelectedHouseType(value);
  };

  const handleCardClick = (houseTypeName) => {
    setSelectedHouseType(houseTypeName);
  };

  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1>Choose your House Type</h1>
        </div>
        <div className="step-card">
          <h3>Popular House Types</h3>
          <div className="house-type-container">
            {houseTypes.slice(0, 6).map((houseType) => (
              <div
                className={`house-type-card ${selectedHouseType === houseType.name ? 'selected' : ''}`}
                key={houseType.name}
                onClick={() => handleCardClick(houseType.name)}
              >
                <div>
                  <img src={houseType.image} alt="" />
                </div>
                <div>
                  <p>{houseType.name}</p>
                </div>
              </div>
            ))}
          </div>
          <h3>Other House Types</h3>
          <div className="house-type-select">
            <Select
              style={{ width: '100%', height: '40px', fontSize: '16px' }}
              placeholder="Select a house type"
              onChange={handleHouseTypeChange}
              options={houseTypes.map((houseType) => ({
                label: <span>{houseType.name}</span>,
                value: houseType.name,
              }))}
            />
          </div>
          {selectedHouseType && (
            <Alert
              message={`Selected House Type: ${selectedHouseType}`}
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

export default HouseType;