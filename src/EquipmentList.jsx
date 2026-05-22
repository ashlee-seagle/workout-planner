export default function EquipmentList(props) {
    const equipmentListItems = props.equipment.map(equipment => (
        <li key={equipment}>{equipment}</li>
    ))
    return (
        <section>
            <h2>Equipment on hand:</h2>
            <ul className="equipment-list" aria-live="polite">{equipmentListItems}</ul>
            {props.equipment.length > 3 && <div className="get-workout-container">
                <div>
                    <h3>Ready for a workout?</h3>
                    <p>Generate a workout from your list of equipment.</p>
                </div>
                <button onClick={props.toggleWorkoutShown}>Get a workout</button>
            </div>}
        </section>
    )
}