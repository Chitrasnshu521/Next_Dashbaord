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
            setFormData({ ...selectedEmployee });
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
                onUpdate(); // Refresh data & close dialog
            } else {
                console.error("Failed to update record");
            }
        } catch (error) {
            console.error("Error updating record:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
                <Input name="Name" value={formData.Name} onChange={handleChange} placeholder="Name" />
                <Input name="Mobile" value={formData.Mobile} onChange={handleChange} placeholder="Mobile" />
                <Input name="Salary" value={formData.Salary} onChange={handleChange} placeholder="Salary" />
                <Input name="City" value={formData.City} onChange={handleChange} placeholder="City" />
                <select
                    name="Sts"
                    value={formData.Sts}
                    onChange={handleChange}
                    className="border p-2 rounded w-full my-2"
                >
                    <option value="A">Active</option>
                    <option value="P">Pending</option>
                    <option value="I">Inactive</option>
                </select>
                <div className="flex justify-end mt-4">
                    <Button onClick={handleUpdate} className="mr-2">Update</Button>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDialog;
