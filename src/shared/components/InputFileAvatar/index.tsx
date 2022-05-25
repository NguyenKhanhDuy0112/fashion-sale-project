import { MdModeEditOutline } from "react-icons/md";

function InputFileAvatar() {
    return ( 
        <label htmlFor="file-avatar" className="inputFile__avatar">
            <input type = "file" accept="/image/*" className="inputFile__input" id = "file-avatar"/>
            <img className="inputFile__img" src = "https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png" alt = ""/>
            <span className="inputFile__icon">
                <MdModeEditOutline/>
            </span>
        </label>
     );
}

export default InputFileAvatar;