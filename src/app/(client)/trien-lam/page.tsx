import { Metadata } from "next";
import { Suspense } from "react";

import { fetchCategories } from "@/utils/api/categories";
import { fetchExpoFilterOptions, fetchExpos } from "@/utils/api/products";
import {
  EXPO_PAGE_SIZE,
  categoryLabelOf,
  expoQueryFromSearchParams,
} from "@/utils/expo";

import { EventCard } from "@/components/expo/event-card";
import { EventFilters, EventSort } from "@/components/expo/event-filters";
import { EventPagination } from "@/components/expo/event-pagination";
import { ListingHero } from "./_components/listing-hero";

export const metadata: Metadata = {
  title: "Đang & Sắp diễn ra | VietBest® Expo",
  description:
    "Khám phá hội chợ triển lãm đang và sắp diễn ra theo ngành, thời gian và địa điểm.",
};

type ExhibitionPageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const ExhibitionPage = async ({ searchParams }: ExhibitionPageProps) => {
  const raw = (await searchParams) || {};
  const query = { ...expoQueryFromSearchParams(raw), limit: EXPO_PAGE_SIZE };

  const [result, categories, options] = await Promise.all([
    fetchExpos(query),
    fetchCategories(),
    fetchExpoFilterOptions(),
  ]);

  return (
    <div className="min-h-[70vh] bg-slate-50">
      <ListingHero />

      <div className="wrapper relative z-10 -mt-5 space-y-8 pb-12">
        <Suspense
          fallback={
            <div className="h-28 animate-pulse rounded-2xl bg-indigo-50" />
          }
        >
          <EventFilters categories={categories} options={options} />
        </Suspense>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-slate-900">
              Sự kiện đang & sắp diễn ra
            </h2>
            <p className="text-sm text-slate-500">{result.total} sự kiện</p>
          </div>
          <Suspense fallback={<div className="h-10 w-48 animate-pulse rounded-full bg-white" />}>
            <EventSort />
          </Suspense>
        </div>

        {result.data.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {result.data.map((product) => (
              <EventCard
                key={product._id}
                product={product}
                categoryLabel={categoryLabelOf(product, categories)}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed bg-white py-16 text-center text-slate-500">
            Không tìm thấy sự kiện phù hợp với bộ lọc hiện tại.
          </p>
        )}

        <EventPagination
          page={result.page}
          totalPages={result.totalPages}
          query={raw}
        />
      </div>
    </div>
  );
};

export default ExhibitionPage;
