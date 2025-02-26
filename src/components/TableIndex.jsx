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
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react"; // Import the edit icon
import EmployeeDialog from "./EmployeeDialog";

export function DataTableDemo() {
    const [fullData, setFullData] = useState([]); // Store all records
    const [filterText, setFilterText] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        setLoading(true);
        fetch(`/api/users`)
            .then((response) => response.json())
            .then((json) => {
               // console.log("Fetched Data:", json); // ✅ Check if ID exists
                setFullData(json);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    // Filtered Data for Searching
    const filteredData = useMemo(() => {
        if (!Array.isArray(fullData)) {
            console.warn("fullData is not an array:", fullData);
            return [];
        }
        return fullData.filter((item) =>
            Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [fullData, filterText]);

    // Paginate Data
    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, page, pageSize]);

    const handleEdit = async (id) => {
        if (!id) {
            console.error("Error: Missing ID for edit action!");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`/api/users/${id}`);
            const data = await response.json();
            setSelectedEmployee(data); // Store fetched data
            setIsDialogOpen(true); // Open the dialog
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
        setLoading(false);
    };

    const table = useReactTable({
        data: paginatedData,
        columns: [
            {
                accessorKey: "rowIndex",
                header: "ID",
                cell: ({ row }) => row.index + 1, // Static Row ID
            },
            // {
            //     accessorKey: "ID",
            //     header: "Actual ID",
            //     cell: ({ row }) => row.original.ID || "N/A", // Ensure ID is displayed
            // },
            { accessorKey: "Name", header: "Name" },
            { accessorKey: "Mobile", header: "Mobile" },
            { accessorKey: "Salary", header: "Salary" },
            { accessorKey: "City", header: "City" },
            {
                accessorKey: "Sts",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.original.Sts ? row.original.Sts.toUpperCase() : "I"; // Default to "I"
                    const statusMap = {
                        A: { label: "Active", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
                        P: { label: "Pending", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
                        I: { label: "Inactive", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
                    };
                    const { label, className } = statusMap[status] || statusMap["I"];
                    return <Badge className={`${className} px-2 py-0.5 rounded text-xs`}>{label}</Badge>;
                },
            },
            {
                accessorKey: "ID",
                header: "Actions",
                cell: ({ row }) => {
                    const employeeId = row.original.ID;
                    if (!employeeId) return "N/A";
            
                    return (
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(employeeId)}>
                            <Pencil className="w-4 h-4" />
                        </Button>
                    );
                },
            }            
        ],
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4 justify-between">
                <Input
                    placeholder="Filter data..."
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <EmployeeDialog />
            </div>
            <div className="rounded-md border">
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
                                       <TableCell key={col.id}>
                                           <Skeleton className="w-[50px] h-[20px]" />
                                       </TableCell>
                                   ))}
                               </TableRow>
                           ))
                       ) : paginatedData.length > 0 ? (
                           table.getRowModel().rows.map((row) => (
                               <TableRow key={row.id}>
                                   {row.getAllCells().map((cell) => (
                                       <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                   ))}
                               </TableRow>
                           ))
                       ) : (
                    <TableRow>
            <TableCell colSpan={table.getAllColumns().length} className="text-center">
                No data found
            </TableCell>
        </TableRow>
    )}
</TableBody>

                </Table>
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
