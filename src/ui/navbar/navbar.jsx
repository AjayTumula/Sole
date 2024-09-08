"use client"
import { useTheme } from "next-themes";

import './navbar.scss';
import Image from "next/image";
import SoleImage from '../../assets/sole.png';
import ThemeSwitch from "@/switch/theme-switch";

const Navbar = () => {
    const {theme} = useTheme();

    return (
        <div className="nav-bar-section">
            <div className="nav-bar-text"><Image alt="" src={SoleImage} height={'150'} width={'100'}/></div>
            <div className={`text-${theme === 'dark' ? 'white' : 'black'}`}>
                <ThemeSwitch />
            </div>
        </div>
    )
}

export default Navbar;