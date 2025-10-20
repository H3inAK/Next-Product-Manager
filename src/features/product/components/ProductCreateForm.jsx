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
import { productApiUrl, storeProduct } from "@/services/product";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";

const ProductCreateForm = () => {
  const router = useRouter();

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
      price: "",
      confirm: false,
    },
  });

  const isConfirmed = watch("confirm");

  const {
    data: categories,
    isLoading,
    error,
  } = useSWR(categoryApiUrl, categoryFetcher);

  const onSubmit = async (data) => {
    const { confirm, product_name: title, ...pureData } = data;

    try {
      const randomImageNumber = Math.floor(Math.random() * 17) + 1;
      const image = `/images/${randomImageNumber}.png`;
      const dataWithImage = {
        ...pureData,
        title,
        image,
      };
      const res = await storeProduct(dataWithImage);
      const product = await res.json();
      if (!res.ok) throw new Error(product.error.message);

      toast.success("Item was stored");
      reset();
      mutate(productApiUrl);
      router.push(`/product/${product.id}`);
    } catch (error) {
      toast.error("Failed to delete!", {
        description: error.message,
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

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

          {/* Category (Controller version only) */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              id="category"
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <>
                  <Select onValueChange={field.onChange} value={field.value}>
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
                min: {
                  value: 1000,
                  message: "Minimum price is 1000",
                },
              })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {/* Checkbox */}
        <div className="flex gap-3">
          <Checkbox
            id="confirm"
            checked={isConfirmed}
            onCheckedChange={(checked) =>
              setValue("confirm", checked, { shouldValidate: true })
            }
          />
          <Label htmlFor="confirm">I'm sure to add Product.</Label>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button onClick={() => router.back()} type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={!isConfirmed || isSubmitting}>
            {isSubmitting && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            {isSubmitting ? "Saving..." : "Save to Menu Item"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductCreateForm;
