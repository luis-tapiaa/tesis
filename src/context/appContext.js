import React, { createContext, useContext, useState } from 'react';

//import Notification from '../components/Notification/Notification';
import { Toast } from '../smart-components';
import { getCookie, setCookie } from '../util';

const AppContext = createContext();

const AppState = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [token, setTokengql] = useState(getCookie('tokengql'));
  const [usuario, setAuth] = useState({});

  const setToken = value => {
    setCookie('tokengql', value);
    setTokengql(value);
  };

  const sendMessage = toast => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, ...toast }]);
  };

  const dropMessage = id => {
    setToasts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        token,
        usuario,
        setAuth,
        setToken,
        sendMessage,
        dropMessage
      }}
    >
      <div className="toast-container">
        {toasts.map((t, i) => (
          <Toast key={i} {...t} />
        ))}
      </div>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppState;
