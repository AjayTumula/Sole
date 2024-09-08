"use client"
import { useTheme } from "next-themes";
import './navbar.scss';
import Image from "next/image";
import SoleImage from '../../assets/sole-2.png';
import ThemeSwitcher from "@/app/themeSwitcher";


const Navbar = () => {
    const {theme} = useTheme();

    return (
        <div className="nav-bar-section">
            <div className="nav-bar-text"><Image src={SoleImage} height={'150'} width={'100'}/></div>
            <div className="toggle">
                 <ThemeSwitcher />   
            </div>
        </div>
    )
}

export default Navbar;