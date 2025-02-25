import sql from "mssql";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Required for Azure
    trustServerCertificate: true, // Needed for self-signed certificates
  },
};

// Global connection pool to prevent multiple reconnections in serverless environments
let poolPromise;

export const connectToDatabase = async () => {
  try {
    if (!globalThis.poolPromise) {
      console.log("Attempting to connect to SQL Server...");
      globalThis.poolPromise = sql.connect(config);
    }

    const pool = await globalThis.poolPromise;
    console.log("✅ Connected to SQL Server");
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    throw err;
  }
};
