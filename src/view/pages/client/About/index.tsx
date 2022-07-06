import { FaRegComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import { showChat } from "../../../../modules/chat/chatSlice";
import useCurrentUser from "../../../../shared/hooks/useCurrentUser";

function About() {
    const dispatch = useDispatch()
    const currentUser = useCurrentUser()
    return (
        <>
            <div className="d-xl-block d-none">
                <HeaderClient />
            </div>
            <div className="d-xl-none d-block">
                <HeaderMobileTitle title="Giới thiệu về Tiki" />
            </div>
            <div className="py-3">
                <div className="container-client">
                    <div className="about">
                        <h2>Giới thiệu về Tiki</h2>
                        <p>
                            Tiki là một hệ sinh thái thương mại tất cả trong một, gồm các công ty thành viên như:
                        </p>
                        <p className="mb-0">
                            - Công ty TNHH TikiNOW Smart Logistics ("TNSL") là đơn vị cung cấp các dịch vụ logistics đầu-cuối, dịch vụ vận chuyển, dịch vụ bưu chính cho Sàn thương mại điện tử www.tiki.vn
                        </p>
                        <p className="mb-0">
                            - Công ty TNHH MTV Thương mại Ti Ki ("Tiki Trading") là đơn vị bán hàng hóa, dịch vụ trên sàn thương mại điện tử
                        </p>
                        <p className="mb">
                            - Đơn vị bán lẻ Tiki Trading và Sàn Giao dịch cung cấp 10 triệu sản phẩm từ 26 ngành hàng phục vụ hàng triệu khách hàng trên toàn quốc.

                        </p>
                        <p className="">
                            Với phương châm hoạt động “Tất cả vì Khách Hàng”, Tiki luôn không ngừng nỗ lực nâng cao chất lượng dịch vụ và sản phẩm, từ đó mang đến trải nghiệm mua sắm trọn vẹn cho Khách Hàng Việt Nam với dịch vụ giao hàng nhanh trong 2 tiếng và ngày hôm sau TikiNOW lần đầu tiên tại Đông Nam Á, cùng cam kết cung cấp hàng chính hãng với chính sách hoàn tiền 111% nếu phát hiện hàng giả, hàng nhái.
                        </p>
                        <p className="">
                            Thành lập từ tháng 3/2010, Tiki.vn hiện đang là trang thương mại điện tử lọt top 2 tại Việt Nam và top 6 tại khu vực Đông Nam Á.
                        </p>
                        <p >
                            Tiki lọt Top 1 nơi làm việc tốt nhất Việt Nam trong ngành Internet/E-commerce 2018 (Anphabe bình chọn), Top 50 nơi làm việc tốt nhất châu Á 2019 (HR Asia bình chọn).
                        </p>
                        <h2>Thông tin về công ty</h2>
                        <p className="mb-0">
                            - Công ty TNHH TI KI
                        </p>
                        <p>
                            - Địa chỉ đăng ký kinh doanh: Tòa Nhà Viettel, Số 285, Đường Cách Mạng Tháng 8 - Phường 12 - Quận 10 - TP Hồ Chí Minh - Việt Nam.
                        </p>
                        <p>
                            - Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 06/01/2010
                        </p>
                        <p>
                            Quý khách có nhu cầu liên lạc, trao đổi hoặc đóng góp ý kiến, vui lòng tham khảo các thông tin sau:
                        </p>
                        <p className="mb-0">
                            - Liên lạc qua điện thoại: 1900 6035
                        </p>
                        <p className="mb-0">
                            - Liên lạc qua email: Truy cập hotro.tiki.vn
                        </p>
                        <p className="mb-0">
                            - Fanpage của Tiki: http://facebook.com/tiki.vn
                        </p>
                        <p className="mb-3">
                            - Đối tác có nhu cầu hợp tác quảng cáo hoặc kinh doanh: marketing@tiki.vn
                        </p>
                        <p className="mb-0">
                            - Văn phòng chính: Tòa nhà Viettel, 285 Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh.
                        </p>
                        <p className="mb-4">
                            - Văn phòng: 52 Út Tịch, Phường 4, Quận Tân Bình, Thành Phố Hồ Chí Minh.
                        </p>
                        <div className="w-100 about-video">
                            <div className="about-video-child">
                                <iframe width="100%" src="https://www.youtube.com/embed/04KVix0i-no" title="Tiki Và Hành Trình Chinh Phục Triệu Con Tim" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className="d-xl-block d-none">
                <FooterClient />
            </div>
            {currentUser._id !== "" &&
                <button onClick={() => dispatch(showChat())} className="chat__btn d-xl-block d-none">
                    <span className="chat__btn-icon me-1">
                        <FaRegComment />
                    </span>
                    Chat
                </button>
            }
        </>
    );
}

export default About;