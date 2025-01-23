import {Alert } from 'antd';
import { useState } from 'react';


const Transfer = () => {
  const intakes = {
    "Central Region": [
      { name: 'Jan - Feb', month: "01-02" },
      { name: 'May - Jun', month: "05-06" },
      { name: 'Sept - Oct', month: "09-10" },
    ],
    
  };
  
  const popularIntakes = Object.values(intakes).flat().slice(0, 3);
  
    const [selectedIntake, setSelectedIntake] = useState(null);
  
    
  
    const handleCardClick = (intakePeriod) => {
      setSelectedIntake(intakePeriod);
    };
  
    

  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1>Choose the period your Moving In</h1>
        </div>
        <div className="step-card">
          {/* <h3>Popular Intakes</h3> */}
          <div className="intake-container">
            {popularIntakes.map((intake) => (
              <div 
                className={`intake-card ${selectedIntake === intake.name ? 'selected' : ''}`} 
                key={intake.name} 
                onClick={() => handleCardClick(intake.name)}
              >
                <div>
                  <h1>{intake.month}</h1>
                </div>
                <div>
                  <p>{intake.name}</p>
                </div>
              </div>
            ))}
          </div>
          
          {selectedIntake && (
            <Alert
              message={`Selected Intake: ${selectedIntake}`}
              type="info"
              showIcon
              style={{ margin: "20px 40px" }}
            />
          )}
        </div>
      </div>
    </>
  )
}


export default Transfer