"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import {ColumnProduct} from "@/app/(protected)/admin/product/_components/columns";
import {DateTime} from "luxon";
import {cn} from "@/lib/utils";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.filter(header => {
                                console.log(header)
                                return true
                            }).map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell, i) => (
                                    <TableCell key={cell.id}>


                                        { /* Render image */}
                                        {(columns[i] as ColumnProduct).type == "image" ?
                                            <Image src={cell.getValue() as string} alt="Product Image"
                                                   objectFit={"contain"}
                                                   width="80"
                                                   height="80"
                                                   className={"rounded-md min-w-[80px] h-[80px] w-[80px] object-cover"}
                                            />
                                            : null}

                                        {/* Render date */}
                                        {(columns[i] as ColumnProduct).type == "date" ?
                                            <div
                                                /* @ts-ignore */
                                                style={{textWrap: !!((columns[i] as ColumnProduct).meta?.nowrap) ? "nowrap" : "unset"}}>
                                                {DateTime.fromJSDate(new Date(cell.getValue() as string))
                                                    .toFormat("dd LLL yyyy, HH:MM")}
                                            </div>

                                            : null}

                                        {/* Render text */}
                                        {(columns[i] as ColumnProduct).type == "string" ?

                                            <div
                                                /* @ts-ignore */
                                                style={{textWrap: !!((columns[i] as ColumnProduct).meta?.nowrap) ? "nowrap" : "unset"}}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                            : null
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
