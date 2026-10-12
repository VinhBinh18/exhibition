import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";

import { ExhibitionEventRecord } from "@/types/records";
import { expoInfoHref } from "@/lib/expo";
import { eventDateLabel, eventTiming } from "@/lib/event-display";
import { exhibitionProfileOf } from "@/lib/mock/exhibition-profiles";

type EventCardProps = {
  event: ExhibitionEventRecord;
};

export const EventCard = ({ event }: EventCardProps) => {
  const profile = exhibitionProfileOf(event.name);
  const badge = eventTiming(event.fromDate, event.toDate);
  const sessions = profile?.sessions ?? [];

  return (
    <Link
      href={expoInfoHref(event.id)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[2560/679] bg-[#071a5c]">
        {profile?.banner ? (
          <Image
            fill
            alt={event.name}
            src={profile.banner}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-end bg-gradient-to-br from-[#08052f] to-indigo-700 p-4">
            <p className="line-clamp-2 text-lg font-semibold leading-snug text-white">
              {event.name}
            </p>
          </div>
        )}
        <span
          className={`absolute top-3 right-3 rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-base font-semibold leading-snug text-slate-900 line-clamp-2 group-hover:text-primary">
          {event.name}
        </h3>
        {sessions.length ? (
          <div className="space-y-2">
            {sessions.map((session) => (
              <div key={session.city} className="space-y-1">
                <p className="flex items-center gap-2 text-sm text-slate-600">
                  <CalendarDays className="size-4 shrink-0 text-primary/80" />
                  <span>
                    {eventDateLabel(session.fromDate, session.toDate)} · {session.city}
                  </span>
                </p>
                <p className="flex items-start gap-2 text-sm text-slate-500">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary/80" />
                  <span>{session.venue}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="size-4 shrink-0 text-primary/80" />
              <span>{eventDateLabel(event.fromDate, event.toDate)}</span>
            </p>
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="size-4 shrink-0 text-primary/80" />
              <span className="truncate">{event.location || "Đang cập nhật"}</span>
            </p>
          </>
        )}
        <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary">
          Xem sự kiện
        </span>
      </div>
    </Link>
  );
};
