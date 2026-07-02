import type { Correspondence } from "@/lib/content/core";

/** The correspondences of a number, laid out as ruled cells. */
export function CorrGrid({ corr }: { corr: Correspondence }) {
  const cells: Array<[string, string | undefined]> = [
    ["Tarot", corr.tarot],
    ["Ruling Planet", corr.rulingPlanet],
    ["Zodiac", corr.zodiac],
    ["Element", corr.element],
    ["Chakra", corr.chakra],
    ["Day of the Week", corr.dayOfWeek],
    ["Colours", corr.colors?.join(", ")],
    ["Stones", corr.gemstones?.join(", ")],
    ["Metal", corr.metal],
    ["Musical Note", corr.musicalNote],
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cells.map(([label, value]) =>
        value ? (
          <div key={label} className="glass p-4">
            <p className="eyebrow">{label}</p>
            <p className="mt-1 font-display text-lg text-mystic-50">{value}</p>
          </div>
        ) : null,
      )}
    </div>
  );
}
