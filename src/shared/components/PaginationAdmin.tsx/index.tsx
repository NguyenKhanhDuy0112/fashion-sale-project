import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

interface Pagination {
    pageCount: number,
    canPreviousPage: boolean,
    canNextPage: boolean,
    previousPage: () => void,
    nextPage: () => void,
    gotoPage: (value: number) =>  void,
    pageIndex: number
}

function PagninationAdmin(props : Pagination) {

    const {pageCount, canPreviousPage, canNextPage, previousPage, nextPage, gotoPage, pageIndex} = props

    return ( 
        <>
            <div className="paginationAdmin px-3 py-3 mb-4">
                <div className="row align-items-center">
                    <div className="col">
                        <p className="mb-lg-0 mb-2 text-uppercase paginationAdmin__text">Showing page {pageIndex + 1} of {pageCount}</p>
                    </div>
                    <div className="col-auto">
                        <ul className="paginationAdmin__list list-unstyled d-flex align-items-center m-0">
                            <li className="paginationAdmin__list-item">
                                <button 
                                    disabled = {!canPreviousPage}
                                    className="paginationAdmin__list-item-btn" 
                                    onClick={() => previousPage()}
                                >
                                    <IoIosArrowBack />
                                </button>
                            </li>
                            {Array.from({ length: pageCount }).map((item, index) => {
                                return (
                                    <li key={index} className="paginationAdmin__list-item">
                                        <button
                                            onClick={() => gotoPage(index)}
                                            className={`paginationAdmin__list-item-btn ${index === pageIndex ? "active" : ""}`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                )
                            })}
                            <li className="paginationAdmin__list-item">
                                <button 
                                    disabled= {!canNextPage}
                                    onClick={() => nextPage()} 
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