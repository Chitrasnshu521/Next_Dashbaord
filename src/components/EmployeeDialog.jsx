"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmployeeForm from "./EmployeeForm";
import { FaPlus } from "react-icons/fa6";

export default function EmployeeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center">
      {/* Button to open the popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default"><FaPlus /> Add Employee</Button>
        </DialogTrigger>

        {/* Popup Dialog Content */}
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>

          {/* Employee Form Inside Dialog */}
          <EmployeeForm onSuccess={() => setOpen(false)} />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
