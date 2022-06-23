import { useMemo, useState } from "react";
import { formatCashVND } from "../../../../shared/helpers";
import useCart from "../../../../shared/hooks/useCart";
import { ProductCart } from "../../../../shared/interfaces";

interface PaymentProductProps{
    product: ProductCart
}

function PaymentProduct(props: PaymentProductProps) {
    const { product } = props

    const handleCalcSubtotal = useMemo(() => {
        let total = 0;
        if(product.product && product.product.price){
            total = product.quantity * (product.product.price - (product.product.price * (product.product.discount ? product.product.discount/100 : 0)))
        }
        return total
        
    },[product])

    return (
        <div className="payment__product d-flex mb-4">
            <div className="payment__product-background">
                <div className="payment__product-img" style={{ backgroundImage: `url(${product.images[0]})` }}></div>
            </div>
            <div className="payment__product-info ms-2">
                <h5 className="payment__product-info-name">
                    {product.product?.name} - <span className="text-uppercase">{product.color}</span> - <span className="text-uppercase">{product.size}</span>
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="payment__product-info-quantity">SL: x{product.quantity}</span>
                    <span className="payment__product-info-price">{formatCashVND(handleCalcSubtotal+"", ".")} ₫</span>
                </div>
            </div>
        </div>
    );
}

export default PaymentProduct;