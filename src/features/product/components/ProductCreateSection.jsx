"use client";

import sectionClasses from "@/lib/section_classes";
import ProductCreateForm from "./ProductCreateForm";

const ProductCreateSection = () => {
  return (
    <div className={sectionClasses}>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold w-full">Add new product</h2>

        <div className="mt-4">
          <ProductCreateForm />
        </div>
      </div>
    </div>
  );
};

export default ProductCreateSection;
