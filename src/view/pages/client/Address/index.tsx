import FooterClient from "../../../../layout/client/FooterClient";
import HeaderAddress from "../../../../layout/client/HeaderAddress";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import AddressDesk from "./AddressDesk";
import AddressMobile from "./AddressMobile";

function Address() {
    return (
        <>
            <div className="d-xl-block d-none">
                <HeaderAddress />
            </div>
            <div className="d-xl-none d-block">
                <HeaderMobileTitle title="Sửa Địa Chỉ" />
            </div>
            <section className="addressPage bg-outside-client pt-xl-3 pt-0 pb-3">
                <div className="container-client">
                    <div className="d-xl-block d-none">
                        <AddressDesk />
                    </div>
                    <div className="d-xl-none d-block">
                        <AddressMobile/>
                    </div>
                </div>
            </section>
            <div className="d-xl-block d-none">
                <FooterClient />
            </div>
        </>
    );
}

export default Address;