"use client";

import sectionClasses from "@/lib/section_classes";
import ProductEditForm from "./ProductEditForm";

const ProductCreateSection = () => {
  return (
    <div className={sectionClasses}>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold w-full">Edit product</h2>

        <div className="mt-4">
          <ProductEditForm />
        </div>
      </div>
    </div>
  );
};

export default ProductCreateSection;
