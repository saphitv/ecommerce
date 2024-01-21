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


                                        { /* Render image */ }
                                        {(columns[i] as ColumnProduct).type == "image" ?
                                            <Image src={cell.getValue() as string} alt="Product Image"
                                                   objectFit={"contain"}
                                                    width="80"
                                                    height="80"
                                                   className={"rounded-md h-20 w-20 object-fill"}
                                            />
                                            : null}

                                        {/* Render date */}
                                        {(columns[i] as ColumnProduct).type == "date" ?
                                            DateTime.fromJSDate(new Date(cell.getValue() as string))
                                                .toFormat("dd LLL yyyy, HH:MM")
                                            : null}

                                        {/* Render text */}
                                        {(columns[i] as ColumnProduct).type == "string" ?
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
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
