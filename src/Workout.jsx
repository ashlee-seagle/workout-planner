export default function Workout({ plan, isLoading }) {
    return (
        <section className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-8 transition-all animate-fade-in">
      <h2 className="text-2xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100">Your Tailored Workout:</h2>
      <article className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm" aria-live="polite">
        {isLoading ? (
          /* --- Animated Loading State --- */
          <div className="space-y-4 animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <span className="text-sm font-medium text-gray-500 ml-2">Coach Gem is crafting your routine...</span>
            </div>
            {/* Fake text skeleton lines */}
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mt-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          </div>
        ) : (
    
          <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">{plan}</p>
        )}
      </article>
    </section>
    )
}