"use client"

import { MoonIcon } from "@/components/icon/moon";
import { SunIcon } from "@/components/icon/sun";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import './themeSwitcher.scss';

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        setMounted(true);
    }, [])

    if(!mounted) {
        return null;
    }

    const handleTheme = () => {
        if(theme === "light"){
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }


    return (
        <div className="theme-switcher">
            <Switch
                defaultSelected
                size="lg"
                color="success"
                onClick={handleTheme}
                // startContent={<SunIcon/>}
                endContent={<MoonIcon/>}
                className="custom-switch"
            >
            </Switch>
        </div>
    )
}

export default ThemeSwitcher;