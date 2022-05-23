import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";

function HeaderMobileTitle(props: {title: string}) {

    const navigate = useNavigate()

    return (
        <header className="headerClient__mobile d-flex justify-content-between align-items-center container-client py-2">
            <span className="headerClient__mobile-icon p-2" onClick={() => navigate(-1)}>
                <IoIosArrowBack size={22} fontWeight="700" color="#fff" />
            </span>
            <h4 className="mb-0 text-center text-white headerClient__mobile-title">{props.title}</h4>
        </header>
    );
}

export default HeaderMobileTitle;