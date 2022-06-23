import Skeleton from "react-loading-skeleton";
import { Product } from "../../../../shared/interfaces";

interface CommentSelledItemProps {
    product: Product,
    loading: boolean
}

function CommentSelledItem() {
    return (
        <div className="commentSelled__item">
            <div className="commentSelled__item-img" style={{ backgroundImage: `url(https://salt.tikicdn.com/cache/400x400/ts/product/73/81/9b/20898dc3e2a24de641ff799a88d2b2e8.jpg.webp)` }}></div>
            <h5 className="commentSelled__item-title my-2">DREAMS, mã G38. Áo thun nữ siêu đẹp. Áo phông nữ thoát nhiệt Goking hàng hiệu</h5>
            <div>
                <button className="commentSelled__item-btn">Viết nhận xét</button>
            </div>
        </div>
    );
}

export default CommentSelledItem;