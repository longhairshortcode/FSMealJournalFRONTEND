import style from "./Calendar.module.css";
import { MonthContext } from "../../../pages/Dashboard";
import { useContext, useEffect, useState } from "react";
import PopUp from "./PopUp/PopUp";

function Calendar() {
    const [day, setDay] = useState(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
    const { month, monthsTitle } = useContext(MonthContext);
    const [totalDays, setTotalDays] = useState(0);
    const [showPopUp, setShowPopUp] = useState(false);

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function getDayOfWeek(date) {
        const dayIndex = new Date(date).getDay(); // Get the day of the week (0-6)
        return dayIndex; // Return the index of the day in the week array
    }

    useEffect(() => {
        const total = daysInMonth(month, new Date().getFullYear());
        setTotalDays(total);
    }, [month]);

    function renderSquares() {
        const firstDayOfMonth = new Date(new Date().getFullYear(), month - 1, 1);
        const offset = getDayOfWeek(firstDayOfMonth); // Determine the offset for the first day
        const squares = [];

        // Add empty squares for the offset
        for (let i = 0; i < offset; i++) {
            squares.push(<div key={`empty-${i}`} className={style.square}></div>);
        }

        // Add squares for each day of the month
        for (let i = 1; i <= totalDays; i++) {
            squares.push(
                <div key={`day-${i}`} className={style.square} onClick={() => setShowPopUp(true)}>
                    <p className={style.number}>{i}</p>
                    {/* <p className={style.dayName}>{day[(offset + i - 1) % 7]}</p> */}
                </div>
            );
        }

        return squares;
    }

    return (
        <div className={style.componentContainer}>
            <div className={style.monthTitleContainer}>
                <h1 className={style.monthTitle}>{monthsTitle}</h1>
                <div className={style.daysTitleContainer}>
                    {day.map((dayName, index) => (
                        <h2 className={style.dayTitle} key={index}>
                            {dayName}
                        </h2>
                    ))}
                </div>
            </div>
            {showPopUp && <PopUp setShowPopUp={setShowPopUp} />}
            <div className={style.daysContainer}>{renderSquares()}</div>
        </div>
    );
}

export default Calendar;