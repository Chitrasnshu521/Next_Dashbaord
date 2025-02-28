"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

export default function EmployeeUpdate({ employee, isOpen, setIsOpen, setSelectedEmployee, refreshData }) {
    const [formData, setFormData] = useState({
        ID: "",
        Name: "",
        Mobile: "",
        Salary: "",
        City: "",
        Sts: "",
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
                Sts: employee.Sts || "", // Ensure it's a string
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
                    Sts: formData.Sts,
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
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogContent dividers>
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

                {/* ✅ Corrected MUI Select Dropdown */}
                <TextField
                        label="Status"
                        name="Sts"
                        value={formData.Sts}
                        onChange={handleChange}
                        select
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="A">Active</MenuItem>
                        <MenuItem value="P">Pending</MenuItem>
                        <MenuItem value="I">Inactive</MenuItem>
                    </TextField>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}
