/**
 * The twin manuscript columns of virtues (✦, ink-green) and trials (◇,
 * oxblood) that accompany every number meaning.
 */

interface Column {
  label: string;
  items: string[];
}

export function TraitColumns({
  virtues,
  trials,
}: {
  virtues?: Column;
  trials?: Column;
}) {
  if (!virtues && !trials) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {virtues && (
        <div>
          <p className="term mb-2 block text-aura-400">{virtues.label}</p>
          <ul className="space-y-1 text-sm text-mystic-200/80">
            {virtues.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-aura-400/80" aria-hidden>
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {trials && (
        <div>
          <p className="term mb-2 block text-blood-300">{trials.label}</p>
          <ul className="space-y-1 text-sm text-mystic-200/80">
            {trials.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-blood-300/80" aria-hidden>
                  ◇
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
