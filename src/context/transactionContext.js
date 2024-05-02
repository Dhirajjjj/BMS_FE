import React, { createContext, useState, useEffect } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactionData, setTransactionData] = useState(() => {
    const storedTransactionData = localStorage.getItem('TransactionData');
    return storedTransactionData ? JSON.parse(storedTransactionData) : null;
  });

  useEffect(() => {
    localStorage.setItem('TransactionData', JSON.stringify(transactionData));
  }, [transactionData]);

  return (
    <TransactionContext.Provider value={{ transactionData, setTransactionData }}>
      {children}
    </TransactionContext.Provider>
  );
};
