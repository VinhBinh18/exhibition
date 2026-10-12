import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, ChevronRight, MapPin } from "lucide-react";

import { ExhibitionEventRecord } from "@/types/records";
import { eventDateLabel, eventTiming } from "@/lib/event-display";
import { exhibitionProfileOf } from "@/lib/mock/exhibition-profiles";

const plainText = (value?: string) =>
  (value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

type ExhibitionInfoProps = {
  event: ExhibitionEventRecord;
};

export const ExhibitionInfo = ({ event }: ExhibitionInfoProps) => {
  const profile = exhibitionProfileOf(event.name);
  const badge = eventTiming(event.fromDate, event.toDate);
  const dateLabel = eventDateLabel(event.fromDate, event.toDate);
  const summary = profile?.summary || plainText(event.description);
  const sessions = profile?.sessions ?? [];
  const registerHref = `/lien-he?eventId=${encodeURIComponent(event.id)}`;

  return (
    <div className="bg-slate-50 pb-16">
      {profile?.banner ? (
        <div className="relative aspect-[2560/679] bg-[#071a5c]">
          <Image
            fill
            priority
            alt={event.name}
            src={profile.banner}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ) : null}

      <div className="border-b border-slate-200 bg-white">
        <div className="wrapper space-y-6 py-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1 text-sm text-slate-400"
          >
            <Link href="/" className="hover:text-primary">
              Trang chủ
            </Link>
            <ChevronRight className="size-3.5" />
            <Link href="/trien-lam" className="hover:text-primary">
              Triển lãm
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-slate-600">{event.name}</span>
          </nav>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-primary">
                {profile?.eyebrow || badge.label}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {event.name}
              </h1>
              {profile?.tagline ? (
                <p className="text-lg font-medium text-slate-800">{profile.tagline}</p>
              ) : null}
              <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {summary}
              </p>
              {profile?.market ? (
                <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  {profile.market}
                </p>
              ) : null}
              <Link
                href={registerHref}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Đăng ký tham gia
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {profile?.poster ? (
              <div className="relative mx-auto aspect-[2560/1709] w-full max-w-xs overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <Image
                  fill
                  alt={`${event.name} poster`}
                  src={profile.poster}
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="wrapper grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-10">
          <section id="schedule" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Thời gian và địa điểm</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {(sessions.length
                ? sessions
                : [
                    {
                      city: event.location,
                      fromDate: event.fromDate,
                      toDate: event.toDate,
                      venue: event.location,
                      address: "",
                    },
                  ]
              ).map((session) => (
                <article
                  key={`${session.city}-${session.fromDate}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <p className="text-sm font-semibold text-primary">{session.city}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-900">
                    <CalendarDays className="size-4 text-primary" />
                    {eventDateLabel(session.fromDate, session.toDate)}
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      {session.venue}
                      {session.address ? ` — ${session.address}` : ""}
                    </span>
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(session.address || session.venue)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                  >
                    Xem bản đồ
                    <ArrowRight className="size-4" />
                  </a>
                </article>
              ))}
            </div>
          </section>

          {profile?.reasons.length ? (
            <section id="reasons" className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Lý do trưng bày & giá trị</h2>
              <div className="grid gap-4">
                {profile.reasons.map((reason) => (
                  <article
                    key={reason.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5"
                  >
                    <h3 className="font-semibold text-slate-900">{reason.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {reason.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Tổng quan sự kiện</h2>
              <p className="leading-relaxed text-slate-600">{summary}</p>
            </section>
          )}
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-slate-900">Thông tin nhanh</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">Tên</dt>
              <dd className="font-medium text-slate-800">{event.name}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Thời gian</dt>
              <dd className="font-medium text-slate-800">
                {sessions.length
                  ? sessions
                      .map(
                        (session) =>
                          `${session.city}: ${eventDateLabel(session.fromDate, session.toDate)}`
                      )
                      .join(" · ")
                  : dateLabel}
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">Địa điểm</dt>
              <dd className="font-medium text-slate-800">
                {sessions.length
                  ? sessions.map((session) => session.city).join(", ")
                  : event.location}
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">Trạng thái</dt>
              <dd className="font-medium text-slate-800">{badge.label}</dd>
            </div>
          </dl>
          <Link href={registerHref} className="inline-flex text-sm font-semibold text-primary">
            Đăng ký ngay
          </Link>
        </aside>
      </div>
    </div>
  );
};
