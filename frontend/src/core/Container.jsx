// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import prop-types for validation
import './styles.css';

const Container = ({ children }) => {
  return <div className="container-card">{children}</div>;
};

// Add propTypes validation
Container.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a React node and required
};

export default Container;
