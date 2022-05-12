import axios from "axios";

//format money VND
export function formatCashVND(str: string, character:string) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + character)) + prev
    })
}

export const handleCreateImage = async (image: any) => {
    let postImage
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'twbtlhnv');
    postImage = await axios.post('https://api.cloudinary.com/v1_1/cloudprojectbackend/image/upload', formData)
    return postImage;
}