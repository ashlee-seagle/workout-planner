export default function EquipmentList({equipment, isBodyweightOnly, hasGoalsSelected, toggleWorkoutShown}) {
    const equipmentListItems = equipment.map(equipment => (
        <li key={equipment}>{equipment}</li>
    ))
    const isReadyForWorkout = hasGoalsSelected && (isBodyweightOnly || equipment.length > 0);
    return (
        <section className="mt-8 transition-all">
      {!isBodyweightOnly && (
        <>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Equipment on hand:</h3>
          <ul className="list-disc list-inside space-y-1 mt-2 mb-6 pl-2 text-gray-600 dark:text-gray-400" aria-live="polite">
            {equipment.map(item => (
              <li key={item} className="capitalize">{item}</li>
            ))}
          </ul>
        </> 
      )}

     
      {isReadyForWorkout ? (
        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-8">
          <div>
            <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">Ready for your plan?</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">We'll build a routine tailored specifically to your configuration.</p>
          </div>
          <button 
            onClick={toggleWorkoutShown}
            className="whitespace-nowrap bg-blue-600 text-white px-5 py-2.5 font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Generate Workout
          </button>
        </div>
      ) : (
        <p className="text-sm text-amber-600 dark:text-amber-400 italic bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-3 rounded-lg my-4">
          ⚠️ Please select at least one workout goal above to generate your plan.
        </p>
      )}
    </section>
  
    )
}