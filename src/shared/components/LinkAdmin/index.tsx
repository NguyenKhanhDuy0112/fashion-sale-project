import { ReactChild, ReactComponentElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import  {useLocation} from "react-router";


interface PropLink {
    to:  string,
    children: ReactNode | ReactChild | ReactComponentElement<any>
}

function LinkAdmin(props: PropLink) {
    const { to, children } = props
    const location = useLocation()

    const match = location.pathname.includes(to)

    const classLink = `linkAdmin__item d-flex align-items-center ${match ? 'active' :''}`

    return ( 
        <li className="linkAdmin">
            <Link className={classLink} to={{pathname: to}}>{children}</Link>
        </li>
     );
}

export default LinkAdmin;