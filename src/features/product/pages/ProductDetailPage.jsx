"use client";

import DashboardHeader from "@/components/DashboardHeader";
import ProductDetailSection from "../components/ProductDetailSection";
import { useParams } from "next/navigation";
import useSWR from "swr";
import productFetcher, { productApiUrl } from "@/services/product";

const ProductDetailPage = () => {
  const { id } = useParams();
  console.log(id);

  const {
    data: product,
    isLoading,
    error,
  } = useSWR(`${productApiUrl}/${id}`, productFetcher);

  return (
    <>
      <DashboardHeader
        steps={[{ title: "Product", href: "/product" }]}
        currentPageTitle="Product Detail"
      />
      {isLoading ? (
        <div className="flex items-center justify-center py-10 text-muted-foreground">
          Loading product...
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-10 text-red-500">
          Failed to load product
        </div>
      ) : (
        <ProductDetailSection product={product} />
      )}
    </>
  );
};

export default ProductDetailPage;
