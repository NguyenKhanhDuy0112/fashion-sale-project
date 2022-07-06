import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiPhone } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePlace } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { showToast } from "../../../../modules/toast/toastSlice";
import billsService from "../../../../services/billsService";
import usersService from "../../../../services/usersService";
import TableCustom from "../../../../shared/components/TableCustom";
import { formatCashVND, formatDate } from "../../../../shared/helpers";
import { Bill, User } from "../../../../shared/interfaces";

function ProfileAdmin() {
    const { id } = useParams()
    const [loadingProfile, setLoadingProfile] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)
    const [bills, setBills] = useState<Bill[]>()
    const [user, setUser] = useState<User>()
    const dispatch = useDispatch()

    useEffect(() => {
        handleLoadUser()
    }, [])

    useEffect(() => {
        handleLoadBill()
    },[user])

    const handleLoadUser = async () => {
        if (id) {
            const user = await usersService.findById(id)
            setUser(user)
            setLoadingProfile(false)
        }
    }

    const handleLoadBill = async () => {
        if(id){
            const bills = await billsService.findAllByUser(id)
            setBills(bills.data)
            setLoading(false)
        }
    }

    const handleChangeStatus = async (bill: Bill, value: string) => {
        await billsService.update(bill._id ? bill._id : '', { ...bill, status: +value })
        await dispatch(showToast({ show: true, text: "Cập nhật trạng thái thành công", type: "success", delay: 1500 }))
        await handleLoadBill()
    }

    return (
        <>
            <h5 className="title-admin mb-0">
                Thông tin chi tiết
            </h5>
            <div className="profileAdmin">
                <div className="profileAdmin__header p-3">
                    <div
                        style={{ backgroundImage: `url(https://lezato.dexignzone.com/xhtml/images/profile/cover.jpg)` }}
                        className="profileAdmin__header-banner">
                    </div>
                    <div className="profileAdmin__header-content">
                        <div className="profileAdmin__header-content-avatar">
                            {loadingProfile ?
                                <Skeleton width={100} height={100} borderRadius={50} />
                                :
                                <div style={{ backgroundImage: `url(${user?.avatar})` }}></div>
                            }

                        </div>
                        <div className="profileAdmin__header-content-user">
                            {
                                loadingProfile
                                    ?
                                    <Skeleton width={400} height={60} />
                                    :
                                    <div className="profileAdmin__header-content-user-first">
                                        <h5 className="profileAdmin__header-content-user-name mb-1">
                                            {user?.name}
                                        </h5>
                                        <p className="profileAdmin__header-content-user-phone">
                                            <BiPhone/> {user?.phone}
                                        </p>
                                    </div>
                            }
                            {
                                !loadingProfile
                                &&
                                <div className="profileAdmin__header-content-user-second">
                                    <h5 className="profileAdmin__header-content-user-email mb-1">
                                        <HiOutlineMail/> {user?.email}
                                    </h5>
                                    <p className="profileAdmin__header-content-user-phone">
                                        <MdOutlinePlace/>
                                        {
                                            (user && user.address && user.address.startsWith('{"p'))
                                                ?
                                                `${JSON.parse(user.address).detail}, ${JSON.parse(user.address).village.full_name}`
                                                :
                                                user?.address
                                        }
                                    </p>
                                </div>

                            }

                        </div>
                    </div>
                </div>
                <div className="profileAdmin__list p-3 my-3">
                    <h5 className="profileAdmin__list-title mb-3">
                        Danh sách hóa đơn
                    </h5>
                    <TableCustom headers={["#", "Ngày tạo", "HTTT", "Tổng tiền", "Trạng thái", "Xem chi tiết"]}>
                        {loading
                            ?
                            Array.from({ length: 8 }).map((ite: any, index: number) => (
                                <tr key={index}>
                                    {Array.from({ length: 6 }).map((ite: any, index: number) => (
                                        <td key={index}><Skeleton /></td>
                                    ))}
                                </tr>
                            ))
                            :
                            (bills && bills.length > 0) ?
                                bills.map((bill, index) => {
                                    return (
                                        <tr key={bill._id}>
                                            <td>{index + 1}</td>
                                            <td>{formatDate(bill.createdAt ? new Date(bill.createdAt) : new Date(), "dd/MM/yyyy")}</td>

                                            <td>COD</td>
                                            <td className="text-end">{formatCashVND(bill.totalPrice + "", ",")}</td>
                                            <td>
                                                <select
                                                    className="tableCustom__select"
                                                    onChange={(e) => handleChangeStatus(bill, e.target.value)}
                                                    value={bill.status}
                                                >
                                                    <option hidden>Status</option>
                                                    <option value="3">Đã giao</option>
                                                    <option value="2">Đang giao</option>
                                                    <option value="0">Hủy</option>
                                                    <option value="1">Chờ xử lý</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <Link to={`/admin/orders/${bill._id}`} className="cursor-pointer btn-edit">
                                                        <AiOutlineEye size={20} />
                                                    </Link>
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
                </div>
            </div>
        </>
    );
}

export default ProfileAdmin;