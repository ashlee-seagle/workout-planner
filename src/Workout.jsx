export default function Workout() {
    return (
        <section className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-8 transition-all animate-fade-in">
      <h2 className="text-2xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100">Your Tailored Workout:</h2>
      <article className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm" aria-live="polite">
        <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-2">Custom AI Routine</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Your workout exercises will generate directly here...
        </p>
      </article>
    </section>
    )
}