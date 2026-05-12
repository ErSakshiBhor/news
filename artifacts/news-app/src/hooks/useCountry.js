import { useState, useEffect } from 'react';

const STORAGE_KEY = 'quicknews_country';

export const COUNTRIES = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'in', name: 'India',          flag: '🇮🇳' },
  { code: 'au', name: 'Australia',      flag: '🇦🇺' },
  { code: 'ca', name: 'Canada',         flag: '🇨🇦' },
  { code: 'de', name: 'Germany',        flag: '🇩🇪' },
  { code: 'fr', name: 'France',         flag: '🇫🇷' },
  { code: 'jp', name: 'Japan',          flag: '🇯🇵' },
  { code: 'br', name: 'Brazil',         flag: '🇧🇷' },
  { code: 'za', name: 'South Africa',   flag: '🇿🇦' },
];

export const useCountry = () => {
  const [country, setCountry] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'us';
    } catch {
      return 'us';
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, country);
  }, [country]);

  const currentCountry = COUNTRIES.find(c => c.code === country) || COUNTRIES[0];

  return { country, setCountry, currentCountry, COUNTRIES };
};
