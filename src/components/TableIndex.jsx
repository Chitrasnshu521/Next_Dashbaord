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
import { Pencil, Trash2 } from "lucide-react";
import EmployeeUpdate from "./Employeeupdate";
import EmployeeForm from "./EmployeeForm";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "react-hot-toast";

export function DataTableDemo() {
    const [fullData, setFullData] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const fetchData = () => {
        setLoading(true);
        fetch("/api/users")
            .then((response) => response.json())
            .then((json) => {
                setFullData(json);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = useMemo(() => {
        if (!Array.isArray(fullData)) return [];
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

    const handleEdit = async (id) => {
        if (!id) {
            console.error("Error: Missing ID for edit action!");
            return;
        }

        try {
            const response = await fetch(`/api/users?id=${id}`);
            if (!response.ok) throw new Error("Employee not found");

            const data = await response.json();
            setSelectedEmployee(data);
            setIsDialogOpen(true);
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    const handleDeleteConfirm = (id) => {
        setDeleteEmployeeId(id);
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteEmployeeId) {
            console.error("Error: Missing ID for delete action!");
            return;
        }

        setDeleteDialogOpen(false);

        try {
            const response = await fetch(`/api/users?id=${deleteEmployeeId}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete employee");
            }

            toast.success("Employee deleted successfully!");
            fetchData();
        } catch (error) {
            console.error("Error deleting employee:", error);
            toast.error("Error deleting employee: " + error.message);
        }
    };

    const table = useReactTable({
        data: paginatedData,
        columns: [
            { accessorKey: "rowIndex", header: "ID", cell: ({ row }) => row.index + 1 },
            { accessorKey: "Name", header: "Name" },
            { accessorKey: "Mobile", header: "Mobile" },
            { accessorKey: "Salary", header: "Salary" },
            { accessorKey: "City", header: "City" },
            {
                accessorKey: "Sts",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.original.Sts?.toUpperCase() || "I";
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
                        <div className="d-flex">
                            <Button className="me-1" size="sm" onClick={() => handleEdit(employeeId)}>
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteConfirm(employeeId)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    );
                },
            },
        ],
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4 justify-between w-full">
                <Input
                    placeholder="Filter data..."
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <EmployeeForm
                    employee={selectedEmployee}
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    setSelectedEmployee={setSelectedEmployee}
                    refreshData={fetchData}
                    className="min-w-3xs"
                />
                <EmployeeUpdate
                    employee={selectedEmployee}
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    setSelectedEmployee={setSelectedEmployee}
                    refreshData={fetchData}
                />
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
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
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
                <span className="px-4 py-2">{page} / {Math.ceil(filteredData.length / pageSize)}</span>
                <Button
                    variant="outline"
                    onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / pageSize)))}
                    disabled={page * pageSize >= filteredData.length}
                >
                    Next
                </Button>
            </div>
            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this employee?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
