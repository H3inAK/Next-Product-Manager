"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import categoryFetcher, { categoryApiUrl } from "@/services/category";
import productFetcher, {
  productApiUrl,
  updateProduct,
} from "@/services/product";
import { Loader2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";

const ProductEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  // Fetch categories
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useSWR(categoryApiUrl, categoryFetcher);

  // Fetch product by ID
  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useSWR(`${productApiUrl}/${id}`, productFetcher);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      product_name: "",
      category: "",
      price: 1000,
      confirm: false,
    },
  });

  const isConfirmed = watch("confirm");

  console.log('render component');

  // Load product data into form once available
  useEffect(() => {
    if (product && categories) {
      console.log("render => " , product);
      reset({
        product_name: product.title || "",
        category: product.category || "",
        price: product.price || 1000,
        confirm: false,
      });
    }

  }, [product, categories, reset]);

  // Submit handler
  const onSubmit = async (data) => {
    const { confirm, product_name: title, ...pureData } = data;

    try {
      const updatedData = {
        ...pureData,
        title,
        image: product?.image || `/images/default.png`,
      };

      const res = await updateProduct(id, updatedData);
      const updatedProduct = await res.json();
      if (!res.ok) throw new Error(updatedProduct.error.message);

      toast.success("Item was updated successfully!");
      reset();
      mutate(productApiUrl);
      router.push(`/product/${updatedProduct.id}`);
    } catch (error) {
      toast.error("Failed to update!", {
        description: error.message,
      });
    }
  };

  // Loading or error states
  if (isCategoriesLoading || isProductLoading) return <p>Loading...</p>;
  if (categoriesError || productError)
    return <p>Error: {categoriesError?.message || productError?.message}</p>;

  // Render form
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1 flex flex-col gap-3">
          {/* Product Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="product_name">Product Name</Label>
            <Input
              id="product_name"
              type="text"
              {...register("product_name", {
                required: "Product name is required",
              })}
            />
            {errors.product_name && (
              <p className="text-sm text-red-500">
                {errors.product_name.message}
              </p>
            )}
          </div>

          {/* Category (with Controller) */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              id="category"
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <>
                  <Select key={field.value} onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        ?.filter((category) => category.id != 0)
                        .map((category) => (
                          <SelectItem key={category.id} value={category.title}>
                            {category.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              {...register("price", {
                required: "Price must be provided",
                min: { value: 1000, message: "Minimum price is 1000" },
              })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Checkbox + Buttons */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex gap-3">
          <Checkbox
            id="confirm"
            checked={isConfirmed}
            onCheckedChange={(checked) =>
              setValue("confirm", checked, { shouldValidate: true })
            }
          />
          <Label htmlFor="confirm">I'm sure to update product.</Label>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => router.back()} type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={!isConfirmed || isSubmitting}>
            {isSubmitting && <Loader2Icon className="mr-2 animate-spin" />}
            {isSubmitting ? "Updating..." : "Update Item"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductEditForm;
