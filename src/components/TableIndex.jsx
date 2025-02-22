"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import FadeContent from "./ui/FadeContent";

export function DataTableDemo() {
    const [fullData, setFullData] = useState([]); // Store all records
    const [filterText, setFilterText] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/photos`)
            .then((response) => response.json())
            .then((json) => {
                setFullData(json);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Memoized local pagination
    const filteredData = useMemo(() => {
        return fullData.filter((item) =>
            Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [fullData, filterText]);
    
    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, page, pageSize]);
    
    const table = useReactTable({
        data: paginatedData,
        columns: [
            { accessorKey: "id", header: "ID" },
            { accessorKey: "albumId", header: "Album ID" },
            { accessorKey: "title", header: "Title" },
            { accessorKey: "url", header: "Image" },
            { accessorKey: "thumbnailUrl", header: "Thumbnail" },
        ],
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter data..."
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </div>
            <div className="rounded-md border">
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            [...Array(pageSize)].map((_, index) => (
                                <TableRow key={index}>
                                    {table.getAllColumns().map((col) => (
                                        <TableCell key={col.id}><Skeleton className="w-[50px] h-[20px]" /></TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {cell.column.id === "url" || cell.column.id === "thumbnailUrl" ? (
                                                <img src={cell.getValue()} alt="" className="w-5 h-5" />
                                            ) : (
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                </FadeContent>
            </div>
            <div className="flex justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span className="px-4 py-2">{page} / {Math.ceil(fullData.length / pageSize)}</span>
                <Button
                    variant="outline"
                    onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(fullData.length / pageSize)))}
                    disabled={page * pageSize >= fullData.length}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
