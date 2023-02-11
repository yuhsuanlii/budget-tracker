import React from "react";
import '../style/trackerPage.css';
import '../style/progressBar.css';
import Home from "../components/navbar";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";


const TrackerPage = () => {
    const {
        showForm, setShowForm,
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

    return (
        <div>
            <Home />
            <div className="keeperContainer2">
                <div></div>
                <div className="kb">
                    <span className="kmonth2">
                        <BsCaretLeftFill size={30} />
                        &nbsp;{date.substring(0, 7)}&nbsp;
                        <BsCaretRightFill size={30} />
                    </span>
                    <div className="budget">待分配預算&nbsp;&nbsp;&nbsp;
                        {totalIncome - food - traffic - play - other}</div>
                </div>
                <div></div>
            </div>

            <div className="trackerContainer">
                <div></div>
                <div className="tc">
                    {/* food */}
                    <div className="trackerCard">
                        <div className="trackerPic">
                            {/* <CiForkAndKnife className="tpic"/> */}
                            <span className="trackerCategory">Food</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">預算</div>
                                    <div className="tbm">
                                        {isEditingFood ? (
                                            <>
                                                <input
                                                    type="number"
                                                    className="binput"
                                                    value={food}
                                                    onChange={event => setFood(event.target.value)}
                                                />
                                                {/* <TiTick className="tickicon" size={20} onClick={() => setIsEditingFood(null)} /> */}
                                                <button className="tickicon" onClick={() => setIsEditingFood(null)}>✔</button>
                                            </>
                                        ) : (
                                            <span className="tbmok" onClick={() => setIsEditingFood(true)}>{food}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="tbn">使用</div>
                                    <div className="tbm">{costFood}</div>
                                </div>
                                <div>
                                    <div className="tbn">剩餘</div>
                                    <div className="tbm">{food - costFood}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    <span className="progress-bar__inner" style={{ width: ((costFood / food) * 100) * 3 }}>
                                        <span className='progress-bar__percent'>{Math.round((costFood / food) * 100)}%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* traffic */}
                    <div className="trackerCard">
                        <div className="trackerPic">
                            {/* <CiForkAndKnife className="tpic"/> */}
                            <span className="trackerCategory">Traffic</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">預算</div>
                                    <div className="tbm">
                                        {isEditingTraffic ? (
                                            <>
                                                <input
                                                    type="number"
                                                    className="binput"
                                                    value={traffic}
                                                    onChange={event => setTraffic(event.target.value)}
                                                />
                                                <button className="tickicon" onClick={() => setIsEditingTraffic(null)}>✔</button>
                                            </>
                                        ) : (
                                            <span className="tbmok" onClick={() => setIsEditingTraffic(true)}>{traffic}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="tbn">使用</div>
                                    <div className="tbm">{costTraffic}</div>
                                </div>
                                <div>
                                    <div className="tbn">剩餘</div>
                                    <div className="tbm">{traffic - costTraffic}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    <span className="progress-bar__inner" style={{ width: ((costTraffic / traffic) * 100) * 3 }}>
                                        <span className='progress-bar__percent'>{Math.round((costTraffic / traffic) * 100)}%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* fun */}
                    <div className="trackerCard">
                        <div className="trackerPic">
                            {/* <CiForkAndKnife className="tpic"/> */}
                            <span className="trackerCategory">Fun</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">預算</div>
                                    <div className="tbm">
                                        {isEditingPlay ? (
                                            <>
                                                <input
                                                    type="number"
                                                    className="binput"
                                                    value={play}
                                                    onChange={event => setPlay(event.target.value)}
                                                />
                                                <button className="tickicon" onClick={() => setIsEditingPlay(null)}>✔</button>
                                            </>
                                        ) : (
                                            <span className="tbmok" onClick={() => setIsEditingPlay(true)}>{play}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="tbn">使用</div>
                                    <div className="tbm">{costPlay}</div>
                                </div>
                                <div>
                                    <div className="tbn">剩餘</div>
                                    <div className="tbm">{play - costPlay}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    <span className="progress-bar__inner" style={{ width: ((costPlay / play) * 100) * 3 }}>
                                        <span className='progress-bar__percent'>{Math.round((costPlay / play) * 100)}%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* other */}
                    <div className="trackerCard">
                        <div className="trackerPic">
                            {/* <CiForkAndKnife className="tpic"/> */}
                            <span className="trackerCategory">Other</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">預算</div>
                                    <div className="tbm">
                                        {isEditingOther ? (
                                            <>
                                                <input
                                                    type="number"
                                                    className="binput"
                                                    value={other}
                                                    onChange={event => setOther(event.target.value)}
                                                />
                                                <button className="tickicon" onClick={() => setIsEditingOther(null)}>✔</button>
                                            </>
                                        ) : (
                                            <span className="tbmok" onClick={() => setIsEditingOther(true)}>{other}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="tbn">使用</div>
                                    <div className="tbm">{costOther}</div>
                                </div>
                                <div>
                                    <div className="tbn">剩餘</div>
                                    <div className="tbm">{other - costOther}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    <span className="progress-bar__inner" style={{ width: ((costOther / other) * 100) * 3 }}>
                                        <span className='progress-bar__percent'>{Math.round((costOther / other) * 100)}%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div></div>
            </div>

        </div>
    )
}

export default TrackerPage;