import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function GoogleSuccess() {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      loginWithToken(token);
      navigate("/", { replace: true });
    } else {
      navigate("/login?error=MissingToken", { replace: true });
    }
  }, []);

  return <div style={{ padding: 20 }}>Processing Google Login...</div>;
}
