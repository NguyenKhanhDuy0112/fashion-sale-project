import Comment from "../../../../../shared/components/Comment";
import { Comment as CommentI } from "../../../../../shared/interfaces";

interface ProductDetailCommentDeskProps{
    comments?: CommentI[],
    loading: boolean,
    onLoadComment: () => void
}

function ProductDetailCommentDesk(props: ProductDetailCommentDeskProps) {
    const { comments, loading, onLoadComment } = props
    console.log("Comments: ", comments)
    return (
        <article className="">
            
            {comments?.map(comment => (
                <Comment key={comment._id} onLoadComment={onLoadComment} loading = {false} comment={comment}/>
            ))}

        </article>
    );
}

export default ProductDetailCommentDesk;