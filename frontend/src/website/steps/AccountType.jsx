import { useState } from "react";
import PropTypes from 'prop-types';
import './styles.css';
import Navbar from "../../partials/Navbar";
import { Link } from "react-router-dom";

const AccountType = ({ onAccountTypeChange }) => {
    const accountTypes = [
        { type: "Landlord", path: "/landlord-signup" },
        { type: "Agent", path: "/agent-signup" },
        { type: "Student", path: "/student-signup" },
    ];

    const [selectedAccountType, setSelectedAccountType] = useState(null);

    const handleCardClick = (accountTypeName) => {
        setSelectedAccountType(accountTypeName);
        onAccountTypeChange(accountTypeName);
    };

    return (
        <>
            <Navbar />
            <div className="account-step-container">
                <div className="step-card">
                    <h1>Choose your Account Type</h1>
                </div>
                <div className="step-card">
                    <div className="account-type-container">
                        {accountTypes.map((accountType) => (
                            <Link to={accountType.path} key={accountType.type}>
                                <div
                                    className={`account-type-card ${selectedAccountType === accountType.type ? 'selected' : ''}`}
                                    onClick={() => handleCardClick(accountType.type)}
                                >
                                    <div>
                                        <img src="" alt="" />
                                    </div>
                                    <div>
                                        <p>{accountType.type}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

AccountType.propTypes = {
    onAccountTypeChange: PropTypes.func,
};

export default AccountType;