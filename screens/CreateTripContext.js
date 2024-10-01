import React, { createContext, useState } from 'react';

// Create the context
export const CreateTripContext = createContext();

// Create the provider component
export const CreateTripProvider = ({ children }) => {
  const [tripData, setTripData] = useState({}); // Initialize with an object

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </CreateTripContext.Provider>
  );
};
