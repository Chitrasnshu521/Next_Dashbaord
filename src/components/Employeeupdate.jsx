"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function EmployeeUpdate({ employee, isOpen, setIsOpen, setSelectedEmployee }) {
    const [formData, setFormData] = useState({
        Name: "",
        Mobile: "",
        Salary: "",
        City: "",
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                id: employee.ID  || "",
                Name: employee.Name || "",
                Mobile: employee.Mobile || "",
                Salary: employee.Salary || "",
                City: employee.City || "",
            });
        } else {
            setFormData({id: "", Name: "", Mobile: "", Salary: "", City: "" });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const method = employee ? "PUT" : "POST"; // Use PUT for update, POST for create
            const url = employee ? `/api/users?id=${employee.ID}` : "/api/users";
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error("Failed to save employee");
            setIsOpen(false);
            setSelectedEmployee(null);
            // Optionally refresh the table data here by calling a parent function
        } catch (error) {
            console.error("Error saving employee:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{employee ? "Edit Employee" : "Add Employee"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                            id="Name"
                            name="Name"
                            value={formData.id}
                            onChange={handleChange}
                            className="col-span-3 hidden"
                        />
                        <Label htmlFor="Name" className="text-right">Name</Label>
                        <Input
                            id="Name"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Mobile" className="text-right">Mobile</Label>
                        <Input
                            id="Mobile"
                            name="Mobile"
                            value={formData.Mobile}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Salary" className="text-right">Salary</Label>
                        <Input
                            id="Salary"
                            name="Salary"
                            value={formData.Salary}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="City" className="text-right">City</Label>
                        <Input
                            id="City"
                            name="City"
                            value={formData.City}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}