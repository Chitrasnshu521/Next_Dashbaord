"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FaPlus } from "react-icons/fa6";

export default function EmployeeForm({ selectedEmployee, refreshData }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", mobile: "", salary: "", city: "" });
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
          Name: formData.name,
          Mobile: formData.mobile,
          Salary: formData.salary,
          City: formData.city,
        }),
      });

      const result = await response.json();
  
      if (response.ok) {
        toast.success(result.message);
        setFormData({ name: "", mobile: "", salary: "", city: "" });
        setOpen(false);
        refreshData(); // Refresh the table after submission
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
    <div className="flex justify-end w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="contained" color="primary"><FaPlus /> Add Employee</Button>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField label="Full Name" name="name" fullWidth value={formData.name} onChange={handleChange} required />
            <TextField label="Mobile Number" name="mobile" type="tel" fullWidth value={formData.mobile} onChange={handleChange} required />
            <TextField label="Salary" name="salary" type="number" fullWidth value={formData.salary} onChange={handleChange} required />
            <TextField label="City" name="city" fullWidth value={formData.city} onChange={handleChange} required />
            <div className="d-flex gap-2">
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? <><CircularProgress size={20} /> Submitting...</> : "Submit"}
              </Button>
              <Button variant="outlined" onClick={() => setOpen(false)} color="error">Cancel</Button>
            </div>
          </form>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
