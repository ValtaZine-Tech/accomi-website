import './styles.css'
import { Alert } from 'antd';
import { useState } from 'react';
import { images } from "../../assets/assets";

const houseTypes = [
  { name: 'Apartment', image: images.houseType1 },
  { name: 'Studio', image: images.houseType2 },
  { name: 'Shared Room', image: images.houseType3 },
  { name: 'Single Room', image: images.houseType4 },
  { name: 'Double Room', image: images.houseType5 },
  { name: 'Hostel', image: images.houseType6 },
];

const HouseType = () => {
  const [selectedHouseType, setSelectedHouseType] = useState(null);

  

  const handleCardClick = (houseTypeName) => {
    setSelectedHouseType(houseTypeName);
  };

  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1>Choose your desired House Type</h1>
        </div>
        <div className="step-card">
          {/* <h3>Popular House Types</h3> */}
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