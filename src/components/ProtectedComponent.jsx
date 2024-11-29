import {jwtDecode} from "jwt-decode";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedComponent({ children, requiredRole }) {
  const [token, setToken] = useState(() => {
    if (!localStorage.getItem("token")) return null;
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  });
  console.log({ token });
  const isAuthenticated = token; // Có token => đã đăng nhập
  // const hasRequiredRole = !requiredRole || (token?.role === requiredRole);
  const hasRequiredRole = token.role === "ADMIN";
  if (!isAuthenticated || !hasRequiredRole) {
    // Chuyển hướng đến trang login nếu chưa đăng nhập
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedComponent;
