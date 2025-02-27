"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EmployeeForm({ selectedEmployee, onSuccess }) {
  const [formData, setFormData] = useState({ 
    id: "", 
    name: "", 
    mobile: "", 
    salary: "", 
    city: "" 
  });
  const [loading, setLoading] = useState(false);

  // Pre-fill form data when selectedEmployee changes
  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        id: selectedEmployee.ID,
        name: selectedEmployee.Name,
        mobile: selectedEmployee.Mobile,
        salary: selectedEmployee.Salary,
        city: selectedEmployee.City
      });
    } else {
      setFormData({ id: "", name: "", mobile: "", salary: "", city: "" });
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = selectedEmployee ? `/api/users?id=${selectedEmployee.ID}` : "/api/users";
      const method = selectedEmployee ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setFormData({ id: "", name: "", mobile: "", salary: "", city: "" });
        onSuccess(); // Close the dialog and reset state
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {selectedEmployee && (
        <Input type="hidden" name="id" value={formData.id} />
      )}
      <Input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
      <Input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
      <Input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} required />
      <Input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}