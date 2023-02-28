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
import { auth } from "../firebase-config";
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
                console.log(currentUser)
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


    return (
        <div>
            <Navbar />
            <div className="keeperContainer2">
                <div></div>
                <div className="kb2">
                    <span className="kmonth2">
                        <BsCaretLeftFill className="preMonth" size={30} onClick={handlePrevMonth} />
                        &nbsp;{date.substring(0, 7)}&nbsp;
                        <BsCaretRightFill className="nextMonth" size={30} onClick={handleNextMonth} />
                    </span>
                    <div className="monthItem">
                        <div className="monthIncome">
                            <div>總收入</div>
                            <div>{totalIncome}</div>
                        </div>
                        <div className="monthExpense">
                            <div>總支出</div>
                            <div>{totalExpense}</div>
                        </div>
                        <div className="monthTotal">
                            <div>月結餘</div>
                            <div>{totalIncome - totalExpense}</div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="chartContainer">
                <div></div>
                <div className="cc">
                    <div className="chartBoard">
                        <div className="chartTitle">收入類別月比例</div>
                        <div className="pie">
                            <EarnChart />
                        </div>
                    </div>
                    <div className="chartBoard">
                        <div className="chartTitle">支出類別月比例</div>
                        <div className="pie">
                            <CostChart />
                        </div>
                    </div>
                    <div className="chartBoard">
                        <div className="chartTitle">上半年度結餘分析</div>
                        <div className="bar">
                            <Totle1Chart />
                        </div>
                    </div>
                    <div className="chartBoard">
                        <div className="chartTitle">下半年度結餘分析</div>
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