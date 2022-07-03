import { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { IoClose, IoCloseOutline } from "react-icons/io5";
import RatingStar from "../RatingStar";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { Comment, ProductDetail } from "../../interfaces";
import useCurrentUser from "../../hooks/useCurrentUser";
import { handleCreateImage } from "../../helpers";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../modules/loading/loadingSlice";
import commentsService from "../../../services/commentsService";
import { showToast } from "../../../modules/toast/toastSlice";

interface WriteCommentProps {
    productDetail?: ProductDetail,
    onCloseModal: () => void
}

function WriteComment(props: WriteCommentProps) {
    const { productDetail, onCloseModal } = props
    const [starRating, setStarRating] = useState<number>(0)
    const [images, setImages] = useState<any>();
    const [value, setValue] = useState<string>("")
    const currentValue = useCurrentUser()
    const dispatch = useDispatch()

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };

    const handleSubmit = async () => {
        dispatch(showLoading())
        const imagesData: string[] = await []
        try {
            await images.forEach(async (image: any, index: number) => {
                const resImage = await handleCreateImage(image.file)
                await imagesData.push(resImage.data.url)
                if (index === await images.length - 1) {
                    const comment: Comment = await {
                        star: starRating,
                        images: imagesData,
                        children: [],
                        content: value,
                        product: productDetail?._id,
                        user: currentValue._id,
                    }
                    await commentsService.addComment(comment)
                    dispatch(hideLoading())
                    onCloseModal()
                    dispatch(showToast({show: true, text: "Đánh giá thành công", type: "success", delay: 1500}))
                    
                }
            });
        } catch (err) {
            onCloseModal()
            dispatch(hideLoading())
            dispatch(showToast({show: true, text: "Đánh giá thất bại", type: "error", delay: 1500}))
        }

    }

    return (
        <div className="writeComment">
            <div className="writeComment__header d-flex justify-content-between align-items-center mb-2">
                <h5 className="writeComment__header-title">
                    {productDetail?.product?.name}
                </h5>
                <span className="writeComment__header-icon">
                    <IoClose size={20} />
                </span>
            </div>
            <div className="writeComment__rating mb-2">
                <h4 className="writeComment__rating-title text-center">
                    {starRating === 0 && 'Vui lòng đánh giá'}
                    {starRating === 1 && 'Rất không hài lòng'}
                    {starRating === 2 && 'Không hài lòng'}
                    {starRating === 3 && 'Bình thường'}
                    {starRating === 4 && 'Hài lòng'}
                    {starRating === 5 && 'Cực kỳ hài lòng'}
                </h4>
                <div className="d-flex justify-content-center">
                    <RatingStar onChangeRating={(value) => setStarRating(value)} />
                </div>
            </div>
            <textarea value={value} onChange={(e) => setValue(e.target.value)} className="writeComment__input" name="" id="" placeholder="Hãy chia sẽ cảm nhận, đánh giá của bạn về sản phẩm này nhé" rows={10}>

            </textarea>
            <ReactImageUploading
                multiple
                value={images}
                onChange={onChange}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    // write your building UI
                    <div className="imageUploading">
                        <div className="d-flex align-items-center">
                            {imageList.map((image, index) => (
                                <div key={index} className="me-3 my-2">
                                    <div className="position-relative">
                                        <img className="imageUploading__image" onClick={() => onImageUpdate(index)} src={image.dataURL} alt="" width="100" />
                                        <button className="imageUploading__delete" onClick={() => onImageRemove(index)}>
                                            <IoCloseOutline size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex w-100">
                            <button onClick={onImageUpload} className="writeComment__btn writeComment__btn-image me-1">
                                <span className="writeComment__btn-image-icon me-1">
                                    <AiFillCamera />
                                </span>
                                Thêm ảnh
                            </button>
                            <button
                                className="writeComment__btn writeComment__btn-send ms-1"
                                onClick={handleSubmit}
                            >
                                Gửi đánh giá
                            </button>
                        </div>
                    </div>
                )}
            </ReactImageUploading>

        </div>
    );
}

export default WriteComment;