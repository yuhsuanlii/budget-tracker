import React from "react";
import { useEffect } from "react";
import '../style/chartPage.css';
import Navbar from "../components/navbar";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";
import CostChart from "../components/costChart";
import EarnChart from "../components/earnChart";
import Totle1Chart from "../components/totle1Chart";
import Totle2Chart from "../components/totle2Chart";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ChartPage = () => {

    const {
        user, setUser,
        userData, setUserData,
        showLogin, setShowLogin,

        username, setUsername,
        gender, setGender,
        birthday, setBirthday,
        email, setEmail,
        password, setPassword,

        isEditingName, setIsEditingName,
        isEditingGender, setIsEditingGender,
        isEditingBirthday, setIsEditingBirthday,
        isEditingEmail, setIsEditingEmail,
        isEditingPassword, setIsEditingPassword,

        showForm, setShowForm,
        showLoginForm, setShowLoginForm,
        expenses, setExpenses,
        amount, setAmount,
        description, setDescription,
        category, setCategory,
        date, setDate,
        costs, setCosts,
        budget, setBudget,
        allocatedBudget, setAllocatedBudget,
        bcategory, setbCategory,
        food, setFood,
        traffic, setTraffic,
        play, setPlay,
        other, setOther,
        isEditingFood, setIsEditingFood,
        isEditingTraffic, setIsEditingTraffic,
        isEditingPlay, setIsEditingPlay,
        isEditingOther, setIsEditingOther,
        selectedBudgetId, setSelectedBudgetId,

        totalIncome, setTotalIncome,
        totalExpense, setTotalExpense,
        costFood, setCostFood,
        costTraffic, setCostTraffic,
        costPlay, setCostPlay,
        costOther, setCostOther } = useBudgetTracker();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                window.location.href = '/';
            } else {
                // console.log(currentUser)
            }
        });
        return () => unsubscribe();
    }, []);

    const handlePrevMonth = () => {
        const prevMonth = new Date(date);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setDate(prevMonth.toISOString().substring(0, 10));
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(date);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setDate(nextMonth.toISOString().substring(0, 10));
    };
    const dateTitle = ((localStorage.getItem('firstDay')) || date).substring(0, 7)

    return (
        <div>
            <Navbar />
            <div className="keeperContainer2">
                <div></div>
                <div className="kb2">
                    <span className="kmonth2">
                        {/* <BsCaretLeftFill className="preMonth" size={30} onClick={handlePrevMonth} /> */}
                        &nbsp;{dateTitle}&nbsp;
                        {/* <BsCaretRightFill className="nextMonth" size={30} onClick={handleNextMonth} /> */}
                    </span>
                    <div className="monthItem">
                        <div className="monthIncome">
                            <div>?????????</div>
                            <div>{localStorage.getItem("totalIncome")}</div>
                        </div>
                        <div className="monthExpense">
                            <div>?????????</div>
                            <div>{localStorage.getItem("totalExpense")}</div>
                        </div>
                        <div className="monthTotal">
                            <div>?????????</div>
                            <div>{localStorage.getItem("totalIncome") - localStorage.getItem("totalExpense")}</div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="chartContainer">
                <div></div>
                <div className="cc">
                    <div className="chartBoard">
                        <div className="chartTitle">?????????????????????</div>
                        <div className="pie">
                            <EarnChart />
                        </div>
                    </div>
                    <div className="chartBoard">
                        <div className="chartTitle">?????????????????????</div>
                        <div className="pie">
                            <CostChart />
                        </div>
                    </div>
                    <div className="chartBoard">
                        <div className="chartTitle">????????????????????????</div>
                        <div className="bar">
                            <Totle1Chart />
                        </div>
                    </div>
                    <div className="chartBoard">
                        <div className="chartTitle">????????????????????????</div>
                        <div className="bar">
                            <Totle2Chart />
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default ChartPage;