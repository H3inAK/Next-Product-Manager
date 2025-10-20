"use client";

import DashboardHeader from "@/components/DashboardHeader";
import ProductSection from "../components/ProductSection";

const ProductPage = () => {
  return (
    <>
      <DashboardHeader currentPageTitle="Product" />
      <ProductSection />
    </>
  );
};

export default ProductPage;
