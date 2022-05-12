import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { IoCloseOutline } from "react-icons/io5"

interface Image{
    imageData: any[],
    max: number,
    onChangeImage: (value: any) => void
}

function ImageUploading(props: Image) {
    const {imageData, max, onChangeImage} = props
    const [images, setImages] = useState(imageData);

    useEffect(() => {
        setImages(imageData)
    },[imageData])
    
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        console.log(imageList)
        onChangeImage(imageList)
        setImages(imageList as never[]);
    };


    return (
        <ReactImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={max}
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
                <div className="imageUploading d-flex align-items-center">
                    <div className="d-flex flex-wrap">
                        {imageList.map((image, index) => (
                            <div key={index} className="me-3 my-2">
                                <div className="position-relative">
                                    <img className="imageUploading__image" onClick={() => onImageUpdate(index)} src={image.dataURL} alt="" width="100" />
                                    <button className = "imageUploading__delete" onClick={() => onImageRemove(index)}>
                                        <IoCloseOutline size={18}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        className="imageUploading__add ms-2"
                        {...dragProps}
                    >
                        <AiOutlinePlus />
                    </button>
                </div>
            )}
        </ReactImageUploading>
    );
}

export default ImageUploading;