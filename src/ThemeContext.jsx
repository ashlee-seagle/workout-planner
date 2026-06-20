// src/ThemeContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

// store global theme data
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // initialize based on the browser's system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // sync the .dark class on the <html> tag whenever isDarkMode changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// hook to grab theme values instantly in child components
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
