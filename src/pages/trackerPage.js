import React from "react";
import '../style/trackerPage.css';
import '../style/progressBar.css';
import Navbar from "../components/navbar";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { db } from '../firebase';
import { addDoc, collection } from "firebase/firestore";
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { startOfMonth, endOfMonth } from 'date-fns';
import { onSnapshot, where, query, deleteDoc, getDocs } from "firebase/firestore";


const TrackerPage = () => {
    const {

        apparel, setApparel,
        housing, setHousing,
        educate, setEducate,
        savings, setSavings,

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
      
        selectedBudgetId, setSelectedBudgetId,

        totalIncome, setTotalIncome,
        totalExpense, setTotalExpense,
        costFood, setCostFood,
        costTraffic, setCostTraffic,
        costPlay, setCostPlay,
        costOther, setCostOther } = useBudgetTracker();

    const [isEditingFood, setIsEditingFood] = useState(false);
    const [isEditingTraffic, setIsEditingTraffic] = useState(false);
    const [isEditingPlay, setIsEditingPlay] = useState(false);
    const [isEditingOther, setIsEditingOther] = useState(false);
    const [isEditingApparel, setIsEditingApparel] = useState(false);
    const [isEditingHousing, setIsEditingHousing] = useState(false);
    const [isEditingEducate, setIsEditingEducate] = useState(false);
    const [isEditingSavings, setIsEditingSavings] = useState(false);

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

    useEffect(() => {
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const data = {
            food: 0,
            traffic: 0,
            play: 0,
            other: 0,
            apparel: 0,
            housing: 0,
            educate: 0,
            savings: 0
        };

        getDoc(budgetRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    console.log("Document exists with data:", docSnapshot.data());
                    setFood(docSnapshot.data().food);
                    setTraffic(docSnapshot.data().traffic);
                    setPlay(docSnapshot.data().play);
                    setOther(docSnapshot.data().other)
                    setApparel(docSnapshot.data().apparel);
                    setHousing(docSnapshot.data().housing);
                    setEducate(docSnapshot.data().educate);
                    setSavings(docSnapshot.data().savings);
                } else {
                    setDoc(budgetRef, data)
                        .then(() => console.log("Document created successfully!"))
                        .catch((error) => console.error("Error creating document: ", error));
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    }, []);

    const handleUpdateFood = async () => {
        if (!food) {
            alert("請輸入預算");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            food: food
        }
        await updateDoc(budgetRef, payload);
        setIsEditingFood(null);
    }
    const handleUpdateTraffic = async () => {
        if (!traffic) {
            alert("請輸入預算");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            traffic: traffic
        }
        await updateDoc(budgetRef, payload);
        setIsEditingTraffic(null);
    }
    const handleUpdateOther = async () => {
        if (!other) {
            alert("請輸入預算");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            other: other
        }
        await updateDoc(budgetRef, payload);
        setIsEditingOther(null);
    }
    const handleUpdatePlay = async () => {
        if (!play) {
            alert("請輸入預算");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            play: play
        }
        await updateDoc(budgetRef, payload);
        setIsEditingPlay(null);
    }
    const handleUpdateApparel = async () => {
        if (!apparel) {
            alert("請輸入預算");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            apparel: apparel
        }
        await updateDoc(budgetRef, payload);
        setIsEditingApparel(null);
    }
    const handleUpdateHousing = async () => {
        if (!housing) {
            alert("請輸入預算");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            housing: housing
        }
        await updateDoc(budgetRef, payload);
        setIsEditingHousing(null);
    }
    const handleUpdateEducate = async () => {
        if (!educate) {
            alert("請輸入預算");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            educate: educate
        }
        await updateDoc(budgetRef, payload);
        setIsEditingEducate(null);
    }
    const handleUpdateSavings = async () => {
        if (!savings) {
            alert("請輸入預算");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            savings: savings
        }
        await updateDoc(budgetRef, payload);
        setIsEditingSavings(null);
    }



    return (
        <div>
            <Navbar />
            <div className="keeperContainer2">
                <div></div>
                <div className="kb">
                    <span className="kmonth2">
                        {/* <BsCaretLeftFill className="preMonth" size={30} onClick={handlePrevMonth} /> */}
                        &nbsp;{date.substring(0, 7)}&nbsp;
                        {/* <BsCaretRightFill className="nextMonth" size={30} onClick={handleNextMonth} /> */}
                    </span>
                    <div className="budget">待分配預算&nbsp;&nbsp;&nbsp;
                        {localStorage.getItem("totalIncome") - food - traffic - play - other}</div>
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
                                                    onChange={event => setFood(parseInt(event.target.value))}
                                                />
                                                {/* <TiTick className="tickicon" size={20} onClick={() => setIsEditingFood(null)} /> */}
                                                <button className="tickicon" onClick={handleUpdateFood}>✔</button>
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
                                                <button className="tickicon" onClick={handleUpdateTraffic}>✔</button>
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
                                                <button className="tickicon" onClick={handleUpdatePlay}>✔</button>
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
                                                <button className="tickicon" onClick={handleUpdateOther}>✔</button>
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