import { useRecoilValue } from "recoil";
import { userSelector } from "../recoil";
import { Navigate } from "react-router-dom";

const ProtectLoginOrSignup = ({ RedirectTo, Component }) => {
  const user = useRecoilValue(userSelector);

  if (user) {
    return <Navigate to={RedirectTo} />;
  }

  return Component;
};

const ProtectDashboard = ({ RedirectTo, Component }) => {
  const user = useRecoilValue(userSelector);

  if (!user) {
	return <Navigate to={RedirectTo} />;
  }

  return Component;
};

export { ProtectLoginOrSignup, ProtectDashboard };
