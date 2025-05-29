// utils/auth.ts
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  nameid: string; // user ID
  email: string;
  role: string;
  FullName: string;
  exp: number;
  iat: number;
}

export function getUserFromToken(): DecodedToken | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Token çözümlenemedi:", error);
    return null;
  }
}
