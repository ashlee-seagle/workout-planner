import { useState } from 'react'
import './App.css'
import Header from './Header'
import EquipmentList from './EquipmentList'
import Workout from './Workout'

function App() {

   const [equipment, setEquipment] = useState(
        []
    )
    const [workoutShown, setWorkoutShown] = useState(false)
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [isBodyweightOnly, setIsBodyweightOnly] = useState(false);

    const toggleGoal = (goal) => {
    setSelectedGoals(prev => 
        prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
    };

    function toggleWorkoutShown() {
        setWorkoutShown(prevShown => !prevShown)
    }


    function handleSubmit(e) {
        e.preventDefault();
        const value = e.target.elements.equipment.value;
        setEquipment(prev => [...prev, value]);
        e.target.reset();
    }

  return (
<div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 transition-colors duration-200">      <Header />
        <div className="mt-20 w-[90%] sm:w-[80%] md:w-1/2 max-w-2xl mx-auto">
        <h2 className="mt-2 text-3xl font-medium">1. What are your goals?</h2>
        <div className="grid grid-cols-2 gap-3 my-4">
            {['Build Muscle', 'Lose Weight', 'Endurance', 'Mobility'].map(goal => {
                const isSelected = selectedGoals.includes(goal);
                return (
                <button
                    key={goal}
                    type="button" 
                    onClick={() => toggleGoal(goal)}
                    className={`p-4 border rounded-xl font-medium transition ${
                    isSelected 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                        : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50'
                    }`}
                >
                    {goal}
                </button>
                );
            })}
        </div>
        <h2 className="mt-2 text-3xl font-medium">2. What equipment do you have?</h2>
        <button
                type="button"
                onClick={() => setIsBodyweightOnly(prev => !prev)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                    isBodyweightOnly
                    ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700 hover:bg-gray-50'
                }`}
            >
            {isBodyweightOnly ? '✓ Bodyweight Only Active' : '+ Pure Bodyweight / No Equipment'}
            </button>
            <form onSubmit={handleSubmit} className="space-y-4 my-20">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
  {isBodyweightOnly ? (
    <div className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-sm font-medium rounded-md italic transition-all">
      Pure bodyweight mode active — no equipment needed!
    </div>
  ) : (

    <input 
      name="equipment"
      type="text"
      placeholder="e.g. Dumbbells, Pull-up bar"
      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  )}

  <button 
    type="submit"
    disabled={isBodyweightOnly}
    className={`whitespace-nowrap px-4 py-2 font-medium rounded-md shadow transition ${
      isBodyweightOnly 
        ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none' 
        : 'bg-black dark:bg-gray-100 text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
    }`}
  >
    Add
  </button>
</div>
            </form>
            
            {equipment.length > 0 ?
            <EquipmentList
                equipment={equipment}
                toggleWorkoutShown={toggleWorkoutShown}
                isBodyweightOnly={isBodyweightOnly}
                hasGoalsSelected={selectedGoals.length > 0}
            /> : null
        }


        {workoutShown ? <Workout /> : null}
        </div>
    
        
    </div>
  )
}

export default App
