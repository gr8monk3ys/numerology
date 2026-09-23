"use client";

import { useCallback, useSyncExternalStore } from "react";

const CHANGE_EVENT = "numen:queryparamchange";

function subscribe(onChange: () => void): () => void {
  window.addEventListener("popstate", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/**
 * One query-string parameter as UI state (Web Interface Guidelines: the URL
 * reflects state, so it survives a reload and can be shared).
 *
 * Read with useSyncExternalStore, not useSearchParams: these pages are
 * prerendered, the server snapshot is `null`, and a deep link takes effect
 * right after hydration with no Suspense boundary and no client-only bail-out.
 * Writes use history.replaceState, which the Next.js router observes, so
 * there is no navigation and no scroll jump. `null` removes the parameter.
 */
export function useQueryParam(key: string): [string | null, (next: string | null) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(key),
    () => null,
  );

  const setValue = useCallback(
    (next: string | null) => {
      const url = new URL(window.location.href);
      if (next === null) url.searchParams.delete(key);
      else url.searchParams.set(key, next);
      window.history.replaceState(window.history.state, "", url);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [key],
  );

  return [value, setValue];
}
