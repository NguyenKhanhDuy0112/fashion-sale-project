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
            <div className="">
                <HomeBanner/>
                <HomeDealHot/>
                <HomeBannerSub/>
                <HomeService/>
                <HomeCategory/>
                <HomeSuggest/>
                <HomeProduct/>
            </div>
        </>
    );
}

export default Home;