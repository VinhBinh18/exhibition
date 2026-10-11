import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { CategoryType } from "@/types/category";
import { ProductType } from "@/types/product";
import {
  EXPO_HERO,
  EXPO_SUPPORTS,
  EXPO_JOURNEYS,
  EXPO_INDUSTRY_COPY,
  EXPO_VALUES,
} from "@/constants/expo/home";

import { Button } from "@/components/ui/button";
import { UpcomingEvents } from "./upcoming-events";

export const ExpoHero = () => (
  <section className="bg-[#08052f] text-white">
    <div className="wrapper py-16 sm:py-24 lg:py-28 space-y-8 max-w-4xl">
      <p className="text-sm font-medium text-indigo-300">{EXPO_HERO.eyebrow}</p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight whitespace-pre-line">
        {EXPO_HERO.title}
      </h1>
      <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
        {EXPO_HERO.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg" className="h-12 px-6 rounded-md">
          <Link href={EXPO_HERO.primaryCta.href}>
            {EXPO_HERO.primaryCta.label}
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-12 px-6 rounded-md bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white"
        >
          <Link href={EXPO_HERO.secondaryCta.href}>
            {EXPO_HERO.secondaryCta.label}
          </Link>
        </Button>
      </div>
      <p className="text-sm text-slate-400">{EXPO_HERO.note}</p>
    </div>
  </section>
);

export const ExpoSupports = () => (
  <section className="bg-white">
    <div className="wrapper py-16 space-y-10">
      <div className="space-y-3 max-w-3xl">
        <h2 className="text-3xl font-bold text-slate-900">
          Những cách VietBest® Expo hỗ trợ doanh nghiệp
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {EXPO_SUPPORTS.map((item) => (
          <article
            key={item.title}
            className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const ExpoJourneys = () => (
  <section className="bg-slate-50">
    <div className="wrapper py-16 space-y-10">
      <div className="space-y-3 max-w-3xl">
        <p className="text-sm font-medium text-primary">
          Dành cho Doanh nghiệp
        </p>
        <h2 className="text-3xl font-bold text-slate-900">
          Chọn hành trình phù hợp với mục tiêu của bạn
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Dù bạn đang tìm cơ hội trưng bày, tìm nguồn cung hay quảng bá một
          triển lãm, VietBest® Expo giúp bạn tiếp cận thông tin và hành động phù
          hợp với từng mục tiêu kinh doanh.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {EXPO_JOURNEYS.map((item) => (
          <article
            key={item.title}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 flex flex-col gap-4"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed flex-1">
              {item.description}
            </p>
            <Link
              href={item.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              {item.cta}
              <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const ExpoIndustries = ({
  categories,
}: {
  categories: CategoryType[];
}) => {
  const featured = ["manufacturing", "food", "smart-city"]
    .map((name) => categories.find((category) => category.name === name))
    .filter(Boolean) as CategoryType[];

  const items = featured.length ? featured : categories.slice(0, 3);

  return (
    <section className="bg-white">
      <div className="wrapper py-16 space-y-10">
        <div className="space-y-3 max-w-3xl">
          <p className="text-sm font-medium text-primary">Ngành Triển lãm</p>
          <h2 className="text-3xl font-bold text-slate-900">
            Khám phá hội chợ triển lãm theo ngành
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Tìm sự kiện theo lĩnh vực để xác định những triển lãm phù hợp với
            sản phẩm, thị trường và mục tiêu phát triển kinh doanh của doanh
            nghiệp.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((category) => {
            const copy = EXPO_INDUSTRY_COPY[category.name];
            return (
              <article
                key={category._id}
                className="rounded-2xl overflow-hidden border border-slate-200 bg-white"
              >
                <div className="relative h-44">
                  <Image
                    fill
                    alt={category.label}
                    src={category.image}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {copy?.title || category.label}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {copy?.description ||
                      `Khám phá các hội chợ, triển lãm thuộc ngành ${category.label}.`}
                  </p>
                  <Link
                    href={`/collections/${category.name}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Xem Triển lãm
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <div>
          <Button asChild variant="outline" className="rounded-md">
            <Link href="/trien-lam">Khám phá Tất cả Ngành</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export const ExpoValues = () => (
  <section className="bg-slate-50">
    <div className="wrapper py-16 space-y-10">
      <div className="space-y-3 max-w-3xl">
        <p className="text-sm font-medium text-primary">
          Từ Thông tin đến Hành động
        </p>
        <h2 className="text-3xl font-bold text-slate-900">
          Thông tin triển lãm rõ hơn. Quyết định kinh doanh dễ hơn.
        </h2>
        <p className="text-slate-600 leading-relaxed">
          VietBest® Expo tổ chức thông tin triển lãm theo cách giúp doanh nghiệp
          nhanh chóng hiểu sự kiện, đánh giá mức độ phù hợp và thực hiện bước
          tiếp theo theo mục tiêu kinh doanh.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {EXPO_VALUES.map((item) => (
          <article
            key={item.title}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-3"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const ExpoUpcoming = ({
  products,
  categories,
}: {
  products: ProductType[];
  categories: CategoryType[];
}) => (
  <section className="bg-white">
    <div className="wrapper py-16 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">
            Sự kiện đang & sắp diễn ra
          </h2>
          <p className="text-slate-600">
            {products.length} sự kiện đang mở đăng ký tham dự
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-md w-fit">
          <Link href="/trien-lam">Xem tất cả</Link>
        </Button>
      </div>
      <UpcomingEvents products={products} categories={categories} />
    </div>
  </section>
);

export const ExpoCta = () => (
  <section className="bg-white">
    <div className="wrapper py-16 sm:py-20 space-y-6 max-w-3xl">
      <p className="text-sm font-medium text-indigo-600 ">Bắt đầu từ đây</p>
      <h2 className="text-3xl sm:text-4xl font-bold">
        Sẵn sàng khám phá cơ hội tiếp theo?
      </h2>
      <p className="text-slate-600 leading-relaxed">
        Tìm hội chợ triển lãm phù hợp với mục tiêu kinh doanh hoặc giới thiệu sự
        kiện của bạn tới cộng đồng doanh nghiệp.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg" className="h-12 rounded-md">
          <Link href="/trien-lam">Khám phá Hội chợ Triển lãm</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-12 rounded-md bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white"
        >
          <Link href="/lien-he">Đăng & Quảng bá Sự kiện</Link>
        </Button>
      </div>
    </div>
  </section>
);
