import { notFound } from "next/navigation";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  notFound();
}
