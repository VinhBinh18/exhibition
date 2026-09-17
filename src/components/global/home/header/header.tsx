"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

import { EXPO_BRAND, EXPO_NAV } from "@/constants/expo/home";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const DesktopNav = () => (
  <nav className="hidden md:flex items-center gap-8">
    <Link
      href={EXPO_NAV.home.href}
      className="text-sm font-medium text-slate-700 hover:text-primary"
    >
      {EXPO_NAV.home.label}
    </Link>

    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-primary outline-none">
        {EXPO_NAV.exhibitions.label}
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {EXPO_NAV.exhibitions.children.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    <Link
      href={EXPO_NAV.contact.href}
      className="text-sm font-medium text-slate-700 hover:text-primary"
    >
      {EXPO_NAV.contact.label}
    </Link>
  </nav>
);

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="wrapper h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900"
        >
          {EXPO_BRAND}
        </Link>

        <DesktopNav />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden p-2 -mr-2 text-slate-800"
            aria-label="Mở menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>{EXPO_BRAND}</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-4 px-4">
              <Link href="/" onClick={() => setOpen(false)}>
                {EXPO_NAV.home.label}
              </Link>
              <Link href="/trien-lam" onClick={() => setOpen(false)}>
                Đang & Sắp diễn ra
              </Link>
              <Link href="/lien-he" onClick={() => setOpen(false)}>
                {EXPO_NAV.contact.label}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
