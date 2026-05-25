import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import logoLight from './workout-app-logo-light.png';
import logoDark from './workout-app-logo-dark1.png';
export default function Header() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <header className="flex justify-center items-center gap-[11px] h-20 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
            <img
            src={isDarkMode ? logoDark : logoLight}
            alt="Workout Planner Logo" 
            className="logo-img"
            />
            <h1 className='text-4xl font-extrabold tracking-tight dark:text-gray-50'>Plan My Workout App</h1>
            <button onClick={toggleTheme}
                className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
        Toggle to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
        </header>
    )
}