import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { ABOUT, INITIAL_DEFAULT } from "../../Constants/links";
import { ANON } from "../../Constants/roles";

export default function ProtectedRoute({ element, requiredRoles }) {
  const navigate = useNavigate();

  const { role } = useContext(UserContext);

  useEffect(() => {
    if (role === ANON) navigate(INITIAL_DEFAULT);
    else if (Array.isArray(requiredRoles)) {
      if (!requiredRoles.includes(+role)) {
        navigate(ABOUT);
      }
    } else if (+role !== requiredRoles) {
      navigate(ABOUT);
    }
  }, [role, requiredRoles, navigate]);

  return role !== ANON ? element : null;
}
