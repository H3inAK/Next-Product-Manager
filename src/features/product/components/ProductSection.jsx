"use client";

import useSWR from "swr";
import productFetcher, { productApiUrl } from "@/services/product";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductRow from "./ProductRow";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

const ProductSection = () => {
  const { data, isLoading, error } = useSWR(productApiUrl, productFetcher);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center py-10 text-red-500">
        Failed to load products
      </div>
    );

  return (
    <section className="max-w-6xl overflow-x-auto mx-auto px-6 py-2 my-2.5">
      <div className="flex justify-between items-center my-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type={`search`}
            placeholder={`Search...`}
            className={`w-xs pl-10`}
          ></Input>
        </div>
        <Link href={`/product/create`}>
          <Button>
            <Plus /> Add Product
          </Button>
        </Link>
      </div>

      <Table className={"shadow bg-white"}>
        {/* <TableCaption>A list of your bakery & cafe products</TableCaption> */}
        <TableHeader className={"font-bold"}>
          <TableRow>
            <TableHead className="w-[80px] text-center">#</TableHead>
            <TableHead>IMAGE</TableHead>
            <TableHead>TITLE</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead className="text-right">PRICE (MMK)</TableHead>
            <TableHead className="text-right">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((item, index) => (
            <ProductRow key={item.id} product={item} index={index + 1} />
          ))}
        </TableBody>
      </Table>

      <div></div>
    </section>
  );
};

export default ProductSection;
