"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

/**
 * Copies the shareable reading URL. Uses the native share sheet when the
 * platform offers one (mobile), otherwise falls back to the clipboard.
 */
export function ShareButton({ shareQuery }: { shareQuery: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/reading?${shareQuery}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My numerology reading", url });
        return;
      } catch {
        // User dismissed the sheet or the platform refused — fall through
        // to the clipboard so the button still does something useful.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (permissions, insecure context).
      window.prompt("Copy your reading link:", url);
    }
  }

  return (
    <button type="button" onClick={handleShare} className="btn-ghost text-sm">
      {copied ? <Check className="h-4 w-4 text-aura-300" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Link copied" : "Share this reading"}
    </button>
  );
}
