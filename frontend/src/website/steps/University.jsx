/* eslint-disable no-unused-vars */
import { Select, Alert } from 'antd';
import { useState } from 'react';
import { images } from "../../assets/assets";

const universities = {
  "Central Region": [
    { name: 'Makerere', image: images.university1 },
    { name: 'Kyambogo', image: images.university2 },
    { name: 'UCU', image: images.university3 },
  ],
  "Western Region": [
    { name: 'MUST', image: images.university4 },
    { name: 'Kabale Uni', image: images.university5 },
  ],
  "Eastern Region": [
    { name: 'Busitema', image: images.university6 },
    { name: 'Soroti Uni', image: images.university7 },
  ],
  "Northern Region": [
    { name: 'Gulu Uni', image: images.university8 },
    { name: 'Lira Uni', image: images.university9 },
  ],
};

const popularUniversities = Object.values(universities).flat().slice(0, 6);

const University = () => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const handleUniversityChange = (value) => {
    setSelectedUniversity(value);
  };

  const handleCardClick = (universityName) => {
    setSelectedUniversity(universityName);
  };

  const universityOptions = Object.entries(universities).map(([region, universities]) => ({
    label: <span>{region}</span>,
    title: region,
    options: universities.map((university) => ({
      label: <span>{university.name}</span>,
      value: university.name,
    })),
  }));

  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1>Choose your current University</h1>
        </div>
        <div className="step-card">
          <div className="university-container">
            {popularUniversities.map((university) => (
              <div 
                className={`university-card ${selectedUniversity === university.name ? 'selected' : ''}`} 
                key={university.name} 
                onClick={() => handleCardClick(university.name)}
              >
                <div>
                  <img src={university.image} alt="" />
                </div>
                <div>
                  <p>{university.name}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <h3>Other Universities</h3>
          <div className="university-select">
            <Select
              style={{ width: '100%', height: '40px', fontSize: '16px' }}
              placeholder="Select a university"
              onChange={handleUniversityChange}
              options={universityOptions}
            />
          </div> */}
          {selectedUniversity && (
            <Alert
              message={`Selected University: ${selectedUniversity}`}
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

export default University;