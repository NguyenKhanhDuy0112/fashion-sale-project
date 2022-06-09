import { Navigate, useLocation } from "react-router";
import useCurrentUser from "../../hooks/useCurrentUser";

function RequireAuthAdmin({ children }: any) {
    let auth = useCurrentUser();
    let location = useLocation();
    console.log(auth)

    if (auth._id === '' || auth.isAdmin === 0) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/admin" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuthAdmin;