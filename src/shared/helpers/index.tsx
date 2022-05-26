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

//format date dd/MM/yyyy
export const formatDate = (date: Date, format: "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy/MM/dd") => {
    const sliceStr = format.split("/")
    let dateFormat:string = ""
    sliceStr.forEach((item: string, index: number) =>{
        if(item.toLowerCase() === "dd"){
            dateFormat += `${date.getDate()}${index === sliceStr.length - 1 ? '': '/'}`
        }
        else if(item.toLowerCase() === 'mm'){
            dateFormat += `${date.getMonth() + 1}${index === sliceStr.length - 1 ? '': '/'}`
        }
        else{
            dateFormat += `${date.getFullYear()}${index === sliceStr.length - 1 ? '': '/'}`
        }
    })
    return dateFormat;
}