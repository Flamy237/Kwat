import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featureBySlug, features, site } from "@/lib/content";
import DemoView from "@/components/DemoView";

type Props = { params: Promise<{ feature: string }> };

export function generateStaticParams() {
  return features.map((f) => ({ feature: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { feature } = await params;
  const f = featureBySlug(feature);
  return { title: f ? `${f.title} · ${site.name} (démo)` : site.name, robots: { index: false } };
}

export default async function DemoPage({ params }: Props) {
  const { feature } = await params;
  const f = featureBySlug(feature);
  if (!f) notFound();
  return <DemoView feature={f} />;
}
