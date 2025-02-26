import { connectToDatabase } from "@/lib/db";
import sql from "mssql"; // ✅ Ensure this is imported correctly


export async function GET(req) {
  try {
    const pool = await connectToDatabase();

    // Execute the stored procedure to fetch students
    const result = await pool.request().execute("AD_spGetEmployees");

    return Response.json(result.recordset);
  } catch (error) {
    console.error("Error fetching student data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, mobile, salary, city } = body;

    if (!name || !mobile || !salary || !city) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pool = await connectToDatabase();

    const result = await pool
      .request()
      .input("Name", sql.NVarChar, name) // ✅ Corrected: Remove size from `sql.NVarChar`
      .input("Mobile", sql.NVarChar, mobile)
      .input("Salary", sql.NVarChar, salary)
      .input("City", sql.NVarChar, city)
      .execute("AD_spInsertEmployee");

    console.log("SQL Result:", result.recordset); // ✅ Log result

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
