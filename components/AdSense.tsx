"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Script from "next/script";
import { ADSENSE_ENABLED, ADSENSE_PUBLISHER_ID, ADSENSE_SCRIPT_SRC, isAutomatedBrowser } from "@/lib/adsense";

const IS_PROD = process.env.NODE_ENV === "production";
const noopSubscribe = () => () => {};

/** False on the server, in automated browsers and until ads are switched on, so none of them requests an ad. */
function useAdsAllowed(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => IS_PROD && ADSENSE_ENABLED && !isAutomatedBrowser(navigator),
    () => false,
  );
}

/**
 * The AdSense tag, site-wide. Ad consent in the EEA/UK/CH is asked by Google's
 * own consent message, which this tag shows; see ADSENSE_ENABLED.
 */
export function AdSenseScript() {
  if (!useAdsAllowed()) return null;
  return <Script async src={ADSENSE_SCRIPT_SRC} crossOrigin="anonymous" strategy="afterInteractive" />;
}

type AdsWindow = Window & { adsbygoogle?: object[] };

/** One in-page ad unit. Renders nothing until its slot id is configured. */
export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  const allowed = useAdsAllowed();
  const pushed = useRef(false);

  useEffect(() => {
    if (!allowed || !slot || pushed.current) return;
    pushed.current = true;
    const w = window as AdsWindow;
    (w.adsbygoogle ??= []).push({});
  }, [allowed, slot]);

  if (!slot) return null;
  if (!IS_PROD) {
    return (
      <aside aria-label="Advertisement" className={`ad-slot ${className}`}>
        <span className="ad-slot-label">Advertisement</span>
        <div className="ad-slot-placeholder">ad slot {slot}</div>
      </aside>
    );
  }
  if (!allowed) return null;
  return (
    <aside aria-label="Advertisement" className={`ad-slot ${className}`}>
      <span className="ad-slot-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: 100 }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
