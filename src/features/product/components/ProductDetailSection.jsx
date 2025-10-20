"use client";

import sectionClasses from "@/lib/section_classes";

const ProductDetailSection = ({ product }) => {
  const { id, title, category, price, image } = product;

  return (
    <div className={sectionClasses}>
      <h2 className="text-2xl font-bold mb-4">Product details</h2>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <img
                src={image}
                alt={title}
                className="aspect-square max-h-60 w-auto object-contain rounded-lg border border-border"
              />
            </div>

            <div className="col-span-2">
              <div className="rounded border border-border p-4">
                {/* --- MODIFICATIONS START HERE --- */}
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="w-32 py-3 pr-4 text-muted-foreground">
                        Item Name
                      </td>
                      <td className="py-3 font-semibold">{title}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="w-32 py-3 pr-4 text-muted-foreground">
                        Category
                      </td>
                      <td className="py-3 font-semibold">{category}</td>
                    </tr>
                    <tr>
                      <td className="w-32 py-3 pr-4 text-muted-foreground">
                        Price
                      </td>
                      <td className="py-3 font-semibold">{price}</td>
                    </tr>
                  </tbody>
                </table>
                {/* --- MODIFICATIONS END HERE --- */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1"></div>
      </div>
    </div>
  );
};

export default ProductDetailSection;