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
            <form onSubmit={handleSubmit} className="space-y-4 my-20">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <input 
                        name="equipment"
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

                    />
                    <button type="submit"
                        className="whitespace-nowrap bg-black dark:bg-gray-100 text-white dark:text-black px-4 py-2 font-medium rounded-md shadow hover:bg-gray-800 dark:hover:bg-gray-200 transition"                    >
                        Add
                        </button>
                </div>
        
            </form>
            {equipment.length > 0 ?
            <EquipmentList
                equipment={equipment}
                toggleWorkoutShown={toggleWorkoutShown}
            /> : null
        }

        {workoutShown ? <Workout /> : null}
        </div>
    
        
    </div>
  )
}

export default App
