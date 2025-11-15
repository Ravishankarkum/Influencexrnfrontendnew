import { FcGoogle } from "react-icons/fc";

export function GoogleSignInButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 border p-2 rounded-md hover:bg-gray-100 transition"
    >
      <FcGoogle size={22} /> Sign in with Google
    </button>
  );
}
