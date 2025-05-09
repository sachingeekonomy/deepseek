import { useThemeContext } from '@/context/ThemeContext';
import React, { useEffect } from 'react';

const ThemeToggle = () => {
  const { darkMode, followSystem, toggleTheme, toggleFollowSystem } = useThemeContext();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTheme]);

  return (
    <div className="relative group">
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-center h-12 w-12 rounded-lg hover:bg-gray-500/30 transition-all duration-300 ease-in-out transform hover:scale-110"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-transform duration-300 ease-in-out"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-transform duration-300 ease-in-out"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
        <button
          onClick={toggleFollowSystem}
          className={`flex items-center justify-center h-12 px-4 rounded-lg transition-all duration-300 ease-in-out ${
            followSystem 
              ? 'bg-primary text-white' 
              : 'hover:bg-gray-500/30'
          }`}
          aria-label="Toggle system theme"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mr-2"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          System
        </button>
      </div>
      <div className="absolute right-0 top-14 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        {followSystem 
          ? 'Following system theme' 
          : darkMode 
            ? 'Switch to Light Mode' 
            : 'Switch to Dark Mode'} (Ctrl/Cmd + J)
        <div className="absolute -top-2 right-4 w-4 h-4 bg-gray-800 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default ThemeToggle;