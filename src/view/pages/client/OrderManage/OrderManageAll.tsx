import { useEffect, useState } from "react";
import billsService from "../../../../services/billsService";
import productDetailsService from "../../../../services/productDetailsService";
import productsService from "../../../../services/productService";
import OrderItem from "../../../../shared/components/OrderItem";
import useCurrentUser from "../../../../shared/hooks/useCurrentUser";
import { Bill } from "../../../../shared/interfaces";

function OrderManageAll() {
    const [bills, setBills] = useState<Bill[]>()
    const [loading, setLoading] = useState(true)
    const currentUser = useCurrentUser()

    useEffect(() => {
        handleLoadAllByUser()
    }, [])

    const handleLoadAllByUser = async () => {
        try {
            let bills = await billsService.findAllByUser(currentUser._id ? currentUser._id : '')
            
            if (bills) {
                bills = await bills.data
            
                const billData: Bill[] = []
                await bills.forEach(async (bill: Bill, index: number) => {
                    const billDetails: any = await []
                    if (bill.billDetails && bill.billDetails.length > 0) {
                        await bill.billDetails.forEach(async (bdt: any, index: number) => {
                            const productDetail = await productDetailsService.findById(bdt.productDetail)
                            const product = await productsService.findById(productDetail.product)
                            productDetail.images = await [productDetail.images[0].image, ...productDetail.images[0].imagesSub]
                            productDetail.color = await productDetail.color.color
                            productDetail.size = await productDetail.size.size
                            productDetail.product = await product

                            await billDetails.push({ ...bdt, productDetail: productDetail })
                        })
                    }

                    await billData.push({ ...bill, billDetails: billDetails })

                    if (index === bills.length - 1) {
                        await setBills(billData)
                        await setLoading(false)
                    }
                })

            }

        } catch (err) {
            setLoading(false)
            console.log("Error")
        }
    }

    console.log(bills)

    return (
        <article>
            {loading ?
                <OrderItem status={0} loading={loading} />
                :
                bills?.map((b, index: number) => (
                    <OrderItem 
                        
                        bill = {b}
                        shipedDate={b.shippedDate}
                        status={b.status} 
                        key={index} 
                        statusDetails = {b.statusDetails}
                        loading={loading} 
                        totalPrice = {b.totalPrice}
                    />
                ))
                
            }

        </article>
    );
}

export default OrderManageAll;