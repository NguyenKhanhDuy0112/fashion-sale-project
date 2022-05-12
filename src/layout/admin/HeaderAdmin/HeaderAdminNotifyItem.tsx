interface NotifyItem{
    image: string,
    title: string,
    date: string,
    last?: boolean
}

function HeaderAdminNotifyItem(props: NotifyItem) {
    const { image, title, date } = props
    return (
        <div className={`headerAdmin__notify-item d-flex align-items-center py-3 ${props?.last ? '' :'border-ad-b'}`}>
            <img className = "headerAdmin__notify-item-img" src={image} alt="" />
            <div className="headerAdmin__notify-item-content ms-2">
                <span className = "headerAdmin__notify-item-content-text">{title}</span>
                <span className = "headerAdmin__notify-item-content-date">{date}</span>
            </div>
        </div>
    );
}

export default HeaderAdminNotifyItem;