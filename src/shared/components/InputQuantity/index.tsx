import { useState } from "react";

interface Props {
    max: number,
    value?: number,
    onQuantity: (quantity: number) => void
}

function InputQuantity(props: Props) {
    const { max, value, onQuantity } = props
    const [quantity, setQuantity] = useState<number>(value ? value : 1)

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value

        if (Number.isInteger(value) && parseInt(value) > 0) {
            if (max) {
                if (parseInt(value) <= max) {
                    setQuantity(parseInt(value))
                    onQuantity(parseInt(value))
                    
                }
            } else {
                setQuantity(parseInt(value))
                onQuantity(parseInt(value))
               
            }

        } else {
            onQuantity(1)
            setQuantity(1)
        }
    }

    const handlePlusQuantity = () => {
        if(quantity + 1 <= max){
            setQuantity(quantity + 1)
        }
    }

    const handleMinusQuantity = () => {
        if(quantity - 1 > 0){
            setQuantity(quantity - 1)
        }
    }

    return (
        <div className="inputQuantity">
            <button onClick={handleMinusQuantity} className="inputQuantity-btn inputQuantity-btn-minus">-</button>
            <input value={quantity} onChange={handleChangeQuantity} className="inputQuantity__input" />
            <button onClick={handlePlusQuantity} className="inputQuantity-btn inputQuantity-btn-plus">+</button>
        </div>
    );
}

export default InputQuantity;