import type { FormEvent } from "react";
import { Dumbbell, Plus, Sparkles } from "lucide-react";

type EquipmentSelectorProps = {
  isBodyweightOnly: boolean;
  onAddEquipment: (equipment: string) => void;
  onToggleBodyweightOnly: () => void;
};

export default function EquipmentSelector({
  isBodyweightOnly,
  onAddEquipment,
  onToggleBodyweightOnly,
}: EquipmentSelectorProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get("equipment");

    // Narrow value from string | File | null to string
    if (typeof value !== "string") return;

    const equipmentName = value.trim();

    if (!equipmentName) return;

    onAddEquipment(equipmentName);

    e.currentTarget.reset();
  }

  return (
    <section aria-labelledby="equipment-heading" className="border-t border-slate-200 pt-8 dark:border-white/10">
      <div className="flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white shadow-lg shadow-slate-950/10 dark:bg-white dark:text-slate-950">
          2
        </span>
        <div>
          <h2 id="equipment-heading" className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Select equipment
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Add the tools you have nearby, or switch to bodyweight-only.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="my-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {isBodyweightOnly ? (
            <div className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-800 transition-all dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200">
              <Sparkles className="h-5 w-5" />
              Pure bodyweight mode active. No equipment needed.
            </div>
          ) : (
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-200/50 transition focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100 dark:border-white/10 dark:bg-slate-950/50 dark:shadow-black/10 dark:focus-within:border-sky-400 dark:focus-within:ring-sky-500/10">
              <Dumbbell className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                name="equipment"
                type="text"
                placeholder="e.g. Dumbbells, Pull-up bar"
                className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </label>
          )}

          <button
            type="submit"
            disabled={isBodyweightOnly}
            className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition ${
              isBodyweightOnly
                ? "cursor-not-allowed bg-slate-100 text-slate-400 shadow-none dark:bg-slate-800 dark:text-slate-600"
                : "bg-slate-950 text-white shadow-lg shadow-slate-950/10 hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 focus:ring-offset-white dark:bg-white dark:text-slate-950 dark:shadow-black/20 dark:hover:bg-slate-200 dark:focus:ring-white dark:focus:ring-offset-slate-900"
            }`}
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </form>
      <button
        type="button"
        onClick={onToggleBodyweightOnly}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
          isBodyweightOnly
            ? "border-sky-300 bg-sky-100 text-sky-800 shadow-sm dark:border-sky-500/40 dark:bg-sky-500/15 dark:text-sky-200"
            : "border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300 dark:hover:border-sky-500/40 dark:hover:text-sky-200"
        }`}
      >
        {isBodyweightOnly
          ? "Bodyweight Only Active"
          : "+ Pure Bodyweight / No Equipment"}
      </button>
    </section>
  );
}
