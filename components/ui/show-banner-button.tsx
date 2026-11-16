"use client";

import { Button } from "./button";

/** Style guide only: opens the popup banner in demo mode. */
export function ShowBannerButton() {
  return (
    <Button variant="secondary" onClick={() => window.dispatchEvent(new Event("pk:show-banner"))}>
      Show the banner
    </Button>
  );
}
