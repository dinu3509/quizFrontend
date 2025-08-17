import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UseAuthCheck = (tokenKey, redirectPath = "/login") => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);

    if (!token) {
      // If no token, logout
      localStorage.removeItem("profileImage"); // remove profile image
      navigate(redirectPath);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const timeLeft = expTime - currentTime;

      if (timeLeft <= 0) {
        // Token expired
        localStorage.removeItem(tokenKey);
        localStorage.removeItem("profileImage"); // remove profile image only
        navigate(redirectPath);
        return;
      }

      const logoutTimeout = setTimeout(() => {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem("profileImage"); // remove profile image only
        navigate(redirectPath);
      }, timeLeft);

      return () => clearTimeout(logoutTimeout);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem(tokenKey);
      localStorage.removeItem("profileImage"); // remove profile image only
      navigate(redirectPath);
    }
  }, [navigate, tokenKey, redirectPath]);
};

export default UseAuthCheck;
