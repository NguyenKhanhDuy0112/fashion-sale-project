import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './view/container/admin';
import Client from './view/container/client';
import LoginAdmin from './view/pages/admin/LoginAdmin';
import { authentication } from "./firebase-config"
import Loading from "./shared/components/Loading";
import useLoading from "./shared/hooks/useLoading";

function App() {
  const loading = useLoading()

  //handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = authentication.onAuthStateChanged(async (user) => {
        if(!user){
          console.log("User id not logged in")
          //user logs out, handle something here
          return;
        }

        console.log("Logged in user: ", user)
        const token = await user.getIdToken()
        console.log("Logged in user token: ", token)

    })
    return () => unregisterAuthObserver()
  },[])

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path = "/admin" element = {<LoginAdmin/>}/>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<Client />} />
        </Routes>
      </BrowserRouter>
      <Loading show = {loading} />
    </>
  );
}

export default App;
