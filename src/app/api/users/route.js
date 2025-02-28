import { connectToDatabase } from "@/lib/db";
import sql from "mssql";

export async function GET(req) {
    try {
        const pool = await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (id) {
            const result = await pool
                .request()
                .input("EmployeeID", sql.Int, id)
                .execute("AD_spGetEmployeeByID");
            if (!result.recordset.length) {
                return Response.json({ error: "Employee not found" }, { status: 404 });
            }
            return Response.json(result.recordset[0]);
        } else {
            const result = await pool.request().execute("AD_spGetEmployees");
            return Response.json(result.recordset);
        }
    } catch (error) {
        console.error("Error fetching employee data:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { Name, Mobile, Salary, City } = body;

        if (!Name || !Mobile || !Salary || !City) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const pool = await connectToDatabase();
        const result = await pool
            .request()
            .input("Name", sql.NVarChar, Name)
            .input("Mobile", sql.NVarChar, Mobile)
            .input("Salary", sql.NVarChar, Salary)
            .input("City", sql.NVarChar, City)
            .execute("AD_spInsertEmployee");

        if (result.recordset && result.recordset[0].ErrorMessage) {
            return Response.json({ error: result.recordset[0].ErrorMessage }, { status: 500 });
        }

        return Response.json({
            message: "Employee added successfully",
            employeeId: result.recordset[0].EmployeeID,
        });
    } catch (error) {
        console.error("Error inserting employee:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const { Name, Mobile, Salary, City, Sts } = body;

        if (!id || !Name || !Mobile || !Salary || !City || !Sts) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const pool = await connectToDatabase();
        const result = await pool
            .request()
            .input("EmployeeID", sql.Int, id)
            .input("Name", sql.NVarChar, Name)
            .input("Mobile", sql.NVarChar, Mobile)
            .input("Salary", sql.NVarChar, Salary)
            .input("City", sql.NVarChar, City)
            .input("Sts", sql.NVarChar, Sts)
            .execute("AD_spUpdateEmployee"); // Ensure this stored procedure exists

        if (result.recordset && result.recordset[0].ErrorMessage) {
            return Response.json({ error: result.recordset[0].ErrorMessage }, { status: 500 });
        }

        return Response.json({ message: "Employee updated successfully" });
    } catch (error) {
        console.error("Error updating employee:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
