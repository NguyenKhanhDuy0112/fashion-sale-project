import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";

function Address() {
    const currentUser = useCurrentUser()
    const [address, setAddress] = useState<any>()

    useEffect(() => {
        console.log(currentUser)
        if(currentUser.address !== ''){
            console.log(JSON.parse(currentUser.address))
            setAddress(JSON.parse(currentUser.address))
        }
    },[])
    return (
        <article className={`address d-flex align-items-center p-3 bg-white border-radius-4 ${currentUser._id !== '' ? 'd-flex' : 'd-none'}`}>
            <div>
                <div className="address__head align-items-center mb-2 justify-content-between d-xl-flex d-none">
                    <p className="address__head-ship mb-0">Giao tới</p>
                    <Link to="/checkout/shipping" className="address__head-change">Thay đổi</Link>
                </div>
                <div className="address__body d-flex align-items-center">
                    <p className="address__body-name mb-0">{currentUser.name}</p>
                    <div className="address__body-separate mx-2"></div>
                    <p className="address__body-phone mb-0">{currentUser.phone}</p>
                </div>
                <p className="address__text mb-0">
                    {address ? address.detail : ''}, {address ? address.village.full_name : ''}
                </p>
            </div>
            <span className="d-xl-none d-block">
                <IoIosArrowForward  color="#8E8BA3"/>
            </span>
        </article>
    );
}

export default Address;