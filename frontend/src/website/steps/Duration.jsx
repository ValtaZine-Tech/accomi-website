import { useState } from 'react';
import './styles.css'
import { Alert } from 'antd';
import PropTypes from 'prop-types';



const Duration = ({onSuccess}) => {

  const duration = [   
        { name: 'Months', duration: "04-06" },
        { name: 'Months', duration: "06-08" },
        { name: 'Year', duration: "Less - 1" },
        { name: 'Years', duration: "1 - 2" },
        { name: 'Years', duration: "3 - 4" },
        { name: 'Years', duration: "5+" },
      
  ];
    
    const popularDuration = Object.values(duration).flat().slice(0, 6);
    
      const [selectedDuration, setSelectedDuration] = useState(null);
    
      
    
      const handleCardClick = (durationPeriod) => {
        setSelectedDuration(durationPeriod);
        onSuccess();
      };

  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1>Choose the duration for your Stay</h1>
        </div>
        <div className="step-card">
          {/* <h3>Popular Intakes</h3> */}
          <div className="intake-container">
            {popularDuration.map((duration) => (
              <div 
                className={`intake-card ${selectedDuration === duration.duration ? 'selected' : ''}`} 
                key={duration.duration} 
                onClick={() => handleCardClick(duration.duration)}
              >
                <div>
                  <h1>{duration.duration}</h1>
                </div>
                <div>
                  <p>{duration.name}</p>
                </div>
              </div>
            ))}
          </div>
          
          {selectedDuration && (
            <Alert
              message={`You have selected a duration of: ${selectedDuration}`}
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

Duration.PropTypes = {
  onSuccess: PropTypes.func,
}

export default Duration