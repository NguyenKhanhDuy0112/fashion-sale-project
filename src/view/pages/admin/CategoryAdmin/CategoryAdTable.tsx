import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import TableCustom from "../../../../shared/components/TableCustom";
import { Category } from "../../../../shared/interfaces";

interface Props {
    data: Category[],
    loading: boolean,
    onEditCategory: (slug: string) => void,
    onDeleteCategory: (id: string) => void,
}

function CategoryAdTable(props: Props) {
    const { data, onEditCategory, onDeleteCategory, loading } = props
    const [categories, setCategories] = useState<Category[]>()

    useEffect(() => {
        setCategories(data)
    }, [data])

    return (
        <>
            <TableCustom headers={["#", "Hình", "Tên", "Hành Động"]}>
                {
                    loading ?
                        Array.from({length : 8}).map((ite, index:number) => (
                            <tr key = {index}>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                            </tr>
                        ))
                        :
                        categories?.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>
                                    {<img
                                        src={category.image} alt=""
                                        style={{
                                            width: "30px", height: "30px",
                                            objectFit: "cover"
                                        }}
                                    />
                                    }
                                </td>
                                <td>{category.name}</td>
                                <td >
                                    {<div className="d-flex justify-content-center">
                                        <span onClick={() => onEditCategory(category._id)} className="btn-edit cursor-pointer me-1">
                                            <BiEdit size={20} />
                                        </span>
                                        <span onClick={() => onDeleteCategory(category._id)} className="btn-delete cursor-pointer ms-1">
                                            <FiTrash2 size={20} />
                                        </span>
                                    </div>
                                    }
                                </td>
                            </tr>
                        ))

                }

            </TableCustom>
        </>
    );
}

export default CategoryAdTable;