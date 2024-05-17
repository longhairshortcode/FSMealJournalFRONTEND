import style from "./Styles/Sidebar.module.css"
import { MonthContext } from "../../../pages/Dashboard"
import {useContext} from "react"

function Sidebar() {

const {setMonth, months, setMonthsTitle} = useContext(MonthContext)

  return (
    <div className={style.componentContainer}>
      <div className={style.topUserInfoContainer}>
            <p className={style.appTitle}>Remember What You Cooked</p>
            <div className={style.imageContainer}>
              <img className={style.image}/>
              <p>icon</p>
            </div>
            <p className={style.userName}>User Name</p>
            <button className={style.button}>edit name</button>
      </div>
      <div className={style.bottomTabsContainer}>
            <button className={`${style.month} ${style.jan}`} onClick={() => {setMonth(1); setMonthsTitle(months[0])}}>January</button>
            <button className={`${style.month} ${style.feb}`} onClick={() => {setMonth(2); setMonthsTitle(months[1])}}>February</button>
            <button className={`${style.month} ${style.march}`} onClick={() => {setMonth(3); setMonthsTitle(months[2])}}>March</button>
            <button className={`${style.month} ${style.apr}`} onClick={() => {setMonth(4); setMonthsTitle(months[3])}}>April</button>
            <button className={`${style.month} ${style.may}`} onClick={() => {setMonth(5); setMonthsTitle(months[4])}}>May</button>
            <button className={`${style.month} ${style.jun}`} onClick={() => {setMonth(6); setMonthsTitle(months[5])}}>June</button>
            <button className={`${style.month} ${style.july}`} onClick={() => {setMonth(7); setMonthsTitle(months[6])}}>July</button>
            <button className={`${style.month} ${style.aug}`} onClick={() => {setMonth(8); setMonthsTitle(months[7])}}>August</button>
            <button className={`${style.month} ${style.sept}`} onClick={() => {setMonth(9); setMonthsTitle(months[8])}}>September</button>
            <button className={`${style.month} ${style.oct}`} onClick={() => {setMonth(10); setMonthsTitle(months[9])}}>October</button>
            <button className={`${style.month} ${style.nov}`} onClick={() => {setMonth(11); setMonthsTitle(months[10])}}>November</button>
            <button className={`${style.month} ${style.dec}`} onClick={() => {setMonth(12); setMonthsTitle(months[11])}}>December</button>
      </div> 
      <button className={style.signOutButton}>Sign Out</button>       
    </div>
  )
}

export default Sidebar
