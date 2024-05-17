import style from "./Styles/Home.module.css"
import { Link } from 'react-router-dom'  

function Home() {
  return (
    <div className={style.componentContainer}>
        <div className={style.topContainer}>
            <p className={style.appName}>The Remember What You Cooked App</p>
            <p><Link to={"/login"} className={style.logInButton}>Log In</Link></p>
        </div>
        <p className={style.message}>Log Your Meals & Find Inspiration</p>
    </div>
  )
}

export default Home

