import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/homePage.tsx"
import AuthCallbackPage from "./pages/AuthCallbackPage.tsx"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLayout from "./layout/MainLayout.tsx"
import ChatPage from "./pages/ChatPage.tsx"


function App() {
  return (
    <>
       <Routes>
        
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback
        signUpFallbackRedirectUrl={"/auth-callback"}
        />} />
        <Route path="/auth-callback" element={<AuthCallbackPage/>} />


        <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage/>} />
        <Route path="/chat" element={<ChatPage/>} />
        </Route>



        </Routes>
    </>
  )
}

export default App
