import React from "react";
import '../style/trackerPage.css';
import '../style/progressBar.css';
import Navbar from "../components/navbar";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";
import { IoGameController, IoHome } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { FaCarSide, FaGraduationCap, FaPiggyBank, FaFolderOpen, FaHouseUser } from "react-icons/fa";

import { FiEdit3 } from "react-icons/fi";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { db } from '../firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';


const TrackerPage = () => {
    const {
        uid, setUid,
        user, setUser,
        userData, setUserData,
        showLogin, setShowLogin,

        username, setUsername,
        gender, setGender,
        birthday, setBirthday,
        email, setEmail,
        password, setPassword,

        showForm, setShowForm,
        showEditForm, setShowEditForm,
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
        costOther, setCostOther,

        costApparel, setCostApparel,
        costHousing, setCostHousing,
        costEducate, setCostEducate,
        costSavings, setCostSavings,

        apparel, setApparel,
        housing, setHousing,
        educate, setEducate,
        savings, setSavings,

        earnSalary, setEarnSalary,
        earnStock, setEarnStock,
        earnGift, setEarnGift,
        earnOther, setEarnOther } = useBudgetTracker();

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

            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const firstDay = localStorage.getItem('firstDay');
        const uid = localStorage.getItem('uid');

        if (firstDay && uid) {
            const docId = firstDay + uid;
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
                        // console.log("Document exists with data:", docSnapshot.data());
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
        }
    }, []);

    const handleUpdateFood = async () => {
        if (!food || isNaN(food) || food === "") {
            alert("???????????????");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            food: parseInt(food)
        }
        await updateDoc(budgetRef, payload);
        setIsEditingFood(null);
    }
    const handleUpdateTraffic = async () => {
        if (!traffic || isNaN(traffic) || traffic === "") {
            alert("???????????????");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            traffic: parseInt(traffic)
        }
        await updateDoc(budgetRef, payload);
        setIsEditingTraffic(null);
    }
    const handleUpdateOther = async () => {
        if (!other || isNaN(other) || other === "") {
            alert("???????????????");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            other: parseInt(other)
        }
        await updateDoc(budgetRef, payload);
        setIsEditingOther(null);
    }
    const handleUpdatePlay = async () => {
        if (!play || isNaN(play) || play === "") {
            alert("???????????????");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            play: parseInt(play)
        }
        await updateDoc(budgetRef, payload);
        setIsEditingPlay(null);
    }
    const handleUpdateApparel = async () => {
        if (!apparel || isNaN(apparel) || apparel === "") {
            alert("???????????????");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            apparel: parseInt(apparel)
        }
        await updateDoc(budgetRef, payload);
        setIsEditingApparel(null);
    }
    const handleUpdateHousing = async () => {
        if (!housing || isNaN(housing) || housing === "") {
            alert("???????????????");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            housing: parseInt(housing)
        }
        await updateDoc(budgetRef, payload);
        setIsEditingHousing(null);
    }
    const handleUpdateEducate = async () => {
        if (!educate || isNaN(educate) || educate === "") {
            alert("???????????????");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            educate: parseInt(educate)
        }
        await updateDoc(budgetRef, payload);
        setIsEditingEducate(null);
    }
    const handleUpdateSavings = async () => {
        if (!savings || isNaN(savings) || savings === "") {
            alert("???????????????");
            return;
        }
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const budgetRef = doc(db, "budget", docId);
        const payload = {
            savings: parseInt(savings)
        }
        await updateDoc(budgetRef, payload);
        setIsEditingSavings(null);
    }

    const localFood = localStorage.getItem('cost??????');
    const localTraffic = localStorage.getItem('cost??????');
    const localPlay = localStorage.getItem('cost??????');
    const localOther = localStorage.getItem('cost??????');
    const localApparel = localStorage.getItem('cost??????');
    const localHousing = localStorage.getItem('cost??????');
    const localEducate = localStorage.getItem('cost??????');
    const localSavings = localStorage.getItem('cost??????');

    const dateTitle = ((localStorage.getItem('firstDay')) || date).substring(0, 7)

    return (
        <div>
            <Navbar />
            <div className="keeperContainer2">
                <div></div>
                <div className="kb">
                    <span className="kmonth2">
                        {/* <BsCaretLeftFill className="preMonth" size={30} onClick={handlePrevMonth} /> */}
                        &nbsp;{dateTitle}&nbsp;
                        {/* <BsCaretRightFill className="nextMonth" size={30} onClick={handleNextMonth} /> */}
                    </span>
                    <div className="budget">???????????????&nbsp;&nbsp;&nbsp;
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
                        <MdFastfood className="tpic" size={40}/><br/>
                            <span className="trackerCategory">Food</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">
                                        {isEditingFood ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="binput"
                                                    value={food}
                                                    minLength={1} maxLength={8}
                                                    required
                                                    onChange={event => setFood(event.target.value)}
                                                />
                                                {/* <TiTick className="tickicon" size={20} onClick={() => setIsEditingFood(null)} /> */}
                                                <button className="tickicon" onClick={handleUpdateFood}>???</button>
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
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{costFood || localFood}</div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{food - (costFood || localFood)}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    {food != 0 && (costFood || localFood) != 0 ? (
                                        <span className="progress-bar__inner" style={{ width: (((costFood || localFood) / food) * 100) * 3 }}>
                                            <span className='progress-bar__percent'>{Math.round(((costFood || localFood) / food) * 100)}%</span>
                                        </span>
                                    ) : (
                                        <div className="needMoreBar">need more deta</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* apparel */}
                    <div className="trackerCard">
                        <div className="trackerPic">
                        <GiClothes className="tpic" size={45}/><br/>
                            <span className="trackerCategory">Apparel</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">
                                        {isEditingApparel ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="binput"
                                                    value={apparel}
                                                    minLength={1} maxLength={8}
                                                    required
                                                    onChange={event => setApparel(event.target.value)}
                                                />
                                                {/* <TiTick className="tickicon" size={20} onClick={() => setIsEditingFood(null)} /> */}
                                                <button className="tickicon" onClick={handleUpdateApparel}>???</button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{apparel}</span>
                                                <FiEdit3 className="editicon" size={20} onClick={() => setIsEditingApparel(true)} />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{costApparel || localApparel}</div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{apparel - (costApparel || localApparel)}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    {apparel != 0 && (costApparel || localApparel) != 0 ? (
                                        <span className="progress-bar__inner" style={{ width: (((costApparel || localApparel) / apparel) * 100) * 3 }}>
                                            <span className='progress-bar__percent'>{Math.round(((costApparel || localApparel) / apparel) * 100)}%</span>
                                        </span>
                                    ) : (
                                        <div className="needMoreBar">need more deta</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* housing */}
                    <div className="trackerCard">
                        <div className="trackerPic">
                        <IoHome className="tpic" size={35}/><br/>
                            <span className="trackerCategory">Housing</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">
                                        {isEditingHousing ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="binput"
                                                    value={housing}
                                                    minLength={1} maxLength={8}
                                                    required
                                                    onChange={event => setHousing(event.target.value)}
                                                />
                                                {/* <TiTick className="tickicon" size={20} onClick={() => setIsEditingFood(null)} /> */}
                                                <button className="tickicon" onClick={handleUpdateHousing}>???</button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{housing}</span>
                                                <FiEdit3 className="editicon" size={20} onClick={() => setIsEditingHousing(true)} />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{costHousing || localHousing}</div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{housing - (costHousing || localHousing)}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    {housing != 0 && costHousing != 0 ? (
                                        <span className="progress-bar__inner" style={{ width: (((costHousing || localHousing) / housing) * 100) * 3 }}>
                                            <span className='progress-bar__percent'>{Math.round(((costHousing || localHousing) / housing) * 100)}%</span>
                                        </span>
                                    ) : (
                                        <div className="needMoreBar">need more deta</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* traffic */}
                    <div className="trackerCard">
                        <div className="trackerPic">
                        <FaCarSide className="tpic" size={38}/><br/>
                            <span className="trackerCategory">Traffic</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">
                                        {isEditingTraffic ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="binput"
                                                    minLength={1} maxLength={8}
                                                    value={traffic}
                                                    required
                                                    onChange={event => setTraffic(event.target.value)}
                                                />
                                                <button className="tickicon" onClick={handleUpdateTraffic}>???</button>
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
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{costTraffic || localTraffic}</div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{traffic - (costTraffic || localTraffic)}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    {traffic != 0 && (costTraffic || localTraffic) != 0 ? (
                                        <span className="progress-bar__inner" style={{ width: (((costTraffic || localTraffic) / traffic) * 100) * 3 }}>
                                            <span className='progress-bar__percent'>{Math.round(((costTraffic || localTraffic) / traffic) * 100)}%</span>
                                        </span>
                                    ) : (
                                        <div className="needMoreBar">need more deta</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* educate */}
                    <div className="trackerCard">
                        <div className="trackerPic">
                        <FaGraduationCap className="tpic" size={40}/><br/>
                            <span className="trackerCategory">Educate</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">
                                        {isEditingEducate ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="binput"
                                                    value={educate}
                                                    minLength={1} maxLength={8}
                                                    required
                                                    onChange={event => setEducate(event.target.value)}
                                                />
                                                {/* <TiTick className="tickicon" size={20} onClick={() => setIsEditingFood(null)} /> */}
                                                <button className="tickicon" onClick={handleUpdateEducate}>???</button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{educate}</span>
                                                <FiEdit3 className="editicon" size={20} onClick={() => setIsEditingEducate(true)} />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{costEducate || localEducate}</div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{educate - (costEducate || localEducate)}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    {educate != 0 && (costEducate || localEducate) != 0 ? (
                                        <span className="progress-bar__inner" style={{ width: (((costEducate || localEducate) / educate) * 100) * 3 }}>
                                            <span className='progress-bar__percent'>{Math.round(((costEducate || localEducate) / educate) * 100)}%</span>
                                        </span>
                                    ) : (
                                        <div className="needMoreBar">need more deta</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* fun */}
                    <div className="trackerCard">
                        <div className="trackerPic">
                            <IoGameController className="tpic" size={35} /><br />
                            <span className="trackerCategory">Fun</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">
                                        {isEditingPlay ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="binput"
                                                    minLength={1} maxLength={8}
                                                    value={play}
                                                    required
                                                    onChange={event => setPlay(event.target.value)}
                                                />
                                                <button className="tickicon" onClick={handleUpdatePlay}>???</button>
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
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{costPlay || localPlay}</div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{play - (costPlay || localPlay)}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    {play != 0 && (costPlay || localPlay) != 0 ? (
                                        <span className="progress-bar__inner" style={{ width: (((costPlay || localPlay) / play) * 100) * 3 }}>
                                            <span className='progress-bar__percent'>{Math.round(((costPlay || localPlay) / play) * 100)}%</span>
                                        </span>
                                    ) : (
                                        <div className="needMoreBar">need more deta</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* savings */}
                    <div className="trackerCard">
                        <div className="trackerPic">
                            <FaPiggyBank className="tpic" size={35} /><br />
                            <span className="trackerCategory">Savings</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">
                                        {isEditingSavings ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="binput"
                                                    value={savings}
                                                    minLength={1} maxLength={8}
                                                    required
                                                    onChange={event => setSavings(event.target.value)}
                                                />
                                                {/* <TiTick className="tickicon" size={20} onClick={() => setIsEditingFood(null)} /> */}
                                                <button className="tickicon" onClick={handleUpdateSavings}>???</button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{savings}</span>
                                                <FiEdit3 className="editicon" size={20} onClick={() => setIsEditingSavings(true)} />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{costSavings || localSavings}</div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{savings - (costSavings || localSavings)}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    {savings != 0 && (costSavings || localSavings) != 0 ? (
                                        <span className="progress-bar__inner" style={{ width: (((costSavings || localSavings) / savings) * 100) * 3 }}>
                                            <span className='progress-bar__percent'>{Math.round(((costSavings || localSavings) / savings) * 100)}%</span>
                                        </span>
                                    ) : (
                                        <div className="needMoreBar">need more deta</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* other */}
                    <div className="trackerCard">
                        <div className="trackerPic">
                        <FaFolderOpen className="tpic" size={35}/><br/>
                            <span className="trackerCategory">Other</span>
                        </div>
                        <div className="trackerMain">
                            <div className="trackerBudget">
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">
                                        {isEditingOther ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="binput"
                                                    minLength={1} maxLength={8}
                                                    value={other}
                                                    required
                                                    onChange={event => setOther(event.target.value)}
                                                />
                                                <button className="tickicon" onClick={handleUpdateOther}>???</button>
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
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{costOther || localOther}</div>
                                </div>
                                <div>
                                    <div className="tbn">??????</div>
                                    <div className="tbm">{other - (costOther || localOther)}</div>
                                </div>
                            </div>
                            <div className="pBar">
                                <div className="progress-bar">
                                    {other != 0 && (costOther || localOther) != 0 ? (
                                        <span className="progress-bar__inner" style={{ width: (((costOther || localOther) / other) * 100) * 3 }}>
                                            <span className='progress-bar__percent'>{Math.round(((costOther || localOther) / other) * 100)}%</span>
                                        </span>
                                    ) : (
                                        <div className="needMoreBar">need more deta</div>
                                    )}
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