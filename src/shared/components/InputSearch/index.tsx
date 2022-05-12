import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";


function InputSearch() {
    const [value, setValue] = useState( '')
    // const debounce = useDebounce<string>(value, 500)

    // useEffect(() => {
    //     setFilter(debounce || '')
    // },[debounce])


    // const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue(e.target.value)
    // }

    return ( 
        <>
            <input className="inputSearch" placeholder="Tìm kiếm tại đây..."/>
        </>
     );
}

export default InputSearch;