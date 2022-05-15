import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

interface Pagination {
    totalPages: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: number,
    nextPage: number,
    gotoPage: (value: number) =>  void,
    pageIndex: number
}

function PagninationAdmin(props : Pagination) {

    const {totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, gotoPage, pageIndex} = props

    return ( 
        <>
            <div className="paginationAdmin px-3 py-3 mb-4">
                <div className="row align-items-center">
                    <div className="col">
                        <p className="mb-lg-0 mb-2 text-uppercase paginationAdmin__text">Trang {pageIndex} / {totalPages}</p>
                    </div>
                    <div className="col-auto">
                        <ul className="paginationAdmin__list list-unstyled d-flex align-items-center m-0">
                            <li className="paginationAdmin__list-item">
                                <button 
                                    disabled = {!hasPrevPage}
                                    className="paginationAdmin__list-item-btn" 
                                    onClick={() => gotoPage(prevPage)}
                                >
                                    <IoIosArrowBack />
                                </button>
                            </li>
                            {Array.from({ length: totalPages }).map((item, index) => {
                                return (
                                    <li key={index} className="paginationAdmin__list-item">
                                        <button
                                            onClick={() => gotoPage(index + 1)}
                                            className={`paginationAdmin__list-item-btn ${index + 1 === pageIndex ? "active" : ""}`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                )
                            })}
                            <li className="paginationAdmin__list-item">
                                <button 
                                    disabled= {!hasNextPage}
                                    onClick={() => gotoPage(nextPage)} 
                                    className="paginationAdmin__list-item-btn"
                                >
                                    <IoIosArrowForward />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
     );
}

export default PagninationAdmin;