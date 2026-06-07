import { useState, useEffect } from 'react'
import { getWorkoutFromGemini } from './ai';
import './App.css'
import Header from './Header'
import EquipmentList from './EquipmentList'
import Workout from './Workout'
import GoalSelector from './GoalSelector'
import EquipmentSelector from './EquipmentSelector'

// TODO: Extract GenerateWorkoutPanel and WorkoutResult
// <Header />
// <main>
//   <GoalSelector />
//   <EquipmentSelector />
//   <GenerateWorkoutPanel />
//   <WorkoutResult />
// </main>

function App() {

    // TODO: Combine into userPreferences state?
   const [equipment, setEquipment] = useState(
        []
    )
      const [selectedGoals, setSelectedGoals] = useState([]);
    const [isBodyweightOnly, setIsBodyweightOnly] = useState(false);
    //


    const [workoutPlan, setWorkoutPlan] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [workoutShown, setWorkoutShown] = useState(false)
  

    // Clear equipment input if user switches to bodyweight
        useEffect(() => {
            if (isBodyweightOnly) setEquipment([]);
        }, [isBodyweightOnly]);

    const toggleGoal = (goal) => {
    setSelectedGoals(prev => 
        prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
    };

    function toggleWorkoutShown() {
        setWorkoutShown(prevShown => !prevShown)
    }
 

    function addEquipment(value) {
        setEquipment(prev => [...prev, value]);
    }

    function toggleBodyweightOnly() {
        setIsBodyweightOnly(prev => !prev)
    }

    const removeEquipment = (itemToRemove) => {
        setEquipment((prevEquipment) => 
            prevEquipment.filter(item => item !== itemToRemove)
        );
        };
    async function generateWorkoutPlan() {
    setIsLoading(true);
    setError(null);
    try {
      const generatedPlan = await getWorkoutFromGemini(selectedGoals, equipment, isBodyweightOnly);
      setWorkoutPlan(generatedPlan);
      toggleWorkoutShown()
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); 
    }
  }

  return (
<div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 transition-colors duration-200">      
    <Header />
        <div className="mt-20 w-[90%] sm:w-[80%] md:w-1/2 max-w-2xl mx-auto">
        <GoalSelector
            goals={['Build Muscle', 'Lose Weight', 'Endurance', 'Mobility']}
            selectedGoals={selectedGoals}
            onToggleGoal={toggleGoal}
        />
        <EquipmentSelector
            isBodyweightOnly={isBodyweightOnly}
            onAddEquipment={addEquipment}
            onToggleBodyweightOnly={toggleBodyweightOnly}
        />
        
            {equipment.length > 0 || isBodyweightOnly ?
            <EquipmentList
                equipment={equipment}
                toggleWorkoutShown={generateWorkoutPlan}
                isBodyweightOnly={isBodyweightOnly}
                hasGoalsSelected={selectedGoals.length > 0}
                removeEquipment={removeEquipment}
            /> : null
        }


        {workoutShown ? <Workout plan={workoutPlan} isLoading={isLoading} /> : null}
        </div>
    
        
    </div>
  )
}

export default App
