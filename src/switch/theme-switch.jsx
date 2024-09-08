import { useTheme } from 'next-themes';
import { useState } from 'react';


const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        setTheme(isDarkMode ? 'light' : 'dark');
    };

    return (
        <div>
            <button onClick={toggleTheme}>
                Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
            </button>
        </div>
    );
};


export default ThemeSwitch;