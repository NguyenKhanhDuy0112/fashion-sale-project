import { Link, useSearchParams } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { formatCashVND } from "../../../../shared/helpers";
import { useLocation } from "react-router";
import ShopSidebarModal from "./ShopSidebar/ShopSidebarModal";
import { BiFilterAlt } from "react-icons/bi";

function ShopTagFilter() {
    const [queries, setQueries] = useState<any>([])
    const [searchParams, setSearchParams] = useSearchParams()
    const { search } = useLocation()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const queryData: { key: string, value: any }[] = []
        searchParams.forEach((value: string, key: string) => {
            if (value.includes(",")) {
                const values = value.split(",")
                queryData.push({ key: key, value: values })
            }
            else {
                if(key !== 'sort'){
                    queryData.push({ key: key, value: value })
                }
            }
            
        })
        setQueries(queryData)
    }, [search])

    const handleDeleteQuery = (key: string, value: string, active?: string) => {
        if (active) {
            const values = value.split(",")
            values.filter(item => item.toLowerCase() !== active.toLowerCase())
            searchParams.set(key, values.join(','))
        }
        else {
            searchParams.delete(key)
        }
        setSearchParams(searchParams)
    }

    return (
        <>
            <div className="d-flex align-items-center px-3 shop__tag-container border-b-f7 py-xl-0 py-2">
                <div onClick={() => setShowModal(!showModal)} className="shop__tag-filter border-r-f7 pe-2 d-xl-none d-block">
                    <BiFilterAlt size={19} color = "#808089"/> Lọc
                </div>
                <ul className="shop__tag pt-xl-3 pt-0 pb-xl-1 pb-0">

                    {queries.map((query: { key: string, value: any }) => {
                        return typeof query.value === 'object' && query.key !== 'price' ? (
                            query.value.map((va: any, idx: number) => (
                                <li key={idx} className="shop__tag-item mx-1">
                                    {va} <span onClick={() => handleDeleteQuery(query.key, query.value, va)} className="shop__tag-item-link ms-2 cursor-pointer" ><IoCloseOutline /></span>
                                </li>
                            ))
                        ) :
                            (
                                <li key={query.key} className="shop__tag-item mx-1">
                                    {query.key === 'rating' &&
                                        <p className="mb-0 d-flex align-items-center">
                                            Từ {query.value} sao
                                            <span onClick={() => handleDeleteQuery(query.key, query.value)} className="shop__tag-item-link ms-2 cursor-pointer" >
                                                <IoCloseOutline />
                                            </span>
                                        </p>
                                    }
                                    {query.key === 'price'
                                        &&
                                        <p className="mb-0 d-flex align-items-center">
                                            Từ {formatCashVND(String(query.value[0]), ".")}₫ đến {formatCashVND(String(query.value[1]), ".")}₫
                                            <span onClick={() => handleDeleteQuery(query.key, query.value)} className="shop__tag-item-link ms-2 cursor-pointer" >
                                                <IoCloseOutline />
                                            </span>
                                        </p>
                                    }
                                    {query.key !== 'price'
                                        &&
                                        query.key !== 'rating'
                                        &&
                                        query.key !== 'sort'
                                        &&
                                        <p className="mb-0 d-flex align-items-center">
                                            {query.value}
                                            <span onClick={() => handleDeleteQuery(query.key, query.value)} className="shop__tag-item-link ms-2 cursor-pointer" >
                                                <IoCloseOutline />
                                            </span>
                                        </p>
                                    }
                                </li>
                            )
                    })}

                </ul>
            </div>
            <ShopSidebarModal onShow={() => setShowModal(!showModal)} show={showModal}/>
        </>
    );
}

export default ShopTagFilter;