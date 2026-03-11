const METHOD_STYLES: Record<string, string> = {
  GET: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  POST: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  PATCH: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  DELETE: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

export function MethodBadge({ method }: { method: string }) {
  const upper = method.toUpperCase();
  const styles = METHOD_STYLES[upper] ?? 'bg-fd-muted text-fd-muted-foreground';
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-bold font-mono ${styles}`}>
      {upper}
    </span>
  );
}
