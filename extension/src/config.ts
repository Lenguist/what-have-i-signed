export const API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://what-have-i-signed.vercel.app";
