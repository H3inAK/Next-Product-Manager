"use client";

import DashboardHeader from "@/components/DashboardHeader";
import React from "react";
import ProductEditSection from "../components/ProductEditSection";
import { useParams } from "next/navigation";

const ProductEditPage = () => {
  const { id } = useParams();

  return (
    <>
      <DashboardHeader
        steps={[
          { title: "Product", href: "/product" },
          { title: "Product Detail", href: `/product/${id}` },
        ]}
        currentPageTitle="Edit Product"
      />
      <ProductEditSection />
    </>
  );
};

export default ProductEditPage;
