import { Sun, Moon } from "lucide-react"
import { useTheme } from './ThemeContext';
import logoLight from './workout-app-logo-light.png';
import logoDark from './workout-app-logo-dark1.png';
export default function Header() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        // TODO: Tighten sticky header spacing and confirm it does not cover content while scrolling.
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-colors duration-200 dark:border-white/10 dark:bg-slate-950/75">
          <div className="mx-auto flex h-20 w-[92%] max-w-5xl items-center justify-between">
            <div className="flex items-center gap-3">
            <img
            src={isDarkMode ? logoDark : logoLight}
            alt="Workout Planner Logo" 
            className="h-11 w-11 rounded-xl object-contain"
            />
            <div>
              <h1 className='text-xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-2xl'>Plan My Workout</h1>
              <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">Personalized training in minutes</p>
            </div>
            </div>
            <button onClick={toggleTheme}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm shadow-slate-200/70 transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:shadow-black/20 dark:hover:border-sky-500/50 dark:hover:text-sky-300 dark:focus:ring-offset-slate-950"
                    aria-label="Toggle theme"
      >
{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
          </div>
        </header>
    )
}
