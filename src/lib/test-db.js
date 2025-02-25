import { connectToDatabase } from "./db";

export default async function handler(req, res) {
  try {
    const pool = await connectToDatabase();
    res.status(200).json({ message: "Connected to SQL Server" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
}
