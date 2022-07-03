import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './view/container/admin';
import Client from './view/container/client';
import LoginAdmin from './view/pages/admin/LoginAdmin';
import { authentication } from "./firebase-config"
import Loading from "./shared/components/Loading";
import useLoading from "./shared/hooks/useLoading";
import { useDispatch } from "react-redux";
import { signOut, updateUser } from "./modules/user/useSlice";
import usersService from "./services/usersService";
import { User } from "./shared/interfaces";
import { getProducts, getProductsChecking, resetCart } from "./modules/cart/cartSlice";
import Chat from "./layout/client/Chat";

function App() {
  const loading = useLoading()
  const dispatch = useDispatch()
  

  //handle firebase auth changed
  useEffect(() => {
    // authentication.signOut()
    const unregisterAuthObserver = authentication.onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(resetCart())
        dispatch(signOut())
        // console.log("User id not logged in")
        //user logs out, handle something here
        return;
      }

      try {
        if (user.phoneNumber) {
          const currentUser: User = await usersService.findByPhoneNumber(user.phoneNumber)
          if (currentUser) {
            dispatch(updateUser(currentUser))
            dispatch(getProducts({ key: currentUser._id ? currentUser._id : '' }))
            dispatch(getProductsChecking())
          }
        }
        else {
          if (user.email) {
            const currentUser: User = await usersService.findByEmail(user.email)
            if (currentUser) {
              dispatch(updateUser(currentUser))
              dispatch(getProducts({ key: currentUser._id ? currentUser._id : '' }))
              dispatch(getProductsChecking())
            }
          }

        }

      } catch (err) {
        console.log("Error login")
      }
    })
    return () => unregisterAuthObserver()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<LoginAdmin />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<Client />} />
        </Routes>
      </BrowserRouter>
      <Loading show={loading} />
      <Chat/>
    </>
  );
}

export default App;
