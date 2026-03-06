import React from 'react';
import { useEffect, useState } from "react";
const ThemeToggle = () => {
    const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );
      // Theme change effect
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  // Toggle handle function
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
    return (
        <div>
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "dark"}
              className="toggle toggle-error ml-2 w-8 h-5 md:w-10 md:h-6 md:ml-3"
            />
        </div>
    );
};

export default ThemeToggle;