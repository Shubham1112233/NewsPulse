import React, { useState } from 'react';
import { CountryContext } from '../contexts/CountryContext';

export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState('IN');

  const handleCountryChange = (country) => {
    setCountry(country);
  };

  return (
    <CountryContext.Provider value={{ country, handleCountryChange }}>
      {children}
    </CountryContext.Provider>
  );
};