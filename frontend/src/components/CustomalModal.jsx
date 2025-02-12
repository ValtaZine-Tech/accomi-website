import PropTypes from 'prop-types';

export const CustomModal = ({ visible, onClose, children }) => (
  visible && (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <button className="custom-modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-x" style={{ color: "#ffffff" }}></i>
        </button>
        {children}
      </div>
    </div>
  )
);

CustomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};