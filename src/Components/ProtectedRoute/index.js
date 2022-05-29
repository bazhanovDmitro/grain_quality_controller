import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { ABOUT, INITIAL_DEFAULT } from "../../Constants/links";
import { ANON } from "../../Constants/roles";

export default function ProtectedRoute({ element, requiredRoles }) {
  const navigate = useNavigate();

  const { role, isAppLoaded } = useContext(UserContext);

  useEffect(() => {
    if (isAppLoaded) {
      console.log(`render`);

      if (+role === ANON) navigate(INITIAL_DEFAULT);
      else if (Array.isArray(requiredRoles)) {
        if (!requiredRoles.includes(+role)) {
          navigate(ABOUT);
        }
      } else if (+role !== requiredRoles) {
        navigate(ABOUT);
      }
    }
  }, [role, requiredRoles, navigate, isAppLoaded]);

  return +role !== ANON ? element : null;
}
