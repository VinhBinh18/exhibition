import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import { ProductType } from "@/types/product";
import { getEventBadge, getEventDate, expoInfoHref } from "@/lib/expo";

import { EventCard } from "@/components/expo/event-card";

const TABS = [
  { id: "overview", label: "Tổng quan" },
  { id: "exhibit", label: "Trưng bày" },
  { id: "gallery", label: "Thư viện" },
  { id: "location", label: "Địa điểm" },
];

const plainText = (value?: string) =>
  (value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

type ExhibitionInfoProps = {
  event: ProductType;
  related: ProductType[];
  categoryLabel: string;
};

export const ExhibitionInfo = ({
  event,
  related,
  categoryLabel,
}: ExhibitionInfoProps) => {
  const badge = getEventBadge(event);
  const dateLabel = getEventDate(event);
  const city = String(event.attributes?.city || "");
  const country = String(event.attributes?.country || "Việt Nam");
  const venue = String(event.attributes?.venue || "");
  const organizer = String(event.attributes?.organizer || "Ban tổ chức");
  const eventType = String(event.attributes?.type || "Triển lãm thương mại");
  const place = [venue, city, country].filter(Boolean).join(", ");
  const summary = plainText(event.description);
  const mapQuery = encodeURIComponent(place || city || country);
  const calendarHref = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&details=${encodeURIComponent(summary)}&location=${encodeURIComponent(place)}`;

  const facts = [
    {
      label: "Thời gian",
      value: dateLabel,
      hint: "09:00 – 17:00 | GMT +7",
      icon: Clock3,
    },
    {
      label: "Địa điểm",
      value: place || "Đang cập nhật",
      hint: "Xem bản đồ",
      icon: MapPin,
    },
    { label: "Quy mô", value: "Đang cập nhật", hint: eventType, icon: Users },
    {
      label: "Thị trường",
      value: country,
      hint: city || "Đang cập nhật",
      icon: CalendarDays,
    },
  ];

  const highlights = [
    `Trưng bày sản phẩm và giải pháp thuộc lĩnh vực ${categoryLabel}.`,
    `Diễn ra ${dateLabel}${place ? ` tại ${place}` : ""}.`,
    `Kết nối doanh nghiệp trưng bày với người mua, nhà phân phối và đối tác chuyên ngành.`,
    `Đơn vị tổ chức: ${organizer}.`,
  ];

  return (
    <div className="bg-slate-50 pb-16">
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

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-primary">
                {categoryLabel}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {event.name}
              </h1>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {summary ||
                  `${event.name} là sự kiện ${eventType.toLowerCase()} thuộc lĩnh vực ${categoryLabel}.`}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Đăng ký gian hàng
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="relative h-52 overflow-hidden rounded-2xl border border-slate-200 bg-white lg:h-64">
              <Image
                fill
                priority
                alt={event.name}
                src={event.images?.[0]}
                className="object-cover"
                sizes="320px"
              />
              <span
                className={`absolute top-3 right-3 rounded-md px-2.5 py-1 text-xs font-semibold ${badge.className}`}
              >
                {badge.label}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                  <fact.icon className="size-4 text-primary" />
                  {fact.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {fact.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{fact.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="wrapper flex gap-6 overflow-x-auto py-3 text-sm font-medium">
          {TABS.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className="shrink-0 text-slate-600 hover:text-primary"
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>

      <div className="wrapper grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-10">
          <section id="overview" className="scroll-mt-32 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Tổng quan sự kiện
            </h2>
            <p className="leading-relaxed text-slate-600">
              {summary ||
                `${event.name} tập trung kết nối doanh nghiệp trưng bày với người mua và đối tác trong ngành ${categoryLabel}.`}
            </p>
            <ul className="space-y-2">
              {highlights.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-700">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="exhibit" className="scroll-mt-32 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Trưng bày tại {event.name}
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Giới thiệu sản phẩm, kết nối khách hàng tiềm năng và mở rộng cơ
              hội kinh doanh trong lĩnh vực {categoryLabel}.
            </p>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Lĩnh vực trưng bày
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {categoryLabel}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Doanh nghiệp thuộc nhóm {eventType.toLowerCase()} có thể đăng ký
                gian hàng để gặp người mua, nhà phân phối và đối tác chuyên
                ngành.
              </p>
              <Link
                href="/lien-he"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
              >
                Yêu cầu tư vấn gian hàng
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>

          <section id="gallery" className="scroll-mt-32 space-y-4">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Thư viện sự kiện
              </h2>
              <p className="text-sm text-slate-500">
                {event.images?.length || 0} hình ảnh
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {event.images?.map((src) => (
                <div
                  key={src}
                  className="relative h-56 overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <Image
                    fill
                    src={src}
                    alt={event.name}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </section>

          <section id="location" className="scroll-mt-32 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Địa điểm</h2>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="font-semibold text-slate-900">
                {venue || city || country}
              </p>
              <p className="mt-1 text-sm text-slate-600">{place}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
              >
                Xem bản đồ
                <ArrowRight className="size-4" />
              </a>
            </div>
          </section>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-32">
          <h2 className="text-lg font-bold text-slate-900">Thông tin nhanh</h2>
          <dl className="space-y-3 text-sm">
            {[
              ["Tên ngắn", event.name],
              ["Ngành", categoryLabel],
              ["Loại hình", eventType],
              ["Tổ chức", organizer],
              ["Kỳ", String(event.attributes?.year || "2026")],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-slate-400">{label}</dt>
                <dd className="font-medium text-slate-800">{value}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={expoInfoHref(event.slug, "gallery")}
            className="inline-flex text-sm font-semibold text-primary"
          >
            Xem thư viện
          </Link>
        </aside>
      </div>
    </div>
  );
};
