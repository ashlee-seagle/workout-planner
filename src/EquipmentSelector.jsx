function EquipmentSelector({ isBodyweightOnly, onAddEquipment, onToggleBodyweightOnly }) {
  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.elements.equipment.value;
    onAddEquipment(value);
    e.target.reset();
  }

  return (
    <>
      <h2 className="mt-2 text-3xl font-medium">2. What equipment do you have?</h2>
      <form onSubmit={handleSubmit} className="space-y-4 my-8">
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
      <button
        type="button"
        onClick={onToggleBodyweightOnly}
        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
          isBodyweightOnly
            ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800 shadow-sm'
            : 'bg-white text-gray-600 border-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700 hover:bg-gray-50'
        }`}
      >
        {isBodyweightOnly ? '✓ Bodyweight Only Active' : '+ Pure Bodyweight / No Equipment'}
      </button>
    </>
  );
}

export default EquipmentSelector
