import { useState } from 'react';
import './styles.css'
import { Alert } from 'antd';

const Budget = () => {

  const budget = [   
    { estimate: '250k', currency: 'UGX' },
    { estimate: '400k', currency: 'UGX' },
    { estimate: '600k', currency: 'UGX' },
    { estimate: '800k', currency: 'UGX' },
    { estimate: '1M', currency: 'UGX' },
    { estimate: '1.5M+', currency: 'UGX' },
];

const popularBudgets = Object.values(budget).flat().slice(0, 6);
    
      const [selectedBudget, setSelectedBudget] = useState(null);
    
      
    
      const handleCardClick = (estimateBudget) => {
        setSelectedBudget(estimateBudget);
      };
  return (
    <>
      <div className="step-container">
        <div className="step-card">
          <h1>Choose your estimated Budget Range</h1>
        </div>
        <div className="step-card">
          {/* <h3>Popular Intakes</h3> */}
          <div className="intake-container">
            {popularBudgets.map((budget) => (
              <div 
                className={`intake-card ${selectedBudget === budget.estimate ? 'selected' : ''}`} 
                key={budget.estimate} 
                onClick={() => handleCardClick(budget.estimate)}
              >
                <div>
                  <h1>{budget.estimate}</h1>
                </div>
                <div>
                  <p>{budget.currency}</p>
                </div>
              </div>
            ))}
          </div>
          
          {selectedBudget && (
            <Alert
              message={`You have selected an estimate of: UGX.${selectedBudget} `}
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

export default Budget