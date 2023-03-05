import React, { useState } from "react";
import '../style/coverPage.css';
import LoginForm from "../components/loginForm";
// import example from '../image/example.JPG';
import keeper from '../image/keeper.gif';
import tracker from '../image/tracker.gif';
import chart from '../image/chart.gif';


import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const CoverPage = () => {


    return (
        <div>
            <LoginForm />
            <div className="coverContainer">
                <div></div>
                <div className="ca">
                    <div className="coverCard1">
                        {/* <div className="coverInner1"> */}
                        <div className="coverTitle">Budget Tracker</div>
                        {/* </div> */}
                        {/* <div className="coverInner2"> */}
                        <div className="coverDetail">
                            {/* 想花錢必須先有預算！<br />
                            BUDGET TRACKER是您開始理財的好幫手，<br />
                            提供預算使用進度百分比，在記帳的同時也能一目了然剩餘的預算金額，讓每一塊錢都可以妥善被運用。 */}
                            If you want to spend money, you must first have a budget!
                            BUDGET TRACKER is a good helper for you to start financial management.
                            {/* Provide the budget usage progress percentage, and you can see the remaining budget amount at a glance while keeping the account, so that every dollar can be properly used. */}
                        </div>
                        {/* </div> */}
                    </div>
                    <div className="coverCard2">
                        <img src={keeper} alt="keeper" className="img" />
                    </div>
                </div>

            </div>
            <div className="coverContainer2">
                <div></div>
                <div className="ca">
                    <div className="coverCard3">
                        <img src={tracker} alt="tracker" className="img2" />
                    </div>
                    <div className="coverCard4">
                        <div className="coverSubTitle">
                            Keeper & Tracker
                        </div>
                        <div className="coverSubDetail">
                            {/* 將收入妥善分配到每項支出的類別上，
                        替每個月的消費先訂定好預算，防止過度消費產生負債情形。 */}
                            Allocate income properly to each spending category, set a budget for each month's expenses in advance, and prevent excessive spending from leading to debt.
                        </div>
                    </div>
                </div>

                <div></div>
            </div>
            <div className="coverContainer3">
                <div></div>
                <div className="ca">
                    <div className="coverCard5">
                        <div className="coverSubTitle3">
                            Chart
                        </div>
                        <div className="coverSubDetail3">
                            {/* 將收入妥善分配到每項支出的類別上，
                        替每個月的消費先訂定好預算，防止過度消費產生負債情形。 */}
                            {/* 透過收入及消費類別圓餅圖和上下年度結餘圖表分析，清楚了解金錢動向。 */}
                            Users can clearly understand the money flow by
                            income/expense category pie charts and the balance charts of current year.
                        </div>
                    </div>
                    <div className="coverCard6">
                    <img src={chart} alt="chart" className="img3" />
                </div>
                </div>
                <div></div>
            </div>


        </div>
    )
}
export default CoverPage;