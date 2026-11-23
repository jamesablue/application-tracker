import { useCallback } from "react";
import { useSearchParams } from "react-router";
import {
  ARRANGEMENTS,
  PAGE_SIZES,
  SORT_ORDERS,
  STATUSES,
  type ApplicationStatus,
  type PageSize,
  type SortOrder,
  type WorkArrangement,
} from "./types";

export interface FilterState {
  query: string;
  status: ApplicationStatus | "";
  arrangement: WorkArrangement | "";
  sort: SortOrder;
  page: number;
  size: PageSize;
}

export const DEFAULTS: FilterState = {
  query: "",
  status: "",
  arrangement: "",
  sort: "newest",
  page: 1,
  size: 10,
};

function isOneOf<T extends string | number>(
  options: readonly T[],
  value: unknown,
): value is T {
  return (options as readonly unknown[]).includes(value);
}

export function readFilters(params: URLSearchParams): FilterState {
  const status = params.get("status");
  const arrangement = params.get("arrangement");
  const sort = params.get("sort");
  const page = Number(params.get("page")); 
  const size = Number(params.get("size"));

  return {
    query: params.get("query") ?? DEFAULTS.query,
    status: isOneOf(STATUSES, status) ? status : DEFAULTS.status,
    arrangement: isOneOf(ARRANGEMENTS, arrangement) ? arrangement : DEFAULTS.arrangement,
    sort: isOneOf(SORT_ORDERS, sort) ? sort : DEFAULTS.sort,
    page: Number.isInteger(page) && page >= 1 ? page : DEFAULTS.page,
    size: isOneOf(PAGE_SIZES, size) ? size : DEFAULTS.size, // ?size=7 -> 10
  };
}

function writeFilters(prev: URLSearchParams, state: FilterState): URLSearchParams {
  const next = new URLSearchParams(prev); // keep any params we don't own
  for (const key of Object.keys(DEFAULTS) as (keyof FilterState)[]) {
    if (state[key] === DEFAULTS[key]) next.delete(key); // keep URLs short
    else next.set(key, String(state[key]));
  }
  return next;
}

export function useUrlFilters() {
  const [params, setParams] = useSearchParams();
  const filters = readFilters(params);

  const updateFilters = useCallback(
    (changes: Partial<FilterState>) =>
      setParams((prev) => writeFilters(prev, { ...readFilters(prev), page: 1, ...changes })),
    [setParams],
  );

  return [filters, updateFilters] as const;
}
