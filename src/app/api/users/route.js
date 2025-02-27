import { connectToDatabase } from "@/lib/db";
import sql from "mssql"; // ✅ Ensure this is imported correctly


export async function GET(req) {
  try {
    const pool = await connectToDatabase();

    // Extract ID from query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); 

    if (id) {
      // Fetch the specific employee by ID
      const result = await pool.request()
        .input("EmployeeID", sql.Int, id)
        .execute("AD_spGetEmployeeByID"); // Ensure this stored procedure exists

      if (!result.recordset.length) {
        return Response.json({ error: "Employee not found" }, { status: 404 });
      }

      return Response.json(result.recordset[0]);
    } else {
      // Fetch all employees if no ID is provided
      const result = await pool.request().execute("AD_spGetEmployees");
      return Response.json(result.recordset);
    }
  } catch (error) {
    console.error("Error fetching employee data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, mobile, salary, city } = body;

    if (!id || !name || !mobile || !salary || !city) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pool = await connectToDatabase();

    const result = await pool
      .request()
      .input("EmployeeID", sql.Int, id)
      .input("Name", sql.NVarChar, name)
      .input("Mobile", sql.NVarChar, mobile)
      .input("Salary", sql.NVarChar, salary)
      .input("City", sql.NVarChar, city)
      .execute("AD_spUpdateEmployee"); // Ensure this stored procedure exists

    if (result.recordset && result.recordset[0].ErrorMessage) {
      return Response.json({ error: result.recordset[0].ErrorMessage }, { status: 500 });
    }

    return Response.json({
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("Error updating employee:", error);
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
