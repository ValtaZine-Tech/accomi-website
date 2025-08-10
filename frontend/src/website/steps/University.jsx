import { Select, Alert } from "antd";
import { useState } from "react";
import { images } from "../../assets/assets";
import PropTypes from "prop-types";
import "./styles.css";

const universities = {
  "Central Region": [
    { id: 0, name: "Makerere", image: images.university1 },
    { id: 1, name: "Kyambogo", image: images.university2 },
    { id: 2, name: "UCU", image: images.university3 },
  ],
  "Western Region": [
    { id: 3, name: "MUST", image: images.university4 },
    { id: 4, name: "Kabale Uni", image: images.university5 },
  ],
  "Eastern Region": [
    { id: 5, name: "Busitema", image: images.university6 },
    { id: 6, name: "Soroti Uni", image: images.university7 },
  ],
  "Northern Region": [
    { id: 7, name: "Gulu Uni", image: images.university8 },
    { id: 8, name: "Lira Uni", image: images.university9 },
  ],
};

const popularUniversities = Object.values(universities).flat().slice(0, 6);


const University = ({ onSuccess }) => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const handleCardClick = (id) => {
    const data = { institutionId: id };
    setSelectedUniversity(id);
    onSuccess(data);
  };

  const handleUniversityChange = (id) => {
    const data = { institutionId: id };
    setSelectedUniversity(id);
    onSuccess(data);
  };

  const universityOptions = Object.entries(universities).map(
    ([region, universities]) => ({
      label: <span>{region}</span>,
      title: region,
      options: universities.map((university) => ({
        label: <span>{university.name}</span>,
        value: university.id,
      })),
    })
  );


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
                className={`university-card ${
                  selectedUniversity === university.name ? "selected" : ""
                }`}
                key={university.name}
                onClick={() => handleCardClick(university.id)}
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

          <div className="step-card-select">
            <Select
              style={{
                width: "100%",
                height: "40px",
                fontSize: "16px",
                textAlign: "left",
              }}
              placeholder="Select a university"
              onChange={handleUniversityChange}
              options={universityOptions}
            />
          </div>
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

University.propTypes = {
  onSuccess: PropTypes.func,
};

export default University;
