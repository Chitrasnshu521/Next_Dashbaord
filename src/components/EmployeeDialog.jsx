"use client";

import { useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmployeeForm from "./EmployeeForm";
import { FaPlus } from "react-icons/fa6";

export default function EmployeeDialog({ selectedEmployee, onSuccess, isOpen, onOpenChange }) {
  return (
    <div className="flex justify-center">
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="default"><FaPlus /> Add Employee</Button>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
          </DialogHeader>

          <EmployeeForm 
            selectedEmployee={selectedEmployee} 
            onSuccess={onSuccess} 
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}