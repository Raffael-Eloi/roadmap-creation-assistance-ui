"use client";

// This component exists to solve a hydration mismatch between Next.js App Router
// and MUI's styling engine (Emotion). MUI uses Emotion, a CSS-in-JS library that
// generates styles at runtime. During server-side rendering (SSR), Emotion injects
// <style> tags inline in the HTML. When the client hydrates, React expects the DOM
// to match exactly, but Emotion's client-side runtime manages styles differently,
// causing a mismatch (e.g., a <style> tag on the server where a <div> is expected
// on the client).
//
// To fix this, we create a custom Emotion cache that intercepts newly inserted styles
// and collects them. Using Next.js's `useServerInsertedHTML` hook, we flush those
// collected styles into proper <style> tags in the <head> during SSR. This ensures
// the server-rendered HTML and client-hydrated DOM are in sync, eliminating the
// hydration error.
//
// This is the officially recommended approach by MUI for Next.js App Router:
// https://mui.com/material-ui/integrations/nextjs/#app-router

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui" });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
