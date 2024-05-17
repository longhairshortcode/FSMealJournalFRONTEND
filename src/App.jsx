import {Routes, Route, Navigate} from "react-router-dom"
import {useState, createContext} from "react"
import SignUp from "./pages/SignUp.jsx"
import Error from "./pages/Error.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"



export const AuthContext = createContext()

function App() {

const [userId, setUserId] = useState()

const [user, setUser] = useState({
  email: "",
  name: "",
  id: 1

})

  return (
    <>
      <AuthContext.Provider value={{setUser, user}}>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/sign-up"} element={<SignUp/>}/>
          <Route path={"/dashboard"} element={ user.id ? <Dashboard/> : <Navigate to="/login"/>}/>
          <Route path={"*"} element={<Error/>}/>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
