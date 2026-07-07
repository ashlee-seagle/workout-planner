import { CalendarDays, Clock3, Dumbbell, Sparkles } from "lucide-react"

function cleanMarkdown(text) {
  return text.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

function isMarkdownDivider(line) {
  return /^(-{3,}|\*{3,}|_{3,})$/.test(line.trim());
}

function renderInlineMarkdown(text) {
  return text
    .replace(/^\s*[-*]\s+/, "")
    .replace(/^\s*\d+\.\s+/, "")
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-slate-800 dark:text-slate-100">
            {part.slice(2, -2)}
          </strong>
        );
      }

      return part.replace(/\*\*/g, "");
    });
}

function splitExerciseLine(line) {
  const cleanedLine = line
    .replace(/^\s*[-*]\s+/, "")
    .replace(/^\s*\d+\.\s+/, "")
    .trim();

  const separatorMatch = cleanedLine.match(/^(.{2,48}?)(:\s+|\s+-\s+|\s+–\s+)(.+)$/);

  if (!separatorMatch) return null;

  const [, name, separator, details] = separatorMatch;

  return {
    name,
    separator: separator.trim() === ":" ? ":" : " - ",
    details,
  };
}

function renderListItem(item) {
  const exerciseLine = splitExerciseLine(item);

  if (!exerciseLine) return renderInlineMarkdown(item);

  return (
    <>
      <strong className="font-bold text-slate-900 dark:text-white">
        {renderInlineMarkdown(exerciseLine.name)}
      </strong>
      <span className="text-slate-400 dark:text-slate-500">{exerciseLine.separator} </span>
      <span>{renderInlineMarkdown(exerciseLine.details)}</span>
    </>
  );
}

function renderContentBlocks(content) {
  const lines = content
    .join("\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !isMarkdownDivider(line));

  const blocks = [];
  let listItems = [];
  let listType = null;

  const flushList = () => {
    if (!listItems.length) return;

    const ListTag = listType === "ordered" ? "ol" : "ul";
    blocks.push(
      <ListTag
        key={`list-${blocks.length}`}
        className={`space-y-2 pl-5 text-sm leading-7 text-slate-600 dark:text-slate-300 ${
          listType === "ordered" ? "list-decimal" : "list-disc"
        }`}
      >
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`} className="pl-1">
            {renderListItem(item)}
          </li>
        ))}
      </ListTag>
    );
    listItems = [];
    listType = null;
  };

  lines.forEach((line) => {
    const isBullet = /^[-*]\s+/.test(line);
    const isNumbered = /^\d+\.\s+/.test(line);
    const nextListType = isNumbered ? "ordered" : isBullet ? "unordered" : null;

    if (nextListType) {
      if (listType && listType !== nextListType) flushList();
      listType = nextListType;
      listItems.push(line);
      return;
    }

    flushList();
    blocks.push(
      <p key={`p-${blocks.length}`} className="text-sm leading-7 text-slate-600 dark:text-slate-300">
        {renderInlineMarkdown(line)}
      </p>
    );
  });

  flushList();

  return blocks;
}

function getWorkoutSections(plan) {
  const lines = plan.split("\n");
  const sections = [];
  let currentSection = null;

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (isMarkdownDivider(trimmedLine)) return;

    const markdownHeadingMatch = trimmedLine.match(/^#{1,6}\s+(.+)/);
    const boldHeadingMatch = trimmedLine.match(/^\*\*(.+?)\*\*:?\s*$/);
    const plainHeadingMatch = trimmedLine.match(
      /^(day\s+\d+|workout\s+\d+|week\s+\d+|workout overview|warm[- ]?up|main workout|main block|cool[- ]?down|notes|finisher)\b.*:?$/i
    );
    const headingTitle = markdownHeadingMatch?.[1] || boldHeadingMatch?.[1] || plainHeadingMatch?.[0];

    if (headingTitle) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        title: cleanMarkdown(headingTitle).replace(/:$/, ""),
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

export default function Workout({ plan, isLoading, hasStarted }) {
    const sections = getWorkoutSections(plan);

    return (
        <section className="mt-10 border-t border-slate-200 pt-8 transition-all dark:border-white/10">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
      <article aria-live="polite" aria-busy={isLoading}>
        {isLoading ? (
          <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-5 shadow-lg shadow-sky-100/60 dark:border-sky-500/30 dark:bg-sky-500/10 dark:shadow-black/20 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/20">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-950 dark:text-white">Building your personalized workout...</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">This may take several seconds while the plan is generated.</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 animate-pulse">
              <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </div>
        ) : sections.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-5 text-sm text-slate-600 dark:border-white/15 dark:bg-slate-950/30 dark:text-slate-300 sm:p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm dark:bg-slate-900 dark:text-sky-300">
                <CalendarDays className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-950 dark:text-white">No workout generated yet</h3>
                <p className="mt-1 leading-6">
                  {hasStarted
                    ? "Once generation succeeds, your workout will be organized here into readable sections."
                    : "Select at least one goal and add equipment, or choose bodyweight-only, then generate your plan."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section, index) => (
              <section
                key={`${section.title}-${index}`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/10 sm:p-6"
              >
                <div className="mb-4 flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700 dark:bg-sky-500/15 dark:text-sky-200">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    {/day\s+\d+/i.test(section.title) ? (
                      <span className="mb-1 inline-flex rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-sky-700 dark:bg-sky-500/15 dark:text-sky-200">
                        Workout Day
                      </span>
                    ) : null}
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">{section.title}</h3>
                    <div className="mt-2 h-1 w-12 rounded-full bg-sky-500/80"></div>
                  </div>
                </div>
                <div className="space-y-3">{renderContentBlocks(section.content)}</div>
              </section>
            ))}
          </div>
        )}
      </article>
    </section>
    )
}
