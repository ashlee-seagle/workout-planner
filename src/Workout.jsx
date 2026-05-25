export default function Workout({ plan, isLoading }) {
    return (
        <section className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-8 transition-all animate-fade-in">
      <h2 className="text-2xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100">Your Tailored Workout:</h2>
      <article className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm" aria-live="polite">
        {isLoading ? (
          
          <div className="flex flex-col gap-2 py-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse mt-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 animate-pulse"></div>
          </div>
        ) : (
    
          <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">{plan}</p>
        )}
      </article>
    </section>
    )
}