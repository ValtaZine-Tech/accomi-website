import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ModalContext = createContext();

// useModal hook moved to a separate file

export const ModalProvider = ({ children }) => {
  const [isLoginModalVisible, setLoginModalVisible] = useState(true);
  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);

  const showLoginModal = () => setLoginModalVisible(true);
  const hideLoginModal = () => setLoginModalVisible(false);

  const showSignUpModal = () => setSignUpModalVisible(true);
  const hideSignUpModal = () => setSignUpModalVisible(false);

  return (
    <ModalContext.Provider value={{
      isLoginModalVisible,
      isSignUpModalVisible,
      showLoginModal,
      hideLoginModal,
      showSignUpModal,
      hideSignUpModal,
    }}>
      {children}
    </ModalContext.Provider>
)};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
