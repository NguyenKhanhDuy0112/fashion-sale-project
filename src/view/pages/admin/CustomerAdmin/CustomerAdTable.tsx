import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import TableCustom from "../../../../shared/components/TableCustom";
import { User } from "../../../../shared/interfaces";

interface Props {
    data: User[],
    isLoading: boolean,
    onEditUser: (slug: string) => void,
    onDeleteUser: (id: string) => void,
}

function CustomerAdTable(props: Props) {
    const { data, onEditUser, onDeleteUser, isLoading } = props
    const [users, setUsers] = useState<User[]>()

    useEffect(() => {
        setUsers(data)
    }, [data])

    return (
        <TableCustom headers={["#", "Hình", "Tên", "Số điện thoại", "Ngày tham gia", "email", "Hành động"]}>
            {isLoading
                ?
                Array.from({ length: 8 }).map((tr, index) => (
                    <tr key={index}>
                        {Array.from({ length: 7 }).map((td, idx) => (
                            <td key={idx}><Skeleton /></td>
                        ))}
                    </tr>
                ))
                :
                (users && users.length > 0) ?
                    users && users.length > 0 && users.map((user, index) => {
                        const dateJoin = user?.createdAt ? new Date(user?.createdAt) : new Date()

                        return (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={user.avatar} alt="" style={{ width: "30px", height: "30px", objectFit: "cover" }} />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.createdAt ? `${dateJoin.getDate()}/${dateJoin.getMonth() + 1}/${dateJoin.getFullYear()}` : ''}</td>
                                <td>{user.email}</td>
                                <td >
                                    <div className="d-flex justify-content-center">
                                        <span onClick={() => onEditUser(user._id ? user._id : '')} className="btn-edit cursor-pointer me-1">
                                            <BiEdit size={20} />
                                        </span>
                                        <span onClick={() => onDeleteUser(user?._id ? user._id : '')} className="btn-delete cursor-pointer ms-1">
                                            <FiTrash2 size={20} />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        )
                    }) :
                    <tr>
                        <td className="text-center" colSpan={7}>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <img style={{ width: "200px", height: "200px" }} src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png" alt="" />
                                <p className="mt-2 mb-0">Không có dữ liệu.</p>
                            </div>
                        </td>
                    </tr>
            }
        </TableCustom>
    );
}

export default CustomerAdTable;