import { Sparkles, X } from "lucide-react"

export default function EquipmentList({equipment, isBodyweightOnly, hasGoalsSelected, toggleWorkoutShown, removeEquipment}) {
    const isReadyForWorkout = hasGoalsSelected && (isBodyweightOnly || equipment.length > 0);
    return (
        <section className="mt-6 transition-all">
      {!isBodyweightOnly && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/40">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Equipment on hand</h3>
          <ul className="mt-3 flex flex-wrap gap-3" aria-live="polite">
            {equipment.map(item => (
              <li key={item}>
                <button 
                    onClick={() => removeEquipment(item)}
                    className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-2 text-sm font-bold text-sky-700 shadow-sm shadow-slate-200/50 transition-all duration-150 hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-white dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200 dark:shadow-black/10 dark:hover:border-rose-500/40 dark:hover:bg-rose-500/10 dark:hover:text-rose-200 dark:focus:ring-offset-slate-900"
                    aria-label={`Remove ${item}`}
                    >
                    {item}
                    <X className="h-3.5 w-3.5 opacity-70" />
                </button>
              </li>
            ))}
          </ul>
        </div> 
      )}

     
      {isReadyForWorkout ? (
        <div className="my-8 flex flex-col gap-4 rounded-2xl border border-sky-200 bg-sky-50/80 p-5 shadow-lg shadow-sky-100/70 dark:border-sky-500/30 dark:bg-sky-500/10 dark:shadow-black/20 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/20">
              <Sparkles className="h-6 w-6" />
            </span>
          <div>
            <h4 className="text-lg font-bold text-slate-950 dark:text-white">Ready for your plan?</h4>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">We'll build a routine tailored specifically to your configuration.</p>
          </div>
          </div>
          {/* TODO: Add disabled, empty, and loading states for a more complete UX. */}
          <button 
            onClick={toggleWorkoutShown}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-sky-600 px-5 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-sky-50 dark:focus:ring-offset-slate-900"
          >
            Generate Workout
          </button>
        </div>
      ) : (
        <p className="my-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          Please select at least one workout goal above to generate your plan.
        </p>
      )}
    </section>
  
    )
}
