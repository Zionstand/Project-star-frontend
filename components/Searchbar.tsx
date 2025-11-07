"use client";

import { Input } from "@/components/ui/input";
import { LoaderCircleIcon, SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatMoneyInput } from "@/lib/utils";
import { Label } from "./ui/label";

interface Props {
  placeholder?: string;
  search?: string;
  label?: string;
}

export const SearchBar = ({
  placeholder = "Search...",
  search,
  label,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  // Only use searchParams when we're in the browser
  const isClient = typeof window !== "undefined";
  const searchParams = isClient ? useSearchParams() : null;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState(search || "");

  // Sync query with URL param safely
  useEffect(() => {
    if (!searchParams) return;

    const urlQuery = searchParams.get("query") || "";
    if (urlQuery) {
      if (/^\d+$/.test(urlQuery)) {
        setQuery(formatMoneyInput(urlQuery));
      } else {
        setQuery(urlQuery);
      }
    } else {
      setQuery("");
    }
  }, [searchParams]);

  // Loading indicator when typing
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 3000);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [query]);

  // Debounced update to URL
  useEffect(() => {
    if (!isClient) return; // skip on server

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      if (query) {
        const sanitized = query.replace(/,/g, "");
        params.set("query", sanitized);
      } else {
        params.delete("query");
      }

      params.delete("page");

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [query, pathname, router, isClient, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setQuery(formatMoneyInput(raw));
  };

  return (
    <div className="w-full">
      {label && <Label>{label}</Label>}
      <div className="flex items-center relative justify-between bg-muted rounded-lg">
        <Input
          className="peer ps-9 pe-9"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircleIcon
              className="animate-spin"
              size={16}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <SearchIcon size={16} aria-hidden="true" />
          )}
        </div>
        {query && (
          <Button
            size="icon"
            variant={"ghost"}
            className="absolute right-1"
            onClick={() => setQuery("")}
          >
            <X />
          </Button>
        )}
      </div>
    </div>
  );
};
