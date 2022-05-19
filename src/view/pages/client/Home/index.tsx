import HeaderClient from '../../../../layout/client/HeaderClient';
import HomeBanner from './HomeBanner';
import HomeBannerSub from './HomeBannerSub';
import HomeCategory from './HomeCategory';
import HomeDealHot from './HomeDealHot';
import HomeProduct from './HomeProduct';
import HomeService from './HomeService';
import HomeSuggest from './HomeSuggest';

function Home() {
    return (
        <>
            <HeaderClient />
            <div className="py-3 bg-outside-client">
                <HomeBanner />
                <HomeDealHot />
                <HomeBannerSub />
                <HomeService />
                <HomeCategory />
                <HomeSuggest />
                <HomeProduct />
            </div>
        </>
    );
}

export default Home;