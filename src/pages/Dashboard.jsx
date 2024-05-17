import Calendar from "../components/Dashboard/Calendar/Calendar"
import Sidebar from "../components/Dashboard/Sidebar/Sidebar"
import style from "./Styles/Dashboard.module.css"
import { useState, createContext, useEffect} from "react"

export const MonthContext = createContext()

function Dashboard() {
const currentMonth = new Date().getMonth()
const [month, setMonth] = useState(currentMonth + 1)
const [months, setMonths] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
const [monthsTitle, setMonthsTitle] = useState(months[month - 1])

useEffect(()=>{
  console.log(monthsTitle)
},[monthsTitle])

  return (
    <MonthContext.Provider value={{month, setMonth, months, setMonthsTitle, monthsTitle}}>
      <div className={style.componentContainer}>
        <Sidebar/>
        <Calendar/>
      </div>
    </MonthContext.Provider>
  )
}

export default Dashboard
