import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function GoogleSuccess() {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const processGoogleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        try {
          await loginWithToken(token); // wait for user to be set
          navigate("/", { replace: true });
        } catch (err) {
          console.error("Google login failed:", err);
          navigate("/login?error=GoogleLoginFailed", { replace: true });
        }
      } else {
        navigate("/login?error=MissingToken", { replace: true });
      }
    };

    processGoogleLogin();
  }, [loginWithToken, navigate]);

  return <div style={{ padding: 20 }}>Processing Google Login...</div>;
}
