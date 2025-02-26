import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmployeeDialog = ({ selectedEmployee, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        Name: "",
        Mobile: "",
        Salary: "",
        City: "",
        Sts: "A",
    });

    useEffect(() => {
        if (selectedEmployee) {
            setFormData(selectedEmployee);
        }
    }, [selectedEmployee]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/users/${formData.ID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                onUpdate(); // Refresh data after update
                onClose(); // Close dialog
            } else {
                console.error("Failed to update record");
            }
        } catch (error) {
            console.error("Error updating record:", error);
        }
    };

    return (
        <div className="dialog">
            <h2>Edit Employee</h2>
            <Input name="Name" value={formData.Name} onChange={handleChange} placeholder="Name" />
            <Input name="Mobile" value={formData.Mobile} onChange={handleChange} placeholder="Mobile" />
            <Input name="Salary" value={formData.Salary} onChange={handleChange} placeholder="Salary" />
            <Input name="City" value={formData.City} onChange={handleChange} placeholder="City" />
            <select name="Sts" value={formData.Sts} onChange={handleChange}>
                <option value="A">Active</option>
                <option value="P">Pending</option>
                <option value="I">Inactive</option>
            </select>
            <Button onClick={handleUpdate}>Update</Button>
            <Button onClick={onClose}>Cancel</Button>
        </div>
    );
};

export default EmployeeDialog;
