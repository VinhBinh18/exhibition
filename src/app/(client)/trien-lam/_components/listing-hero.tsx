import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { EXPO_LISTING_HERO } from "@/constants/expo/home";

export const ListingHero = () => (
  <section className="relative overflow-hidden bg-white">
    <div className="pointer-events-none absolute inset-0">
      <Image
        fill
        alt=""
        src={EXPO_LISTING_HERO.image}
        className="object-cover object-right opacity-[0.18]"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />
    </div>

    <div className="wrapper relative grid items-center gap-10 py-10 pb-16 lg:grid-cols-[1fr_minmax(320px,42%)] lg:py-14 lg:pb-20">
      <div className="max-w-2xl space-y-5">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1 text-sm text-slate-400"
        >
          {EXPO_LISTING_HERO.breadcrumbs.map((item, index) => {
            const isLast = index === EXPO_LISTING_HERO.breadcrumbs.length - 1;
            return (
              <span key={item.label} className="inline-flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="size-3.5 text-slate-300" />
                )}
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-500">{item.label}</span>
                )}
              </span>
            );
          })}
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
          {EXPO_LISTING_HERO.title}
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {EXPO_LISTING_HERO.description}
        </p>
      </div>

      <div className="relative hidden min-h-[280px] lg:block">
        <div className="absolute inset-y-0 right-0 w-[120%] overflow-hidden rounded-l-[2rem]">
          <Image
            fill
            alt="Hội chợ triển lãm"
            src={EXPO_LISTING_HERO.image}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
        </div>
      </div>
    </div>
  </section>
);
