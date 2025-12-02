import axios from "axios";
import backendurl from "./Constanceapi";

// 👉 Login Redirect (Google OAuth)
export const loginWithGoogle = () => {
  window.location.href = `${backendurl}/oauth2/authorization/google`;
};

// 👉 Fetch logged-in user
export const fetchUser = async () => {
  try {
    const response = await axios.get(`${backendurl}/api/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

// 👉 Logout (API only)
export const logout = async () => {
  return axios.post(`${backendurl}/logout`, {}, { withCredentials: true });
};
