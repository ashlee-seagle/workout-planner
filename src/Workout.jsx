import { Clock3, Dumbbell, Sparkles } from "lucide-react"

function getWorkoutSections(plan) {
  const lines = plan.split("\n");
  const sections = [];
  let currentSection = null;

  lines.forEach((line) => {
    const headingMatch = line.match(/^#{1,3}\s+(.+)/);

    if (headingMatch) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        title: headingMatch[1].replace(/\*\*/g, ""),
        content: [],
      };
      return;
    }

    if (!currentSection) {
      currentSection = {
        title: "Workout Plan",
        content: [],
      };
    }

    currentSection.content.push(line);
  });

  if (currentSection) sections.push(currentSection);

  return sections.filter((section) => section.content.join("").trim());
}

export default function Workout({ plan, isLoading }) {
    const sections = getWorkoutSections(plan);

    return (
        <section className="mt-10 border-t border-slate-200 pt-8 transition-all dark:border-white/10">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">Generated Workout</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Your tailored workout</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300">
            <Clock3 className="h-3.5 w-3.5" />
            Concise plan
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300">
            <Dumbbell className="h-3.5 w-3.5" />
            Goal-based
          </span>
        </div>
      </div>
      <article aria-live="polite">
        {/* TODO: Replace raw markdown-style workout text with structured JSX or markdown parsing so visible **bold markers** do not appear in the UI. */}
        {isLoading ? (
          // TODO: Add a clearer loading state and visual cue while waiting on workout generation.
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/20">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-950 dark:text-white">Coach Gem is crafting your routine...</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Building a concise plan from your selections.</p>
              </div>
            </div>
            <div className="space-y-3 animate-pulse">
              <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map((section, index) => (
              // TODO: Add stronger workout card polish with icons, badges, improved spacing, and possibly accordion behavior.
              <section
                key={`${section.title}-${index}`}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/10"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700 dark:bg-sky-500/15 dark:text-sky-200">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">{section.title}</h3>
                </div>
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">{section.content.join("\n").trim()}</p>
              </section>
            ))}
          </div>
        )}
      </article>
    </section>
    )
}
