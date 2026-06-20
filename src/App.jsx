import { useState } from 'react'
import { getWorkoutFromGemini } from './ai';
import './App.css'
import Header from './Header'
import EquipmentList from './EquipmentList'
import Workout from './Workout'
import GoalSelector from './GoalSelector'
import EquipmentSelector from './EquipmentSelector'

// TODO: Future wizard redesign
// Convert the existing linear flow into a guided 4-step experience:
// 1. Choose Goals
// 2. Select Equipment
// 3. Review Selections
// 4. Generated Workout
// Keep the current business logic, state shape, and component contracts intact.
// TODO: Decide whether this should become a true multi-step wizard or remain a polished single-page guided builder.

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
        if (!isBodyweightOnly) setEquipment([]);
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
<div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef6ff_48%,#f8fafc_100%)] text-slate-950 transition-colors duration-200 dark:bg-[linear-gradient(180deg,#0d1520_0%,#111827_52%,#0d1520_100%)] dark:text-slate-50">
    <Header />
        <main className="mx-auto w-[92%] max-w-5xl pb-16 pt-8 sm:pt-12">
          {/* TODO: Improve light mode depth with stronger card shadows, subtle tinted surfaces, and better separation between sections. */}
          <section className="mb-8 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/70 backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/20 sm:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">Workout Planner</p>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Build a focused workout around your goals and equipment.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">Choose what you want to train, add what you have available, and generate a concise plan tailored to your setup.</p>
          </section>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20 sm:p-8">
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

        {error ? (
            <p className="my-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
                {error}
            </p>
        ) : null}


        {workoutShown ? <Workout plan={workoutPlan} isLoading={isLoading} /> : null}
        </div>
        </main>
    
        
    </div>
  )
}

export default App
