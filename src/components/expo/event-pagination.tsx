"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { expoHref } from "@/utils/expo";

type EventPaginationProps = {
  page: number;
  totalPages: number;
  query?: Record<string, string | undefined>;
  onPageChange?: (page: number) => void;
};

const pageList = (current: number, total: number) => {
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  if (current <= 3) return [1, 2, 3, 4, 5];
  if (current >= total - 2) {
    return [total - 4, total - 3, total - 2, total - 1, total];
  }
  return [current - 2, current - 1, current, current + 1, current + 2];
};

export const EventPagination = ({
  page,
  totalPages,
  query,
  onPageChange,
}: EventPaginationProps) => {
  if (totalPages <= 1) return null;

  const useLinks = !onPageChange;
  const hrefFor = (target: number) => expoHref(query || {}, target);

  const goTo = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    onPageChange?.(next);
  };

  const controlClass = (disabled: boolean) =>
    cn(
      "flex size-8 items-center justify-center rounded-full text-slate-500 transition-colors",
      disabled
        ? "pointer-events-none opacity-40"
        : "hover:bg-slate-100 hover:text-primary"
    );

  const pageClass = (active: boolean) =>
    cn(
      "flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
      active
        ? "bg-primary text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100"
    );

  const renderControl = (
    target: number,
    label: string,
    icon: ReactNode,
    disabled: boolean
  ) => {
    if (useLinks) {
      return (
        <Link
          href={disabled ? "#" : hrefFor(target)}
          aria-label={label}
          aria-disabled={disabled}
          className={controlClass(disabled)}
          onClick={(event) => {
            if (disabled) event.preventDefault();
          }}
        >
          {icon}
        </Link>
      );
    }

    return (
      <button
        type="button"
        aria-label={label}
        disabled={disabled}
        onClick={() => goTo(target)}
        className={controlClass(disabled)}
      >
        {icon}
      </button>
    );
  };

  const renderPage = (value: number) => {
    const active = value === page;
    if (useLinks) {
      return (
        <Link
          key={value}
          href={hrefFor(value)}
          aria-current={active ? "page" : undefined}
          className={pageClass(active)}
        >
          {value}
        </Link>
      );
    }

    return (
      <button
        key={value}
        type="button"
        onClick={() => goTo(value)}
        aria-current={active ? "page" : undefined}
        className={pageClass(active)}
      >
        {value}
      </button>
    );
  };

  return (
    <nav aria-label="Phân trang sự kiện" className="flex justify-center pt-4">
      <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
        {renderControl(1, "Trang đầu", <ChevronsLeft className="size-4" />, page === 1)}
        {renderControl(
          page - 1,
          "Trang trước",
          <ChevronLeft className="size-4" />,
          page === 1
        )}
        {pageList(page, totalPages).map(renderPage)}
        {renderControl(
          page + 1,
          "Trang sau",
          <ChevronRight className="size-4" />,
          page === totalPages
        )}
        {renderControl(
          totalPages,
          "Trang cuối",
          <ChevronsRight className="size-4" />,
          page === totalPages
        )}
      </div>
    </nav>
  );
};
