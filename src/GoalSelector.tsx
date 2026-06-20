type Goal = "Build Muscle" | "Lose Weight" | "Endurance" | "Mobility";
type GoalSelectorProps = {
  goals: Goal[];
  selectedGoals: Goal[];
  onToggleGoal: (goal: Goal) => void;
};

export default function GoalSelector({
  goals,
  selectedGoals,
  onToggleGoal,
}: GoalSelectorProps) {
  return (
    <>
      <h2 className="mt-2 text-3xl font-medium">1. What are your goals?</h2>
      <div className="grid grid-cols-2 gap-3 mt-8 mb-16">
        {goals.map((goal) => {
          const isSelected = selectedGoals.includes(goal);

          return (
            <button
              key={goal}
              type="button"
              onClick={() => onToggleGoal(goal)}
              className={`p-4 rounded-xl border font-medium transition ${
                isSelected
                  ? "bg-[var(--selected-color)] text-white dark:border-transparent"
                  : "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-transparent hover:bg-gray-50"
              }`}
            >
              {goal}
            </button>
          );
        })}
      </div>
    </>
  );
}
