import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import TableCustom from "../../../../shared/components/TableCustom";
import { User } from "../../../../shared/interfaces";

interface Props {
    data: User[],
    onEditUser: (slug: string) => void,
    onDeleteUser: (id: string) => void,
}

function CustomerAdTable(props: Props) {
    const { data, onEditUser, onDeleteUser } = props
    const [users, setUsers] = useState<User[]>()

    useEffect(() => {
        setUsers(data)
    }, [data])

    return (
        <TableCustom headers={["#", "Hình", "Tên", "Số điện thoại", "Ngày tham gia", "email", "Hành động"]}>
            {users && users.map((user, index) => {
                const dateJoin = user?.createdAt ?  new Date(user?.createdAt) : new Date()

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
            })}
        </TableCustom>
    );
}

export default CustomerAdTable;