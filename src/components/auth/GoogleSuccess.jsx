import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function GoogleSuccess() {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setError("Missing token");
      navigate("/login?error=MissingToken", { replace: true });
      return;
    }

    const processLogin = async () => {
      try {
        await loginWithToken(token);
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Google login failed:", err);
        setError("Login failed");
        navigate("/login?error=GoogleLoginFailed", { replace: true });
      }
    };

    processLogin();
  }, [loginWithToken, navigate]);

  return (
    <div style={{ padding: 20 }}>
      {error ? <p>{error}</p> : <p>Processing Google Login...</p>}
    </div>
  );
}
