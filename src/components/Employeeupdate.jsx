"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function EmployeeUpdate({ employee, isOpen, setIsOpen, setSelectedEmployee, refreshData }) {
    const [formData, setFormData] = useState({
        ID: "",
        Name: "",
        Mobile: "",
        Salary: "",
        City: "",
        Sts: "", // No default value
    });

    // Set form data when employee is selected
    useEffect(() => {
        if (employee) {
            setFormData({
                ID: employee.ID || "",
                Name: employee.Name || "",
                Mobile: employee.Mobile || "",
                Salary: employee.Salary || "",
                City: employee.City || "",
                Sts: employee.Sts || "", // No default, just take from API
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (!formData.ID) {
                toast.error("Employee ID is missing!");
                return;
            }

            const response = await fetch(`/api/users?id=${formData.ID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Name: formData.Name,
                    Mobile: formData.Mobile,
                    Salary: formData.Salary,
                    City: formData.City,
                    Sts: formData.Sts, // Send Sts only if it exists
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update employee");
            }

            toast.success("Employee updated successfully!");

            // Close the dialog and reset the form
            setIsOpen(false);
            setSelectedEmployee(null);

            // Refresh the employee list if provided
            if (refreshData) refreshData();
        } catch (error) {
            console.error("Error updating employee:", error);
            toast.error("Failed to update employee. Please try again.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Employee</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <TextField
                    label="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Mobile"
                    name="Mobile"
                    value={formData.Mobile}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Salary"
                    name="Salary"
                    value={formData.Salary}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="City"
                    name="City"
                    value={formData.City}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                {formData.Sts && (
                     <div className="grid grid-cols-4 items-center gap-4">
                     {/* <Label htmlFor="Sts" className="text-right">Status</Label> */}
                     <select
                         id="Sts"
                         name="Sts"
                         value={formData.Sts}
                         onChange={handleChange}
                         className="col-span-3 p-2 border rounded"
                     >
                         <option value="A">Active</option>
                         <option value="P">Pending</option>
                         <option value="I">Inactive</option>
                     </select>
                 </div>
                )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
