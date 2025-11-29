import axios from "axios";
import backendurl from "./Constanceapi";

export default async function googleLogin() {
  window.location.href = `http://localhost:8080/oauth2/authorization/google`;
}
