"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { deleteProduct, productApiUrl } from "@/services/product";
import { Edit, Loader2Icon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

const ProductRow = ({
  product: { id, title, price, category, image },
  index,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteProduct(id);
      const removedProduct = await res.json();

      if (!res.ok) throw new Error(removedProduct.message);

      if (res.status >= 200 && res.status <= 299) {
        toast("Item removed", {
          action: {
            label: "Undo",
            onClick: async () => {
              toast.dismiss();
              await fetch(productApiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(removedProduct),
              });
              mutate(productApiUrl);
            },
          },
        });
        mutate(productApiUrl);
      } else {
        throw new Error("Failed to delete product!");
      }
    } catch (error) {
      toast.error("Failed to delete", {
        description: error.message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <TableRow
      onClick={() => router.push(`/product/${id}`)}
      className={`cursor-pointer`}
    >
      <TableCell className={"text-center"}>{index}</TableCell>
      <TableCell>
        <img
          src={image}
          alt={title}
          className="w-14 h-14 rounded-full object-cover"
        />
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell className={`text-right`}>{price}</TableCell>
      <TableCell>
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex gap-2 items-center justify-end"
        >
          <Button
            onClick={() => router.push(`/product/${id}/edit`)}
            variant={`outline`}
            className={`rounded-sm`}
          >
            <Edit />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isDeleting} className={`rounded-sm`}>
                {isDeleting ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <Trash />
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove the
                  data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProduct}>
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
