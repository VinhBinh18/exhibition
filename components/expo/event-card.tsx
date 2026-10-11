import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

import { ExhibitionEventRecord } from "@/types/records";
import { expoInfoHref } from "@/lib/expo";
import { eventDateLabel, eventTiming } from "@/lib/event-display";

type EventCardProps = {
  event: ExhibitionEventRecord;
};

export const EventCard = ({ event }: EventCardProps) => {
  const badge = eventTiming(event.fromDate, event.toDate);

  return (
    <Link
      href={expoInfoHref(event.id)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative flex h-36 items-end bg-gradient-to-br from-[#08052f] to-indigo-700 p-4">
        <span
          className={`absolute top-3 right-3 rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm ${badge.className}`}
        >
          {badge.label}
        </span>
        <p className="line-clamp-2 text-lg font-semibold leading-snug text-white">
          {event.name}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <p className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays className="size-4 shrink-0 text-primary/80" />
          <span>{eventDateLabel(event.fromDate, event.toDate)}</span>
        </p>
        <p className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="size-4 shrink-0 text-primary/80" />
          <span className="truncate">{event.location || "Đang cập nhật"}</span>
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary">
          Xem sự kiện
        </span>
      </div>
    </Link>
  );
};
