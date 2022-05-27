import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

interface Props{
    valueInput: string,
    onChangeValue: (value: string) => void 
}

function InputSearch(props: Props) {
    const { valueInput, onChangeValue } = props
    const [value, setValue] = useState<string>(valueInput)
    const debounce = useDebounce<string>(value, 700)

    useEffect(() => {
        onChangeValue(debounce ? debounce : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[debounce])


    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return ( 
        <>
            <input value = {value} onChange= {handleFilter} className="inputSearch" placeholder="Tìm kiếm tại đây..."/>
        </>
     );
}

export default InputSearch;