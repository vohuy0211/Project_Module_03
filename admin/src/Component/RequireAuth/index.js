import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequiredAdmin() {
  const [hasToken, setHasToken] = useState(localStorage.getItem("token"));
  const location = useLocation();

  return hasToken && hasToken !== "" && hasToken !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}

export default RequiredAdmin;
