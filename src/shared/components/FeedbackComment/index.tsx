interface Props {
    name?: string,
    avatar?: string,
    content?: string,
}

function FeedbackComment() {
    return (
        <div className="feedbackComment d-flex align-items-start mt-3">
            <div
                className="feedbackComment__img"
                style={{ backgroundImage: `url(https://vcdn.tikicdn.com/ts/seller/9b/e7/45/d185064b8897465d22fb3b613d1464a8.jpg)` }}
            ></div>
            <div className="feedbackComment__content">
                <div className="d-flex align-items-center">
                    <h6 className="feedbackComment__content-name mb-0 me-2">
                        5S Fashion
                    </h6>
                    <small className="feedbackComment__content-date">9 tháng trước</small>
                </div>
                <p className="feedbackComment__content-text mb-0">Chào bạn! Rất tiếc sản phẩm bên shop chưa làm bạn hài lòng tuyệt đối. Sản phẩm bên shop được sản xuất với chất liệu coolmax, cấu trúc sợi coolmax rất đặc biệt cho phép vải coolmax có tốc độ khô nhanh hơn cotton ít nhất là 2 lần, nên làm cho người dùng cảm thấy thoáng mát, dễ chịu đó ạ. Mong bạn trải nghiệm sản phẩm thêm rồi cho shop xin lại phản hồi nhé ạ. Shop luôn sẵn sàng lắng nghe mọi ý kiến đóng góp để xây dựng bộ sản phẩm phù hợp nhất tới khách hàng ạ. Cảm ơn bạn!</p>
            </div>
        </div>
    );
}

export default FeedbackComment;