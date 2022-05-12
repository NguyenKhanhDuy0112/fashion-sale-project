import { ReactComponentElement, SyntheticEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { createNewOrder, deleteOrder } from "../../../modules/orderAd/orderAdSlice";

interface Tab {
    children: any
}

function TabCustom(props: Tab) {
    const [selected, setSelected] = useState(0)
    const dispatch = useDispatch()
    const { children } = props

    const handleChangeSelected = (index: number) => {
        setSelected(index)
    }

    const handleCreateTab = (index: number) => {
        dispatch(createNewOrder())
        setSelected(index)
    }

    const handleDeleteTab = (e: SyntheticEvent,index: number) => {
        e.stopPropagation()
        if(index === children.length - 1){
            const number = index - 1;
            setSelected(number)
        }
        dispatch(deleteOrder(index))
    }
    
    return (
        <>
            <ul className="m-0 p-0 d-flex align-items-center bg-white">
                {children.map((element: ReactComponentElement<any>, index: number) => {
                    let style = index === selected ? 'active' : ''
                    return (

                        <li
                            key={index}
                            className={`sellAdmin__header-list-item ${style}`}
                            onClick={() => handleChangeSelected(index)}
                        >

                            {element.props.title}
                            <span
                                onClick={(e: SyntheticEvent) => handleDeleteTab(e, index)}
                                className="sellAdmin__header-list-item-icon ms-2"
                            >
                                <IoClose />
                            </span>
                        </li>
                    )
                })}
                <li>
                    <button
                        onClick={() => handleCreateTab(children.length)}
                        className="imageUploading__add ms-2"
                    >
                        <AiOutlinePlus />
                    </button>
                </li>
            </ul>
            <div>{children[selected]}</div>
        </>
    );
}

export default TabCustom;