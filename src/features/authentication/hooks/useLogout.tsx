import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { authServices } from "../services/authServices";

export default function useLogout() {
  const { refreshUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function logout() {
    await authServices.logout();
    await refreshUser();
    navigate("/");
  }

  return { logout };
}
