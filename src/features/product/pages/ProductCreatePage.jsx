"use client";

import DashboardHeader from "@/components/DashboardHeader";
import React from "react";
import ProductCreateSection from "../components/ProductCreateSection";

const ProductCreatePage = () => {
  return (
    <>
      <DashboardHeader
        steps={[{ title: "Product", href: "/product" }]}
        currentPageTitle="Create Product"
      />
      <ProductCreateSection />
    </>
  );
};

export default ProductCreatePage;
