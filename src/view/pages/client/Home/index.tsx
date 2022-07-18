import { current } from '@reduxjs/toolkit';
import { FaRegComment } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import FooterClient from '../../../../layout/client/FooterClient';
import HeaderClient from '../../../../layout/client/HeaderClient';
import NavClient from '../../../../layout/client/NavClient';
import { showChat } from '../../../../modules/chat/chatSlice';
import useCurrentUser from '../../../../shared/hooks/useCurrentUser';
import HomeBanner from './HomeBanner';
import HomeBannerSub from './HomeBannerSub';
import HomeCategory from './HomeCategory';
import HomeDealHot from './HomeDealHot';
import HomeProduct from './HomeProduct';
import HomeService from './HomeService';
import HomeSuggest from './HomeSuggest';

function Home() {
    const dispatch = useDispatch()
    const currentUser = useCurrentUser()

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
            <NavClient />
            <div className='d-xl-block d-none'>
                <FooterClient />
            </div>
            {currentUser._id !== "" &&
                <button onClick={() => dispatch(showChat())} className="chat__btn d-xl-block d-none">
                    <span className="chat__btn-icon me-1">
                        <FaRegComment />
                    </span>
                    Chat
                </button>
            }
        </>
    );
}

export default Home;