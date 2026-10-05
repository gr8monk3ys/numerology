"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NumberOrb } from "@/components/ui/NumberOrb";
import { Chip } from "@/components/ui/Chip";
import { useQueryParam } from "@/lib/hooks/use-query-param";

type Filter = "all" | "single" | "master";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "single", label: "1 – 9" },
  { key: "master", label: "Master" },
];

/**
 * One card's worth of display data. The page builds these on the server and
 * passes only these fields, so the client bundle no longer imports the
 * `@/lib/content` barrel and every meaning dataset behind it
 * (server-serialization, bundle-barrel-imports).
 */
export interface NumberCardData {
  key: string;
  isMaster: boolean;
  title: string;
  summary?: string;
  tarot?: string;
  element?: string;
}

function toFilter(value: string | null): Filter {
  return value === "single" || value === "master" ? value : "all";
}

export function NumbersGrid({ numbers }: { numbers: NumberCardData[] }) {
  // The filter is in the URL (?filter=master) so it survives a reload and can
  // be linked to; "all" keeps the URL clean.
  const [filterParam, setFilterParam] = useQueryParam("filter");
  const filter = toFilter(filterParam);
  const visible = numbers.filter((n) =>
    filter === "all" ? true : filter === "master" ? n.isMaster : !n.isMaster,
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="segmented" role="group" aria-label="Filter numbers">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilterParam(f.key === "all" ? null : f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="mono-label">{visible.length} entries</span>
      </div>

      <div className="divided sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((n) => (
          <Link
            key={n.key}
            href={`/numbers/${n.key}`}
            className="cell-hover group relative flex flex-col gap-5 p-6"
          >
            <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-bone-500 transition-colors group-hover:text-gold-300" />
            <div className="flex items-center gap-4">
              <NumberOrb value={n.key} size="md" isMaster={n.isMaster} />
              <div>
                <span className="mono-label">{n.isMaster ? "Master number" : "Root number"}</span>
                <h3 className="text-xl">{n.title}</h3>
              </div>
            </div>
            {n.summary && (
              <p className="line-clamp-3 text-sm leading-relaxed text-bone-300">{n.summary}</p>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-1.5">
              {n.tarot && <Chip tone="muted">{n.tarot}</Chip>}
              {n.element && <Chip tone="muted">{n.element}</Chip>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
