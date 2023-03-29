import React from "react";
import '../style/coverPage.css';
import LoginForm from "../components/loginForm";
import keeper from '../image/keeper.gif';
import tracker from '../image/tracker.gif';
import chart from '../image/chart.gif';

const CoverPage = () => {

    return (
        <div>
            <LoginForm />
            <div className="coverContainer">
                <div></div>
                <div className="ca">
                    <div className="coverCard1">
                        <div className="coverTitle">Budget Tracker</div>
                        <div className="coverDetail">
                            If you want to spend money, you must have a budget first!
                            BUDGET TRACKER is your best helper to start financial management.
                        </div>
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
                            Users can understand the money flow clearly by
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