import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode/dist';
import useDarkMode from 'src/hooks/useDarkMode';

export default function DarkMode() {
    const [colorTheme, setTheme] = useDarkMode();
    const [darkMode, setDarkMode] = useState(
        colorTheme === 'light' ? true : false
    );

    const toggleDarkMode = (checked) => {
        if (typeof setTheme === 'function') {
            setTheme(colorTheme);
        }
        setDarkMode(checked);
    };

    return (
        <div className="flex items-center justify-center mx-4">
            <DarkModeSwitch
                checked={darkMode}
                onChange={toggleDarkMode}
                size={24}
                moonColor={'#d1d5db'}
                sunColor={'#374151'}
            />
        </div>
    );
}
