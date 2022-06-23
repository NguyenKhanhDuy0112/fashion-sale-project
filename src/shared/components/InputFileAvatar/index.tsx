import { MdModeEditOutline } from "react-icons/md";

interface InputFileAvatarProps{
    avatar: any,
    onChangeFile: (file:any) => void
}

function InputFileAvatar(props: InputFileAvatarProps) {
    const { avatar, onChangeFile } = props    

    return ( 
        <label 
            htmlFor="file-avatar" 
            className="inputFile__avatar"
        >
            <input 
                type = "file" 
                onChange={(e) => onChangeFile(e.target.files ? e.target.files[0] : '')}
                className="inputFile__input" 
                id = "file-avatar"
            />
            <img 
                className="inputFile__img" 
                src = {!avatar ? 'https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png' : avatar} 
                alt = ""
            />
            <span className="inputFile__icon">
                <MdModeEditOutline/>
            </span>
        </label>
     );
}

export default InputFileAvatar;