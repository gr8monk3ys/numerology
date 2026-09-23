import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";

/**
 * Pinnacles and challenges as a list. Its own module so the forecast form can
 * use it without importing ReadingResults and, through it, every content
 * dataset.
 */
export function CycleList({
  title,
  items,
}: {
  title: string;
  items: {
    key: number;
    value: number;
    isMaster: boolean;
    name: string;
    ages: string;
    summary?: string;
    active?: boolean;
  }[];
}) {
  return (
    <div>
      <h3 className="mono-label mb-3">{title}</h3>
      <div className="divided">
        {items.map((it) => (
          <div
            key={it.key}
            className={it.active ? "flex items-start gap-4 bg-gold-300/[0.05] p-4" : "flex items-start gap-4 p-4"}
          >
            <NumberOrb value={it.value} size="sm" isMaster={it.isMaster} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-bone-50">{it.name}</span>
                <Chip tone="muted">ages {it.ages}</Chip>
                {it.active && <Chip tone="gold">Now</Chip>}
              </div>
              {it.summary && <p className="mt-1 text-sm text-bone-300">{it.summary}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
