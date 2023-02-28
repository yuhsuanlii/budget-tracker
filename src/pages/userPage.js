import React from "react";
import '../style/userPage.css';
import Navbar from "../components/navbar";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { FiEdit3 } from "react-icons/fi";
import { useState, useEffect } from "react";
import { auth, singInWithGoogle } from "../firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    displayName,
    sendPasswordResetEmail,
    getAuth,
    updateEmail
} from "firebase/auth";


const UserPage = () => {
    const {
        user, setUser,
        userData, setUserData,

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

    const [notice, setNotice] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                window.location.href = '/';
            } else {
                console.log(currentUser);
                const displayName = currentUser.displayName;
                const data = JSON.parse(displayName);
                setUsername(data.username);
                setGender(data.gender);
                setBirthday(data.birthday);
                setEmail(currentUser.email);
                setPassword(currentUser.password);
            }
        });

        return () => unsubscribe();
    }, []);

    // if (!currentUser) {
    //     return <div>Loading...</div>;
    // }

    const handleResetPassword = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setNotice('信件已寄出');
                console.log('Password reset email sent');
            }).catch((error) => {
                setNotice(error.message.split('/')[1].split(')')[0]);
                console.log(error.message);
            });
    };


    const [newUsername, setNewUsername] = useState("");
    const [newGender, setNewGender] = useState("");
    const [newBirthday, setNewBirthday] = useState("");

    const updateUsername = async () => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (newUsername.trim() == "") {
                return;
            } else {
                const newdata = {
                    username: newUsername,
                    gender: gender,
                    birthday: birthday
                };
                updateProfile(currentUser, { displayName: JSON.stringify(newdata) })
                    .then(() => {
                        console.log('ok');
                        localStorage.setItem('username', newUsername);
                        setIsEditingName(false);
                        setUsername(newUsername);
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                // localStorage.setItem('username', newUsername);
                // setIsEditingBirthday(false);
                // setBirthday(newUsername);
            }
        })

    }

    const updateGender = async () => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (newGender == "") {
                return;
            } else {
                const newdata = {
                    username: username || localStorage.getItem("username"),
                    gender: newGender,
                    birthday: birthday
                };
                updateProfile(currentUser, { displayName: JSON.stringify(newdata) })
                    .then(() => {
                        console.log('ok');
                        localStorage.setItem('gender', newGender);
                        setIsEditingGender(false);
                        setGender(newGender);
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                // localStorage.setItem('gender', newGender);
                // setIsEditingBirthday(false);
                // setBirthday(newGender);
            }
        })
    }

    const updateBirthday = async () => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (newBirthday == "") {
                return;
            } else {
                const newdata = {
                    username: username || localStorage.getItem("username"),
                    gender: gender,
                    birthday: newBirthday
                };
                updateProfile(currentUser, { displayName: JSON.stringify(newdata) })
                    .then(() => {
                        console.log('ok');
                        localStorage.setItem('birthday', newBirthday);
                        setIsEditingBirthday(false);
                        setBirthday(newBirthday);
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                // localStorage.setItem('birthday', newBirthday);
                // setIsEditingBirthday(false);
                // setBirthday(newBirthday);
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="keeperContainer2">
                <div></div>
                <div className="kb2">
                    <div className="userbg">
                        Welcome, {username} !
                    </div>
                </div>
                <div></div>
            </div>
            <div className="trackerContainer">
                <div></div>
                <div className="userbd1">
                    <div className="userbd2">
                        <div className="userbd3">
                            <div className="ut">PROFILE</div>
                            <div className="ut2">
                                <div className="userTitle">
                                    名稱
                                </div>
                                <div className="userInfo">
                                    {isEditingName ? (
                                        <>
                                            <input
                                                className="userEdit"
                                                type="text"
                                                placeholder="請輸入新名稱"
                                                required={true} minLength={1} maxLength={10}
                                                onChange={event => setNewUsername(event.target.value)}
                                            />
                                            <button className="btntick" onClick={updateUsername}>✔</button>
                                        </>
                                    ) : (
                                        <>
                                            <span>{username || localStorage.getItem("username")}</span>
                                            <FiEdit3 className="editicon2" size={20} onClick={() => setIsEditingName(true)} />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="ut2">
                                <div className="userTitle">
                                    性別
                                </div>
                                <div className="userInfo">
                                    {isEditingGender ? (
                                        <>
                                            <select className="userEdit"
                                                placeholder="select gender"
                                                onChange={event => setNewGender(event.target.value)}>
                                                <option value="">請選擇性別</option>
                                                <option value="男" default>男</option>
                                                <option value="女">女</option>
                                            </select>
                                            <button className="btntick" onClick={updateGender}>✔</button>
                                        </>
                                    ) : (
                                        <>
                                            <span>{gender || localStorage.getItem("gender")}</span>
                                            <FiEdit3 className="editicon2" size={20} onClick={() => setIsEditingGender(true)} />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="ut2">
                                <div className="userTitle">
                                    生日
                                </div>
                                <div className="userInfo">
                                    {isEditingBirthday ? (
                                        <>
                                            <input
                                                className="userEdit"
                                                type="date"
                                                min="1930-01-01" max={new Date().toISOString().split("T")[0]}
                                                onChange={event => setNewBirthday(event.target.value)}>
                                            </input>
                                            <button className="btntick" onClick={updateBirthday}>✔</button>
                                        </>
                                    ) : (
                                        <>
                                            <span>{birthday || localStorage.getItem("birthday")}</span>
                                            <FiEdit3 className="editicon2" size={20} onClick={() => setIsEditingBirthday(true)} />
                                        </>

                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="userbd3">
                            <div className="ut">ACCOUNT</div>
                            <div className="ut2">
                                <div className="userTitle">
                                    電子信箱
                                </div>
                                <div className="userInfo">
                                    {/* {isEditingEmail ? (
                                        <>
                                            <input
                                                className="userEdit"
                                                type="text"
                                                placeholder={email}
                                                onChange={event => setNewEmail(event.target.value)}
                                                required
                                            />
                                            <button className="btntick" onClick={updateUserEmail}>✔</button>
                                        </>
                                    ) : (
                                        <> */}
                                    <span>{email || localStorage.getItem("email")}</span>
                                    {/* <FiEdit3 className="editicon2" size={20} onClick={() => setIsEditingEmail(true)} />
                                        </>
                                    )} */}
                                </div>
                            </div>
                            <div className="ut2">
                                <div className="userTitle">
                                    密碼
                                </div>
                                <button className="resetbtn" onClick={handleResetPassword}>重設密碼</button>
                                <label className="notice">{notice}</label>
                            </div>
                            <div className="ut2">
                                <div className="userTitle">
                                    connect with google
                                </div>
                                <img className="connectbtn" src={localStorage.getItem("pic") || "https://cdn-icons-png.flaticon.com/512/179/179376.png"} />

                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default UserPage;