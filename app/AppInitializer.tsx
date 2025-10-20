// src/app/providers/AppInitializer.tsx
"use client";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useEffect } from "react";

export default function AppInitializer() {
  const { configs, isFetching, isError } = useAppConfig();

  useEffect(() => {
    if (configs) console.log("Configs loaded:", configs);
  }, [configs]);

  if (isFetching && !configs) return null; // or a spinner
  if (isError) return <div>Failed to load configuration.</div>;

  return null;
}
