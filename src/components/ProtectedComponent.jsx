import jwtDecode from "jwt-decode";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export function RoleProtectComponentAdmin({ children, isRoleRequiredArrays }) {
  const [token, setToken] = useState(() => {
    if (!localStorage.getItem("token")) return null;
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  });
  const isAuthenticated = token; // Có token => đã đăng nhập
  const roleRequired = isRoleRequiredArrays.includes(token.role);
  if (!isAuthenticated || !roleRequired) {
    // Chuyển hướng đến trang login nếu chưa đăng nhập
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
export function RoleProtectComponentClient({ children, isRoleRequiredArrays }) {
  const [token, setToken] = useState(() => {
    if (!localStorage.getItem("token")) return null;
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  });
  const isAuthenticated = token; // Có token => đã đăng nhập
  const roleRequired = isRoleRequiredArrays.includes(token.role);
  if (!isAuthenticated || !roleRequired) {
    // Chuyển hướng đến trang login nếu chưa đăng nhập
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
