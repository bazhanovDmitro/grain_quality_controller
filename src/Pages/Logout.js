import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { ANON } from "../Constants/roles";
import { logout } from "../Services/Auth";

export default function Logout() {
  const { setRole, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    logout();
    setRole(ANON);
    setUserInfo({});
  }, [setRole, setUserInfo]);

  return <></>;
}
