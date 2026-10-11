import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPublicEvent } from "@/lib/supabase/public-events";

import { ExhibitionInfo } from "./exhibition-info";

export const metadata: Metadata = {
  title: "Chi tiết triển lãm | VietBest® Expo",
};

const InfoPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) => {
  const { id } = await searchParams;
  if (!id) notFound();

  const event = await getPublicEvent(id);
  if (!event) notFound();

  return <ExhibitionInfo event={event} />;
};

export default InfoPage;
