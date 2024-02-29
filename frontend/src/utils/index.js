import { jwtDecode } from "jwt-decode";

const getStoredAuth = () => {
  const token = localStorage.getItem("token");
  return token ? token : null;
};

const parseJwt = (token) => {
  const decoded = jwtDecode(token);
  return decoded;
};

export { getStoredAuth, parseJwt };
