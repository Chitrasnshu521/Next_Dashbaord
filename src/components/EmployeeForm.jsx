"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EmployeeForm({ onSuccess }) {
  const [formData, setFormData] = useState({ name: "", mobile: "", salary: "", city: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: formData.name, // ✅ Match API field names
          Mobile: formData.mobile,
          Salary: formData.salary,
          City: formData.city,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success(result.message);
        setFormData({ name: "", mobile: "", salary: "", city: "" });
        onSuccess();
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
