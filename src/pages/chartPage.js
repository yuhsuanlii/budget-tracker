import React from "react";
import { useEffect } from "react";
import '../style/chartPage.css';
import Navbar from "../components/navbar";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import CostChart from "../components/costChart";
import EarnChart from "../components/earnChart";
import Totle1Chart from "../components/totle1Chart";
import Totle2Chart from "../components/totle2Chart";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ChartPage = () => {

    const {
        user, setUser,
        date, setDate,
    } = useBudgetTracker();

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

    const dateTitle = ((localStorage.getItem('firstDay')) || date).substring(0, 7)

    return (
        <div>
            <Navbar />
            <div className="keeperContainer2">
                <div></div>
                <div className="kb2">
                    <span className="kmonth2">
                        &nbsp;{dateTitle}&nbsp;
                    </span>
                    <div className="monthItem">
                        <div className="monthIncome">
                            <div>總收入</div>
                            <div>{localStorage.getItem("totalIncome")}</div>
                        </div>
                        <div className="monthExpense">
                            <div>總支出</div>
                            <div>{localStorage.getItem("totalExpense")}</div>
                        </div>
                        <div className="monthTotal">
                            <div>月結餘</div>
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