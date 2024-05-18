//imports are es6 modern js
import style from "./Styles/Login.module.css"
import {Link} from "react-router-dom"
import {useState, useContext} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../App"

function Login() {

const {setUser} = useContext(AuthContext)
const navigate = useNavigate()
const [userLogin, setUserLogin] = useState({
  email: "",
  password: "",
})

function handleChange(e){
  const {name, value} = e.target
  setUserLogin(prev => ({
    ...prev,
    [name] : value
  }))
}

async function handleSubmit(e){
  e.preventDefault()
  const {email, password} = userLogin
  try{
    const res = await axios.post("https://remember-backend-kdq2.onrender.com/user/login", {email, password})
    console.log(res)
    if (res.status === 200){
      setUser(prev => ({
        ...prev,
        email: res.data.email,
        name: res.data.name,
        id: res.data.id 
      })
      ); 
      window.localStorage.setItem("currentUserLoggedIn", res.data.id)
      navigate("/dashboard")
    }
  }catch(error){
    console.log(error)
  }
}

  return (
    <div className={style.componentContainer}>
      <div className={style.titleAndFormContainer}>
            <h1 className={style.title}>Log in to The Remember What You Cooked App</h1>
            <form  className={style.formContainer} onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                type="email"
                className={style.email}
                name="email"
                value={userLogin.email}
                onChange={handleChange}
                required/>
                
                <label htmlFor="email">Password</label>
                <input 
                type="password"
                className={style.password}
                name="password"
                value={userLogin.password}
                onChange={handleChange}
                required/>
                
                <button className={style.button}>Log In</button>
                <p className={style.logOrSign}>Don't have an account? <Link className={style.signUp}to={"/sign-up"}>Sign-up</Link></p>
            </form>
        </div>

      </div>

  )
}

export default Login
