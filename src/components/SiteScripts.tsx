"use client";

import { useEffect } from "react";
import { initSite } from "@/lib/site-behaviour";

/**
 * Runs the site behaviour (menu, sticky header, dock, scroll reveal, stepped
 * enquiry forms, footer year) once the page has hydrated. Guarded so React's
 * dev-mode double effect can't attach every listener twice.
 */
export function SiteScripts() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.siteReady) return;
    root.dataset.siteReady = "1";
    initSite();
  }, []);
  return null;
}
