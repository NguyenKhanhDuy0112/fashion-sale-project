import { MouseEvent, useEffect, useState } from "react";
import { GiBackwardTime } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

interface History {
    historySearch: string[],
    handleToggle: () => void
}

function HistorySearch(props: History) {
    const { historySearch, handleToggle } = props
    const [histories, setHistories] = useState<string[]>()
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('search')) {
            setHistories(JSON.parse(localStorage.getItem('search') ?? ""))
        }
        else {
            localStorage.setItem('search', JSON.stringify([]))
        }
    }, [])

    const handleDeleteHistory = (e:MouseEvent<HTMLSpanElement, globalThis.MouseEvent>, index: number) => {
        e.stopPropagation()
        if(localStorage.getItem('search')) {
            const histories = JSON.parse(localStorage.getItem('search') ?? "")
            histories.splice(index, 1)
            localStorage.setItem('search', JSON.stringify(histories))
            setHistories(histories)
        }

    }

    return (
        <>
            <ul className="headerClient__search-history-list">
                {
                    histories && histories.map((history, index) => (
                        <li key={index} onClick={handleToggle} className="headerClient__search-history-item">
                            <span onClick = {() => navigate(`/search?q=${history}`)} className="headerClient__search-history-item-link">
                                <div className="d-flex align-items-center">
                                    <span className="headerClient__search-history-item-link-icon me-2">
                                        <GiBackwardTime size={20} />
                                    </span>
                                    <span className="headerClient__search-history-item-link-text">
                                        {history}
                                    </span>
                                </div>
                                <span onClick={(e) => handleDeleteHistory(e,index)} className="cursor-pointer headerClient__search-history-item-link-icon">
                                    <IoCloseOutline size={20} />
                                </span>
                            </span>
                        </li>
                    ))
                }
            </ul>
            <p className="headerClient__search-history-read-more mb-0 cursor-pointer">
                Xem thêm <span className="ms-1"><IoIosArrowDown /></span>
            </p>
        </>
    );
}

export default HistorySearch;