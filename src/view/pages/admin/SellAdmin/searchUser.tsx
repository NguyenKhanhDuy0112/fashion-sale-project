import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import usersService from "../../../../services/usersService";
import ProductItemAdSearch from "../../../../shared/components/ProductItemAdSearch";
import useDebounce from "../../../../shared/hooks/useDebounce";
import { User } from "../../../../shared/interfaces";

function SearchUser() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [valueInputSearch, setValueInputSearch] = useState<string>('')
    const [searchResults, setSearchResults] = useState<User[]>([])
    const debounceValue = useDebounce<string>(valueInputSearch, 700)

    useEffect(() => {
        setIsLoading(true)
        if (!debounceValue || debounceValue === '') {
            setSearchResults([])
            setIsLoading(false)
        }
        else {
            if (searchParams.get('type') === 'import') {
                usersService.searchProviders(debounceValue ? debounceValue : '', 1, 10)
                    .then(res => {
                        const { data, ...others } = res
                        console.log(data)
                        setIsLoading(false)
                        setSearchResults(data)
                    })
            }
            else{
                usersService.searchCustomers(debounceValue ? debounceValue : '', 1, 10)
                .then(res => {
                    const { data, ...others } = res
                    setIsLoading(false)
                    setSearchResults(data)
                })
            }
        }
    }, [debounceValue])

    const handleAddUser = (user: User) => {

    }

    console.log("Search: ", searchResults)

    return (
        <div className="position-relative">
            <input
                placeholder={`Tìm kiếm ${searchParams.get('type') === 'import' ? 'nhà cung cấp' : 'khách hàng'}...`}
                className="form-control sellAdmin__header-search sellAdmin__content-calc-customer-search"
                type="search"
            />

            {isLoading ?
                <ul className="list-unstyled m-0 sellAdmin__header-list-search p-2">
                    {Array.from({ length: 8 }).map((item: any, index: number) => (
                        <li
                            key={index}
                            className="sellAdmin__header-list-search-item"
                        >
                            <ProductItemAdSearch
                                isLoading={true}
                                title={""}
                                price={0}
                                trademark={""}
                                img={""}
                            />
                        </li>
                    ))}
                </ul>
                :
                <ul className="list-unstyled m-0 sellAdmin__header-list-search p-2">
                    {searchResults && searchResults.length > 0 && searchResults.map((user: any, index) => {

                        return (
                            <li
                                key={index}
                                onClick={() => handleAddUser({ ...user })}
                                className="sellAdmin__header-list-search-item"
                            >
                               
                            </li>
                        )
                    })}
                    {searchResults.length === 0 &&
                        <p className="text-center mb-0 p-2 text-secondary">Không tìm thấy kết quả tìm kiếm.</p>
                    }
                </ul>
            }
        </div>
    );
}

export default SearchUser;