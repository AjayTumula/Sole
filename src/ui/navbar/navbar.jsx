"use client"
import { useTheme } from "next-themes";
import ThemeSwitch from "../switch/theme-switch";
import './navbar.scss';

const Navbar = () => {
    const {theme} = useTheme();

    return (
        <div className="nav-bar-section">
            <div className="nav-bar-text">Sole</div>
            <div className={`text-${theme === 'dark' ? 'white' : 'black'}`}>
                <ThemeSwitch />
            </div>
        </div>
    )
}

export default Navbar;