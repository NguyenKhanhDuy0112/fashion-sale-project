import { GiBackwardTime } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

interface History {
    historySearch: string[],
    handleToggle: () => void
}

function HistorySearch(props: History) {

    const { historySearch, handleToggle } = props

    return (
        <>
            <ul className="headerClient__search-history-list">
                {historySearch.map((history,index) => (
                    <li key = {index} onClick={handleToggle} className="headerClient__search-history-item">
                        <Link to="/" className="headerClient__search-history-item-link">
                            <div className="d-flex align-items-center">
                                <span className="headerClient__search-history-item-link-icon me-2">
                                    <GiBackwardTime size={20} />
                                </span>
                                <span className="headerClient__search-history-item-link-text">{history}</span>
                            </div>
                            <span className="headerClient__search-history-item-link-icon">
                                <IoCloseOutline size={20} />
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
            <p className="headerClient__search-history-read-more mb-0 cursor-pointer">Xem thêm <span className="ms-1"><IoIosArrowDown /></span></p>
        </>
    );
}

export default HistorySearch;