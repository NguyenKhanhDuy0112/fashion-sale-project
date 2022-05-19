
import ShopAddress from "./ShopAddress";
import ShopBrand from "./ShopBrand";
import ShopMaterial from "./ShopMaterial";
import ShopPrice from "./ShopPrice";
import ShopRating from "./ShopRating";


function ShopSidebar() {

    return ( 
        <article className="shop__sidebar d-xl-block d-none">
            <ShopAddress />
            <ShopRating />
            <ShopPrice />
            <ShopBrand />
            <ShopMaterial />
        </article>
     );
}

export default ShopSidebar;