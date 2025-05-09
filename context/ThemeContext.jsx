"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [followSystem, setFollowSystem] = useState(false);

  useEffect(() => {
    // Check local storage for saved preferences
    const savedTheme = localStorage.getItem("theme");
    const savedFollowSystem = localStorage.getItem("followSystem") === "true";
    
    if (savedFollowSystem) {
      setFollowSystem(true);
      // Check system preference
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(systemDark);
    } else if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (followSystem) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [followSystem]);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    setFollowSystem(false);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    localStorage.setItem("followSystem", "false");
  };

  const toggleFollowSystem = () => {
    const newFollowSystem = !followSystem;
    setFollowSystem(newFollowSystem);
    localStorage.setItem("followSystem", newFollowSystem.toString());
    
    if (newFollowSystem) {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(systemDark);
    }
  };

  const value = {
    darkMode,
    followSystem,
    toggleTheme,
    toggleFollowSystem,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};