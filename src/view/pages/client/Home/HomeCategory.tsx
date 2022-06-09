import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from "swiper";

import "swiper/less/grid";
import "swiper/css/grid";
import { useEffect, useState } from 'react';
import { Category } from '../../../../shared/interfaces';
import categoriesService from '../../../../services/categoriesService';
import Skeleton from 'react-loading-skeleton';

function HomeCategory() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        handleLoadCategories()
    }, [])

    const handleLoadCategories = async () => {
        const categoriesData = await categoriesService.list()
        setCategories(categoriesData.data)
        setLoading(false)
    }

    return (
        <div className='container-client none'>
            <article className="homeCategory bg-white py-3 ps-xl-3 pe-xl-3 ps-0 pe-0 mt-3 border-radius-4">
                <h6 className='fw-500 homeCategory__title mb-4 ps-xl-0 ps-2'>Danh Mục Nổi Bật</h6>
                <Swiper

                    modules={[Grid]}
                    slidesPerGroup={3}

                    breakpoints={{
                        0: {
                            slidesPerView: 4.56,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 5.56,
                            spaceBetween: 10
                        },
                        1028: {
                            slidesPerView: 10,
                            spaceBetween: 10
                        }

                    }}

                >
                    {loading ?
                        Array.from({ length: 10 }).map((item: any, index: number) => (
                            <SwiperSlide key = {index}>
                                <Link to='' className='homeService__card'>
                                    <Skeleton width={50} height={50} borderRadius="20px" />
                                    <p className='homeService__text mb-0 mt-2 text-center'>
                                        <Skeleton />
                                    </p>
                                </Link>
                            </SwiperSlide>
                        ))
                        :
                        categories.length > 0 && categories.map(cate => (
                            <SwiperSlide key={cate._id}>
                                <Link to={cate.slug ? cate.slug : ''} className='homeService__card'>
                                    <img className='homeService__img homeCategory__img border-radius-20' src={cate.image} alt="" />
                                    <p className='homeService__text mb-0 mt-2 text-center'>
                                        {cate.name}
                                    </p>
                                </Link>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </article>
        </div>
    );
}

export default HomeCategory;