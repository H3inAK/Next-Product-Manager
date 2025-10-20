"use client";

import Link from "next/link";
import { BarChart3, Package, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import sectionClasses from "@/lib/section_classes";

const highlights = [
  {
    title: "Streamlined Catalog",
    description:
      "Keep your entire product catalog organized with categories, variants, and live status indicators.",
    icon: Package,
  },
  {
    title: "Actionable Insights",
    description:
      "Track performance at a glance, spot trends, and keep popular items in stock with ease.",
    icon: BarChart3,
  },
  {
    title: "Frictionless Updates",
    description:
      "Create new listings or edit existing products in seconds with the guided product workflows.",
    icon: Sparkles,
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <section className={sectionClasses}>
        <div className="rounded-xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-8 py-12 text-center text-zinc-50 shadow-xl">
          <p className="mb-3 inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-100">
            Product Hub
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Manage your products without the busywork
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-200 sm:text-lg">
            Build, launch, and maintain your product catalog from a single,
            intuitive dashboard. Jump into the product workspace to add new
            items, tweak details, and keep everything up to date.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2 bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
              <Link href="/product">
                Explore products
              </Link>
            </Button>
            <Link
              href="/product/create"
              className="text-sm font-semibold text-zinc-100 underline-offset-4 transition hover:text-white hover:underline"
            >
              Add a new product
            </Link>
          </div>
        </div>
      </section>

      <section className={sectionClasses}>
        <div className="grid gap-6 lg:grid-cols-3">
          {highlights.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-zinc-900 text-zinc-50">
                <Icon className="size-5" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-zinc-900">
                {title}
              </h2>
              <p className="mt-2 text-sm text-zinc-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClasses}>
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Ready to refine your catalog?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-600">
            Head over to the product dashboard to review listings, update
            pricing, or publish something new. Your latest changes sync across
            the app instantly.
          </p>
          <div className="mt-6">
            <Button
              asChild
              variant="outline"
              className="border-zinc-300 text-zinc-900 hover:bg-zinc-100"
            >
              <Link href="/product">Go to product dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
