import { IoCloseSharp } from "react-icons/io5";
import ModalCustom from "../../../../../shared/components/ModalCustom";

interface Props{
    show: boolean,
    onShow: () => void,
    description: string,
}

function ProductDetailDescriptionMobile(props: Props) {
    const { show, onShow, description } = props

    return (
        <ModalCustom show={show} onHandleShow={onShow} position="full" >
            <div className="modalCustom__header px-2">
                <span onClick={onShow} className="modalCustom__header-icon p-1">
                    <IoCloseSharp size={30} color="#fff" />
                </span>
                <h5 className="modalCustom__header-title">Mô tả</h5>
            </div>
            <div className="modalCustom__body mt-5 py-4 px-3">
                <p className="productDetail__description-title mb-2">
                    CAM KẾT CỦA 5S:
                </p>
                <p className="productDetail__description-content">
                    BẢNG SIZE CHUẨN THEO SỐ ĐO NGƯỜI VIỆT NAM.<br />

                    HOÀN 100% GIÁ TRỊ ĐƠN HÀNG NẾU KHÔNG GIỐNG MÔ TẢ <br />

                    HỖ TRỢ MIỄN PHÍ ĐỔI - TRẢ SẢN PHẨM MỌI TRƯỜNG HỢP. <br />
                </p>
                <p className="productDetail__description-title mb-2">
                    THÔNG TIN SẢN PHẨM:
                </p>
                <p className="productDetail__description-content">
                    Tên sản phẩm: Áo Polo Nam 5S (4 Màu), Chất Liệu Mềm Mại, Thoáng Mát, Chống Nhăn, Phom Dáng Ôm Trẻ Trung, Năng Động (APC21019)<br />
                    Chất liệu: 95% CVC, 5% Spandex<br />
                    Màu sắc: Trắng, Navy, Ghi tối, Xanh ngọc<br />
                    Phom dáng: Slimfit<br />
                    Size: S-M-L-XL-2XL<br />
                    Xuất xứ: Việt Nam
                </p>
                <p className="productDetail__description-title mb-2">
                    SỨ MỆNH CỦA 5S:
                </p>
                <p className="productDetail__description-content">
                    Giá trị cốt lõi của 5S là mang tới khách hàng bộ sản phẩm chất lượng số 1 thị trường!<br />
                    Sản phẩm được thiết kế độc quyền bởi thương hiệu 5S với hệ thống hơn 20 showrooms trên toàn quốc tại: Thái Bình, Quảng Ninh, Nam Định, Quảng Ngãi, Bắc Ninh, Thái Nguyên,<br />
                    Hơn 1 triệu lượt khách hàng thân thiết mỗi năm. Quý khách hàng hoàn toàn có thể yên tâm khi mua sắm tại 5S.<br />
                </p>
                <p className="productDetail__description-title mb-2">
                    Tính năng nổi bật:
                </p>
                <p className="productDetail__description-content">
                    - Ba điểm nổi bật của 1 chiếc áo Polo nam 5S: Mát – Mềm – Đẹp<br />
                    - Thấm hút mồ hôi tốt, mềm mại, tạo cảm giác luôn thoáng mát<br />
                    - Chống nhăn, bền màu<br />
                    - Phom áo hơi ôm tạo sự trẻ trung, năng động<br />
                    - Áo Polo nam 5S co giãn 4 chiều giúp người mặc cảm thấy dễ chịu ngay cả khi vận động<br />
                    - Phù hợp cho mọi hoạt động: đi làm, đi chơi,<br />
                </p>
                <p className="productDetail__description-title mb-2">
                    Hướng dẫn sử dụng:
                </p>
                <p className="productDetail__description-content mb-0">
                    - Giặt máy với chu kỳ trung bình và vòng quay ngắn<br />
                    - Nên kết hợp nước xả vải để áo được mềm mịn và phẳng hơn<br />
                    - Giặt với nhiệt độ tối đa 30 độ C<br />
                    - Sấy nhẹ ở nhiệt độ thường<br />
                    - Là ủi không quá 110 độ C<br />
                    - Phơi bằng móc dưới bóng râm <br />
                    - Không sử dụng chất tẩy <br />
                </p>
            </div>
        </ModalCustom>
    );
}

export default ProductDetailDescriptionMobile;