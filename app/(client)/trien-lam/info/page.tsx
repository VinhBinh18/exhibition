import { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchCategories } from "@/lib/api/categories";
import { fetchProduct, fetchRelatedProducts } from "@/lib/api/products";
import { categoryLabelOf } from "@/lib/expo";

import { ExhibitionInfo } from "./exhibition-info";

type InfoPageProps = {
  searchParams: Promise<{ id?: string }>;
};

export const generateMetadata = async ({
  searchParams,
}: InfoPageProps): Promise<Metadata> => {
  const { id } = await searchParams;
  const event = id ? await fetchProduct(id) : null;

  return {
    title: event
      ? `${event.name} | VietBest® Expo`
      : "Chi tiết triển lãm | VietBest® Expo",
    description: event?.description?.replace(/<[^>]+>/g, " ").trim(),
  };
};

const InfoPage = async ({ searchParams }: InfoPageProps) => {
  const { id } = await searchParams;
  if (!id) notFound();

  const event = await fetchProduct(id);
  if (!event) notFound();

  const [categories, related] = await Promise.all([
    fetchCategories(),
    fetchRelatedProducts(event._id),
  ]);

  return (
    <ExhibitionInfo
      event={event}
      related={related}
      categoryLabel={categoryLabelOf(event, categories)}
    />
  );
};

export default InfoPage;
