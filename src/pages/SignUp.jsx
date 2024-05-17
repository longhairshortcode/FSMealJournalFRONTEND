import style from "./Styles/SignUp.module.css"
import axios from "axios"
import {useState, useContext, useEffect} from "react"
import { AuthContext } from "../App"
import {Link, useNavigate, useRoutes} from "react-router-dom"

function SignUp() {
const {setUser} = useContext(AuthContext)
const navigate = useNavigate()
const [userSignUpData, setUserSignUpData] = useState({
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
})

const [isNameLengthValid, setIsNameLengthValid] = useState(false)
const [isPWLengthValid, setIsPWLengthValid] = useState(false)
const [passwordsMatch, setPasswordsMatch] = useState(true)

useEffect(() => {
if (userSignUpData.name.length > 1){
  setIsNameLengthValid(true)
}else{
  setIsNameLengthValid(false)
}

}, [userSignUpData.name])

useEffect(() => {
  if (userSignUpData.password.length > 7){
    setIsPWLengthValid(true)
    return;
  }
  setIsPWLengthValid(false)
}, [userSignUpData.password])

useEffect(() =>{
  if (userSignUpData.password !== userSignUpData.confirmPassword){
    setPasswordsMatch(false)
  }else{
    setPasswordsMatch(true)
  }
}, [userSignUpData.confirmPassword])

//Three arrow functions returning something, but if you don't want to return, like in a useEffect,
//no (), no "return", just code in the {}
// () => {
//   const b = a + c
//   return b
// }

// () => (
//   a + c 
// )

// () => return a + c

//onChange is NOT async/await
function handleChange(e){
  const {name, value} = e.target
  setUserSignUpData(prev => ({
    ...prev,
    [name] : value
  })) 
}

//handleSubmit YES is async/await
async function handleSubmit(e) {
  //1) Prevent default and destructure from state 
  e.preventDefault()
  
  const {email, name, password, confirmPassword} = userSignUpData
  //2. Authenticate Password, if false, setPasswordsMatch to false & clear confirm input, then return
  if (password !== confirmPassword){
    setPasswordsMatch(false)
    setUserSignUpData(prev => ({
      ...prev,
      confirmPassword : ""
    })
    )
    return;
} 
//2) Try to post userSignUpdData, if 201, setUser from App.jsx with res data,
try{
  const res = await axios.post("http://localhost:2121/user/sign-up", {email, name, password})
  console.log("THIS IS THE RES", res)
  if (res.status === 201){
    setUserSignUpData(prev => ({
      ...prev,
      email: res.data.email,
      name: res.data.name,
      id: res.data.id,
    }))
    //3) Set localStorages, navigate
    window.localStorage.setItem("currentUserLoggedIn", res.data.id)
    navigate("/dashboard")
  }
//4) Catch
}catch(error){
  console.log("This error", error)
}
}


  return (
    <div className={style.componentContainer}>
    <div className={style.titleAndFormContainer}>
          <h1 className={style.title}>Sign-Up to The Remember What You Cooked App</h1>
          <form  className={style.formContainer} onSubmit={handleSubmit}>
              
              <label htmlFor="email">Email</label>
              <input 
              type="email"
              className={style.email}
              name="email"
              value={userSignUpData.email}
              onChange={handleChange}
              required/>
              
              {!isNameLengthValid &&
                <p className={style.nameLengthInvalid}>Name must be at least two letters.</p>
              }
              <label htmlFor="name">Name</label>
              <input 
              type="text"
              className={style.name}
              name="name"
              value={userSignUpData.name}
              onChange={handleChange}
              required/>
              
              {!isPWLengthValid &&
                <p className={style.passwordLengthInvalid}>Password must be at least 8 characters.</p>
              }
              <label htmlFor="password">Password</label>
              <input 
              type="password"
              className={style.password}
              name="password"
              value={userSignUpData.password}
              onChange={handleChange}
              required/>

              {!passwordsMatch &&
              <p className={style.passwordsMatch}>Confirmation password does not match password.</p>
              }
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
              type="password"
              className={style.confirmPassword}
              name="confirmPassword"
              value={userSignUpData.confirmPassword}
              onChange = {handleChange}
              required/>
              


              <button className={style.button}>Sign Up</button>
              <p className={style.logOrSign}>Have an account? <Link className={style.login}to={"login"}>Log in</Link></p>
          </form>
      </div>

    </div>
  )
}

export default SignUp



