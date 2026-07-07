import { Activity, CheckCircle2, Flame, HeartPulse, PersonStanding } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Goal = "Build Muscle" | "Lose Weight" | "Endurance" | "Mobility";
type GoalSelectorProps = {
  goals: Goal[];
  selectedGoals: Goal[];
  onToggleGoal: (goal: Goal) => void;
};

const goalIcons: Record<Goal, LucideIcon> = {
  "Build Muscle": Activity,
  "Lose Weight": Flame,
  Endurance: HeartPulse,
  Mobility: PersonStanding,
};

export default function GoalSelector({
  goals,
  selectedGoals,
  onToggleGoal,
}: GoalSelectorProps) {
  return (
    <section aria-labelledby="goals-heading">
      <div className="flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white shadow-lg shadow-sky-600/20">
          1
        </span>
        <div>
          <h2 id="goals-heading" className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Choose your goals
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Select every outcome you want this workout to support.
          </p>
        </div>
      </div>

      {selectedGoals.length === 0 ? (
        <p className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-4 text-sm font-medium text-slate-600 dark:border-white/15 dark:bg-slate-950/30 dark:text-slate-300">
          No goals selected yet. Choose at least one goal so your plan has a clear focus.
        </p>
      ) : (
        <p className="mt-5 text-sm font-semibold text-sky-700 dark:text-sky-300" aria-live="polite">
          {selectedGoals.length} goal{selectedGoals.length === 1 ? "" : "s"} selected
        </p>
      )}

      <div className="mb-12 mt-6 grid gap-3 sm:grid-cols-2">
        {goals.map((goal) => {
          const isSelected = selectedGoals.includes(goal);
          const Icon = goalIcons[goal];

          return (
            <button
              key={goal}
              type="button"
              onClick={() => onToggleGoal(goal)}
              aria-pressed={isSelected}
              className={`group flex min-h-28 items-center justify-between gap-4 rounded-2xl border p-5 text-left transition duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
                isSelected
                  ? "border-sky-500 bg-sky-50 text-sky-950 shadow-lg shadow-sky-500/10 dark:border-sky-400/70 dark:bg-sky-500/15 dark:text-white"
                  : "border-slate-200 bg-white text-slate-800 shadow-sm shadow-slate-200/40 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-200/60 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-black/10 dark:hover:border-sky-500/40 dark:hover:bg-slate-900"
              }`}
            >
              <span className="flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                    isSelected
                      ? "bg-sky-600 text-white shadow-lg shadow-sky-600/20"
                      : "bg-slate-100 text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-sky-500/10 dark:group-hover:text-sky-300"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-base font-bold">{goal}</span>
                  <span className="mt-1 block text-sm font-medium text-slate-500 dark:text-slate-400">
                    {isSelected ? "Included in your plan" : "Tap to include"}
                  </span>
                </span>
              </span>
              <CheckCircle2
                className={`h-5 w-5 transition ${
                  isSelected ? "text-sky-600 dark:text-sky-300" : "text-slate-300 dark:text-slate-700"
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
