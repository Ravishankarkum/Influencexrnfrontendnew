import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) return;

    // 1️⃣ Save token
    localStorage.setItem("authToken", token);

    // 2️⃣ Fetch logged-in user data
    axios
      .get("https://influencexrn-01.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const role = res.data.user?.role;

        if (role === "influencer") navigate("/influencer/dashboard");
        else if (role === "brand") navigate("/brand/dashboard");
        else navigate("/");
      })
      .catch(() => navigate("/"));
  }, []);

  return <h2 className="p-6 text-xl">Signing you in...</h2>;
}
