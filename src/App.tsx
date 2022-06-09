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

function App() {
  const loading = useLoading()
  const dispatch = useDispatch()
  //handle firebase auth changed
  useEffect(() => {
    // authentication.signOut()
    const unregisterAuthObserver = authentication.onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(signOut())
        console.log("User id not logged in")
        //user logs out, handle something here
        return;
      }

      try {
        const currentUser: User = await usersService.findByUid(user.uid)
        if (currentUser) {
          dispatch(updateUser(currentUser))
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
    </>
  );
}

export default App;
