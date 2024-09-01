import { useTheme } from "next-themes";


const ThemeSwitch = () => {
    const {theme, setTheme} = useTheme();

    return(
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
    )
}

export default ThemeSwitch;