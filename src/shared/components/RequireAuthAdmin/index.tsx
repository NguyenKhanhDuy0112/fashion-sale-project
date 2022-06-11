import { Navigate, useLocation } from "react-router";
import useCurrentUser from "../../hooks/useCurrentUser";

function RequireAuthAdmin({ children }: any) {
    let auth = useCurrentUser();
    let location = useLocation();

    if (auth._id === '' || auth.isAdmin === 0) {
        return <Navigate to="/admin" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuthAdmin;