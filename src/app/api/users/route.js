import { connectToDatabase } from "@/lib/db";

// export async function GET(req) {
//   try {
//     const pool = await connectToDatabase();
//     const result = await pool.request().query("SELECT * FROM admin_Ckuser");

//     return Response.json(result.recordset);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return Response.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

export async function GET(req) {
    try {
      const pool = await connectToDatabase();
      
      // Execute the stored procedure
      const result = await pool
        .request()
        .execute("AD_spGetStudentData"); // Call the stored procedure
  
      return Response.json(result.recordset);
    } catch (error) {
      console.error("Error fetching data from stored procedure:", error);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// export default async function handler(req, res) {
//   try {
//     const pool = await connectToDatabase();

//     if (req.method === "GET") {
//       const result = await pool.request().execute("AD_spGetEmpList");
//       return res.status(200).json(result.recordset);
//     }

//     if (req.method === "POST") {
//       const { Name, Mobile, Salary, City, Sts } = req.body;

//       if (!Name || !Mobile || !Salary || !City || !Sts) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }

//       const result = await pool
//         .request()
//         .input("Name", Name)
//         .input("Mobile", Mobile)
//         .input("Salary", Salary)
//         .input("City", City)
//         .input("Sts", Sts)
//         .execute("AD_spCreateEmp");

//       return res.status(201).json({ message: "Employee created successfully", result: result.recordset });
//     }

//     return res.status(405).json({ error: "Method Not Allowed" }); // For unsupported methods
//   } catch (error) {
//     console.error("Error handling request:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
