import React, { createContext, useState, useEffect } from 'react';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [accountData, setAccountData] = useState(() => {
    const storedAccountData = localStorage.getItem('AccountData');
    return storedAccountData ? JSON.parse(storedAccountData) : null;
  });

  useEffect(() => {
    localStorage.setItem('AccountData', JSON.stringify(accountData));
  }, [accountData]);

  return (
    <AccountContext.Provider value={{ accountData, setAccountData }}>
      {children}
    </AccountContext.Provider>
  );
};
