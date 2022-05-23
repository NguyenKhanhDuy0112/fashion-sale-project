import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function Address() {
    return (
        <article className="address d-flex align-items-center p-3 bg-white border-radius-4">
            <div>
                <div className="address__head align-items-center mb-2 justify-content-between d-xl-flex d-none">
                    <p className="address__head-ship mb-0">Giao tới</p>
                    <Link to="/" className="address__head-change">Thay đổi</Link>
                </div>
                <div className="address__body d-flex align-items-center">
                    <p className="address__body-name mb-0">Nguyễn Khánh Duy</p>
                    <div className="address__body-separate mx-2"></div>
                    <p className="address__body-phone mb-0">0798132664</p>
                </div>
                <p className="address__text mb-0">
                    5D,Đặng Công Bỉnh, Xã Xuân Thới Thượng, Huyện Hóc Môn, Hồ Chí Minh
                </p>
            </div>
            <span className="d-xl-none d-block">
                <IoIosArrowForward  color="#8E8BA3"/>
            </span>
        </article>
    );
}

export default Address;