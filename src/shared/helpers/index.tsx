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
export const formatDate = (date: Date, format: "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy/MM/dd" | "dd-MM-yyyy" | 'MM-dd-yyyy' | 'yyyy-MM-dd') => {
    let separate = '/'
    let sliceStr = format.split('/')
    if(sliceStr.length < 3){
        sliceStr = format.split('-')
        separate = '-'
    }
    let dateFormat:string = ""
    sliceStr.forEach((item: string, index: number) =>{
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        if(item.toLowerCase() === "dd"){
            dateFormat += `${day < 10 ? `0${day}` : day}${index === sliceStr.length - 1 ? '': separate}`
        }
        else if(item.toLowerCase() === 'mm'){
            dateFormat += `${month < 10 ? `0${month}` : month}${index === sliceStr.length - 1 ? '': separate}`
        }
        else{
            dateFormat += `${year}${index === sliceStr.length - 1 ? '': separate}`
        }
    })
    return dateFormat;
}