import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import commentsService from "../../../../services/commentsService";
import productsService from "../../../../services/productService";
import usersService from "../../../../services/usersService";
import useCurrentUser from "../../../../shared/hooks/useCurrentUser";
import { Product, ProductDetail } from "../../../../shared/interfaces";
import Account from "../Account";
import CommentSelledItem from "./CommentSelledItem";

function CommentSelled() {
    const [products, setProducts] = useState<ProductDetail[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const currentUser = useCurrentUser()

    useEffect(() => {
        handleLoadProducts()
    }, [currentUser])

    const handleLoadProducts = async () => {
        setLoading(true)
        try {
            const productDetailsData: ProductDetail[] = []
            const productDetails = await usersService.findNotCommentsByUser(currentUser._id ? currentUser._id : "")
            await productDetails.forEach(async (pro: any, index: number) => {
                const product = await productsService.findById(pro.product)
                await productDetailsData.push({ ...pro, product: product })
                if (index === await productDetails.length - 1) {
                    setProducts(productDetailsData)
                    setLoading(false)
                }
            });

        } catch (err) {
            console.log("Failed load products selled")
            setLoading(false)
        }
    }

    return (
        <>
            <div className="d-xl-block d-none">
                <HeaderClient />
            </div>
            <div className="d-xl-none d-block">
                <HeaderMobileTitle title="Nhận xét sản phẩm đã mua" />
            </div>
            <section className="orderManage bg-outside-client pb-3">
                <div className="container-client none">
                    <article className="breadcrumbCustom py-2 d-xl-block d-none">
                        <ul className="breadcrumbCustom__list align-items-start">
                            <li className="breadcrumbCustom__list-item">
                                <Link to="/" className="breadcrumbCustom__list-item-link">Trang chủ</Link>
                            </li>
                            <li className="breadcrumbCustom__list-item mx-1">
                                <span className="breadcrumbCustom__list-item-link">
                                    <IoIosArrowForward />
                                </span>
                            </li>
                            <li className="breadcrumbCustom__list-item none">
                                <span className="breadcrumbCustom__list-item-link">
                                    Nhận xét sản phẩm đã mua
                                </span>
                            </li>
                        </ul>
                    </article>
                    <div className="row">
                        <div className="col-xl-auto d-xl-block d-none">
                            <Account />
                        </div>
                        <div className="col">
                            <div className="">
                                <h5 className="editAccount__title mb-4">Nhận xét sản phẩm đã mua</h5>
                                <div className="bg-white border-radius-4 p-3">
                                    {loading ?
                                        <div className="row g-5 row-cols-xl-4 row-cols-md-2 row-cols-1">
                                            {
                                                [...Array(4)].map((pro: any, index: number) => (
                                                    <div key={index} className="col">
                                                        <CommentSelledItem
                                                            onLoadProducts={handleLoadProducts}
                                                            loading={loading}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        :
                                        (products && products.length > 0) ?

                                            <div className="row g-5 row-cols-xl-4 row-cols-md-2 row-cols-1">
                                                {products.map(pro => (
                                                    <div key={pro._id} className="col">
                                                        <CommentSelledItem
                                                            onLoadProducts={handleLoadProducts}
                                                            loading={loading}
                                                            productDetail={pro}
                                                        />
                                                    </div>
                                                ))}

                                            </div>
                                            :
                                            <div>
                                                <div className="d-flex justify-content-center ">
                                                    <img src="https://frontend.tikicdn.com/_desktop-next/static/img/mascot_fail.svg" alt="" />
                                                </div>
                                                <div className="d-flex justify-content-center mt-2">
                                                    <button className="shop__address-modal-body-btn py-2 px-4">Tiếp tục mua sắm</button>
                                                </div>
                                            </div>
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="d-xl-block d-none">
                <FooterClient />
            </div>
        </>
    );
}

export default CommentSelled;