"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Product, products} from "@/lib/db/schemas/products";



export type ColumnProduct = ColumnDef<Product> & { type?: "string" | "date" | "image" | "nodisplay"}

export const columns: ColumnProduct[] = [
    {
        accessorKey: "image",
        header: "Image",
        type: "image"
    },
    {
        accessorKey: "name",
        header: "Name",
        type: "string",
        meta: {
            nowrap: true
        }
    },
    {
        accessorKey: "description",
        header: "Description",
        type: "string",
    },
    {
        accessorKey: "price",
        header: "Price",
        type: "string"
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        type: "date",
        meta: {
            nowrap: true
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Last Updated At",
        type: "date",
        meta: {
            nowrap: true
        }
    },
]