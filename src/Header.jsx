import { useState } from 'react';
import logoLight from './workout-app-logo-light.png';
import logoDark from './workout-app-logo-dark.png';
export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    // TODO: use theme
    // function toggleTheme(){
    //     setIsDarkMode( prevMode => !prevMode);
    // }
    return (
         <header className="flex justify-center items-center gap-[11px] h-20 shadow-sm">
            <img
            src={isDarkMode ? logoDark : logoLight}
            alt="Workout Planner Logo" 
            className="logo-img"
            />
            <h1 className='text-4xl font-extrabold tracking-tight'>Plan My Workout App</h1>
            {/* <button onClick={toggleTheme}>
        Toggle to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button> */}
        </header>
    )
}