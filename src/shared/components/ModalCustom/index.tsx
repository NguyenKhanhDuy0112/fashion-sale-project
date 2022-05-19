import { ReactChild, ReactComponentElement, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface Modal{
    show: boolean,
    onHandleShow: (value: boolean) => void
    position: 'center' | 'left' | 'right' | 'bottom' | 'full',
    children: ReactNode | ReactChild | ReactComponentElement<any>,
    close?:boolean,
    className?: string,
    zIndexOverlay? : number,
}

function ModalCustom(props: Modal) {
    const { position, show, onHandleShow, children, close, className, zIndexOverlay } = props

    return (
        <>
            <div style={{zIndex: zIndexOverlay ? zIndexOverlay: '15'}} onClick={() => onHandleShow(false)} className={`overlay-client ${show && position !== "full" ? 'active' : ''}`}></div>
            <div className={`modalCustom__${position} ${show ? 'active' : ''} ${className}`}>
                {children}

                {close && <span onClick={() => onHandleShow(false)} className="modalCustom__close cursor-pointer">
                    <IoMdClose size={25}/>
                </span>}

                {/* <div className="modalCustom">
                    <div className="modalCustom__content">
                        <div className="modalCustom__header py-2 px-2">
                            hello
                        </div>
                        <div className="modalCustom__body">
                           
                        </div>
                    </div>
                    <div className="modalCustom__footer py-2 px-2">
                        <button className="">Hello</button>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default ModalCustom;