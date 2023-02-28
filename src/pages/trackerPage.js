import React from "react";
import '../style/trackerPage.css';
import '../style/progressBar.css';
import Navbar from "../components/navbar";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";


const TrackerPage = () => {
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
                <div className="kb">
                    <span className="kmonth2">
                        <BsCaretLeftFill className="preMonth" size={30} onClick={handlePrevMonth} />
                        &nbsp;{date.substring(0, 7)}&nbsp;
                        <BsCaretRightFill className="nextMonth" size={30} onClick={handleNextMonth} />
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
                                                    max={8}
                                                    value={food}
                                                    onChange={event => setFood(event.target.value)}
                                                />
                                                {/* <TiTick className="tickicon" size={20} onClick={() => setIsEditingFood(null)} /> */}
                                                <button className="tickicon" onClick={() => setIsEditingFood(null)}>✔</button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{food}</span>
                                                <FiEdit3 className="editicon" size={20} onClick={() => setIsEditingFood(true)} />
                                            </>
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
                                            <>
                                                <span>{traffic}</span>
                                                <FiEdit3 className="editicon" size={20} onClick={() => setIsEditingTraffic(true)} />
                                            </>
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
                                            <>
                                                <span>{play}</span>
                                                <FiEdit3 className="editicon" size={20} onClick={() => setIsEditingPlay(true)} />
                                            </>
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
                                            <>
                                                <span>{other}</span>
                                                <FiEdit3 className="editicon" size={20} onClick={() => setIsEditingOther(true)} />
                                            </>

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