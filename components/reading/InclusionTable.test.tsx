import { describe, it, expect } from "vitest";
import { isValidElement, type ReactNode } from "react";
import { buildReading } from "@/lib/numerology";
import { InclusionTable } from "./InclusionTable";

type Props = { children?: ReactNode; className?: string; "data-value"?: number; "data-count"?: number };

/** Every element in the tree InclusionTable returns, depth first. */
function elements(node: ReactNode): Props[] {
  if (Array.isArray(node)) return node.flatMap(elements);
  if (!isValidElement<Props>(node)) return [];
  return [node.props, ...elements(node.props.children)];
}

const text = (node: ReactNode): string =>
  Array.isArray(node)
    ? node.map(text).join("")
    : isValidElement<Props>(node)
      ? text(node.props.children)
      : typeof node === "string" || typeof node === "number"
        ? String(node)
        : "";

describe("InclusionTable", () => {
  // methods_advanced TC1: "Thomas John Hancock counts: 1x4, 2x2, 3x2, 4x1,
  // 5x2, 6x3, 8x3" -> Karmic Lessons [7, 9], Hidden Passion 1.
  const { advanced } = buildReading({
    fullName: "Thomas John Hancock",
    birth: { year: 1990, month: 5, day: 15 },
  });
  const tree = elements(
    InclusionTable({ counts: advanced.letterCounts, passion: advanced.hiddenPassion }),
  );
  const cells = tree.filter((p) => p["data-value"] !== undefined);

  it("renders a cell for every value 1-9 with the reading's tally", () => {
    expect(Object.fromEntries(cells.map((c) => [c["data-value"], c["data-count"]]))).toEqual({
      1: 4, 2: 2, 3: 2, 4: 1, 5: 2, 6: 3, 7: 0, 8: 3, 9: 0,
    });
  });

  it("marks the zeros as lessons and the highest count as passion", () => {
    const tagged = (word: string) =>
      cells.filter((c) => text(c.children).endsWith(word)).map((c) => c["data-value"]);
    expect(tagged("lesson")).toEqual(advanced.karmicLessons);
    expect(tagged("passion")).toEqual([1]);
  });
});
