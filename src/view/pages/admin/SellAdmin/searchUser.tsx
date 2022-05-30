import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import usersService from "../../../../services/usersService";
import ProductItemAdSearch from "../../../../shared/components/ProductItemAdSearch";
import useDebounce from "../../../../shared/hooks/useDebounce";
import { User } from "../../../../shared/interfaces";
import { FaUserAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";


interface Props{
    onUser: (userData: User) => void
}

function SearchUser(props: Props) {

    const { onUser } = props

    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [valueInputSearch, setValueInputSearch] = useState<string>('')
    const [user, setUser] = useState<User>()
    const [searchResults, setSearchResults] = useState<User[]>([])
    const debounceValue = useDebounce<string>(valueInputSearch, 700)

    useEffect(() => {
        onUser(user ? user : {_id: '', address: '', avatar: '', email: '', name: '', password: '', phone: ''})
    },[user])

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
            else {
                usersService.searchCustomers(debounceValue ? debounceValue : '', 1, 10)
                    .then(res => {
                        const { data, ...others } = res
                        setIsLoading(false)
                        setSearchResults(data)
                    })
            }
        }
    }, [debounceValue])

    return (
        <div className="position-relative w-100">

            {!user &&
                <input
                    placeholder={`Tìm kiếm ${searchParams.get('type') === 'import' ? 'nhà cung cấp' : 'khách hàng'}...`}
                    className="form-control sellAdmin__header-search sellAdmin__content-calc-customer-search"
                    type="search"
                    onChange={(e) => setValueInputSearch(e.target.value)}
                />
            }

            {user &&
                <div className="d-flex form-control addOrder__header-search addOrder__content-calc-customer-search justify-content-around align-items-center w-100 cursor-pointer">
                    <small><FaUserAlt /></small>
                    <small>{user.name}</small>
                    <small
                        onClick={() => setUser(undefined)}
                    >
                        <IoCloseSharp />
                    </small>
                </div>
            }

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
                                onClick={() => setUser(user)}
                                className="sellAdmin__header-list-search-item"
                            >
                                <div className="sellAdmin__header-list-search-item-customer p-2">
                                    <img
                                        src={user.avatar}
                                        alt=""
                                        className="sellAdmin__header-list-search-item-customer-img"
                                    />
                                    <div className="ms-2">
                                        <h6 className="sellAdmin__header-list-search-item-customer-name">{user.name}</h6>
                                    </div>
                                </div>
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