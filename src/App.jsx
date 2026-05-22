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
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <input name="equipment" />
            <button type="submit">Add</button>
        </form>
        {equipment.length > 0 ?
            <EquipmentList
                equipment={equipment}
                toggleWorkoutShown={toggleWorkoutShown}
            /> : null
        }

        {workoutShown ? <Workout /> : null}
    </>
  )
}

export default App
