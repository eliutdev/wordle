import { useEffect } from "react";
import { useDarkMode } from "usehooks-ts";

const ThemeToggler = () => {
  const { isDarkMode, toggle } = useDarkMode(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <button className="theme-toggler" onClick={toggle}>
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggler;
