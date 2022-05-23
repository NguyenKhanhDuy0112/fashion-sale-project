import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import productsService from '../../../../services/productService';
import Rating from '../../../../shared/components/Rating';
import TableCustom from '../../../../shared/components/TableCustom';
import { Product } from '../../../../shared/interfaces';

function ProductAdDetail() {
    const { slug } = useParams()
    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        handleLoadProduct()
    },[])

    const handleLoadProduct = async () => {
        const product = await productsService.findBySlug(String(slug))
        if(product){
            console.log(product)
        }
    }
    return (
        <article className="productAdDetail">
            <h5 className="title-admin mb-0">Sản phẩm chi tiết</h5>
            <div className='row g-3'>
                <div className="col-xl-5 col-lg-5 col-12">
                    <div className="productAdDetail__image">
                        <img className="productAdDetail__image-main w-100 mb-2" src="https://salt.tikicdn.com/cache/400x400/ts/product/4a/ce/f2/9b3bfd240e385838072d3832436d6245.jpg.webp" alt="" />
                        <Swiper
                            // install Swiper modules
                            modules={[]}
                            spaceBetween={5}
                            loop={true}
                            slidesPerView={4}

                            className="w-100 h-100 homeBanner__swiper border-radius-4"

                        >
                            <SwiperSlide>
                                <img className='w-100 productAdDetail__image-child cursor-pointer active' src="https://salt.tikicdn.com/cache/100x100/ts/product/7b/af/e3/60e6673d1ac9337b9431cd2656b1f0c8.jpg.webp" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className='w-100 productAdDetail__image-child cursor-pointer' src="https://salt.tikicdn.com/cache/100x100/ts/product/07/3e/fe/14172fb51417d6d9a33f832770304ec7.jpg.webp" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className='w-100 productAdDetail__image-child cursor-pointer' src="https://salt.tikicdn.com/cache/100x100/ts/product/a5/7b/9a/4f86ae55da63d641cc1f3911770a9069.jpg.webp" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className='w-100 productAdDetail__image-child cursor-pointer' src="https://salt.tikicdn.com/cache/100x100/ts/product/54/85/b7/31cc53a37b7e08dbde5cdfec428b8bdc.jpg.webp" alt="" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div className='col'>
                    <h5 className='productAdDetail__title mb-2'>Áo thun nam cổ bẻ ngắn tay cao cấp phong cách hàn quốc, áo thun polo nam MURADFASHION AT025</h5>
                    <div className='d-flex align-items-center mb-2'>
                        <Rating size={17} color="#FDD836" distance={1} stars={4} />
                        <Link to="" className='ms-2 productAdDetail__rating-number'>(1 đánh giá)</Link>
                    </div>
                    <div className='d-flex align-items-center mb-2'>
                        <p className='productAdDetail__price-current me-1 mb-0'>123.094</p>
                        <p className='productAdDetail__price-old mx-3 mb-0'>145.000</p>
                        <span className='productAdDetail__discount d-block'>45%</span>
                    </div>
                    <p className='productAdDetail__info mb-2'>Thông tin chi tiết</p>
                    <div className='d-flex mb-2'>
                        <span>Xuất xứ: </span>
                        <span className='ms-2'>America</span>
                    </div>
                    <div className='d-flex mb-2'>
                        <span>Chất liệu:</span>
                        <span className='ms-2'>Cotton</span>
                    </div>
                    <p>
                        Áo thun nam, áo phông có cổ bigsize từ 45kg đến gần 90kg - NH Shop

                        Nếu mình có bụng thì tăng size cho thoải mái nhé<br />

                        -- Mô tả sản phẩm:

                        Áo thun cổ trụ sang chảnh, bo cổ và bo tay chắc chắn không hề bai nhão

                        Các màu cơ bản dễ phối đồ: đen, trắng, xanh biển, xanh đậm, đỏ, xám đậm, xám lợt

                        Chất thun cotton, dày dặn, thấm hút mồ hôi.<br />

                        Đường may chắc chắn, sắc sảo

                        In logo nhẹ nhàng ở ngực áo và tay áo. Logo này thay đổi nhẹ, shop xin giao hình ngẫu nhiên nhé.<br />

                        Bảng size tham khảo: Hãy nhấn vào "Bảng quy đổi kích cở" ngay gần nút mua hàng nhé.

                        Bảng size này được Shop lập tham khảo, mà hầu hết khách hàng mua tại shop đều mặc vừa. Nếu mình có bụng hay đùi to thì tăng 1 size cho thoài mái nhé.
                        <br />
                        Lưu ý: Tùy vào chất lượng độ phân giải của màn hình PC hay màn hình điện thoại bạn đang sử dụng mà màu sắc hình ảnh sẽ không được trung thực 100%. Mong quý khách thông cảm.
                    </p>
                </div>
            </div>
            <h5 className='my-4'>Thống kê</h5>
            <div className='row align-items-center g-3'>
                <div className='col'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5 className='card-title'>Đỏ</h5>
                        </div>
                        <div className='card-body'>
                            <TableCustom headers={["#", "Kích cỡ", "Số lượng"]}>
                                <tr>
                                    <td>1</td>
                                    <td>SM</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>XL</td>
                                    <td>100</td>
                                </tr>
                            </TableCustom>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5 className='card-title'>Vàng</h5>
                        </div>
                        <div className='card-body'>
                            <TableCustom headers={["#", "Kích cỡ", "Số lượng"]}>
                                <tr>
                                    <td>1</td>
                                    <td>SM</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>XL</td>
                                    <td>10</td>
                                </tr>
                            </TableCustom>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5 className='card-title'>Xanh</h5>
                        </div>
                        <div className='card-body'>
                            <TableCustom headers={["#", "Kích cỡ", "Số lượng"]}>
                                <tr>
                                    <td>1</td>
                                    <td>SM</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>L</td>
                                    <td>22</td>
                                </tr>
                            </TableCustom>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default ProductAdDetail;