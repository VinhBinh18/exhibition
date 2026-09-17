"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { ProductType } from "@/types/product";
import { getIconForCategory } from "@/utils/get/get-icon-for-category";
import { getEventBadge, getEventDate } from "@/utils/expo";

type EventCardProps = {
  product: ProductType;
  categoryLabel?: string;
};

export const EventCard = ({ product, categoryLabel }: EventCardProps) => {
  const badge = getEventBadge(product);
  const location = [product.attributes?.city, product.attributes?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-44">
        <Image
          fill
          alt={product.name}
          src={product.images?.[0]}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <span
          className={`absolute top-3 right-3 rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="min-h-12 text-base font-semibold leading-snug text-slate-900 line-clamp-2 group-hover:text-primary">
          {product.name}
        </h3>
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
          <Icon icon={getIconForCategory(product.category)} className="size-4 shrink-0" />
          <span className="truncate">{categoryLabel || product.category}</span>
        </p>
        <p className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays className="size-4 shrink-0 text-primary/80" />
          <span>{getEventDate(product)}</span>
        </p>
        <p className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="size-4 shrink-0 text-primary/80" />
          <span className="truncate">{location || "Việt Nam"}</span>
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary">
          Xem sự kiện
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
};
