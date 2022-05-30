import { useState } from "react";

interface Props {
    max?: number,
    value?: number,
    onQuantity: (quantity: any) => void
}

function InputQuantity(props: Props) {
    const { max, value, onQuantity } = props

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value

        if(value === ""){
            onQuantity(value)
        }
        else{
            onQuantity(+value)
        }


    }

    const handlePlusQuantity = () => {
        if(value){
            if(max && value + 1 > max){
                onQuantity(value)
            }else{
                onQuantity(value + 1)
            }
           
        }
    }

    const handleMinusQuantity = () => {
        if(value && value - 1 > 0){
            onQuantity(value - 1)
        }
    }

    return (
        <div className="inputQuantity">
            <button onClick={handleMinusQuantity} className="inputQuantity-btn inputQuantity-btn-minus">-</button>
            <input value={value} onChange={handleChangeQuantity} className="inputQuantity__input" />
            <button onClick={handlePlusQuantity} className="inputQuantity-btn inputQuantity-btn-plus">+</button>
        </div>
    );
}

export default InputQuantity;