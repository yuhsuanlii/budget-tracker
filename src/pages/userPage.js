import React from "react";
import '../style/userPage.css';
import Navbar from "../components/navbar";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { FiEdit3 } from "react-icons/fi";

const UserPage = () => {
    const {

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

    if (username == "") {
        setUsername('　');
    }

    if (gender == "") {
        setGender('男');
    }

    if (email == "") {
        setEmail('　');
    }
    if (password == "") {
        setPassword('　');
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
                                                value={username}
                                                placeholder="username"
                                                required={true} minLength={2} maxLength={10}
                                                onChange={event => setUsername(event.target.value)}
                                            />
                                            <button className="btntick" onClick={() => setIsEditingName(null)}>✔</button>
                                        </>
                                    ) : (
                                        <>
                                            <span>{username}</span>
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
                                            <select className="userEdit" value={gender} onChange={event => setGender(event.target.value)}>
                                                <option value="男">男</option>
                                                <option value="女">女</option>
                                            </select>
                                            <button className="btntick" onClick={() => setIsEditingGender(null)}>✔</button>
                                        </>
                                    ) : (
                                        <>
                                            <span>{gender}</span>
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
                                                type="date" id="start" name="trip-start"
                                                value={birthday}
                                                min="" max=""
                                                onChange={event => setBirthday(event.target.value)}>
                                            </input>
                                            <button className="btntick" onClick={() => setIsEditingBirthday(null)}>✔</button>
                                        </>
                                    ) : (
                                        <>
                                            <span>{birthday}</span>
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
                                    {isEditingEmail ? (
                                        <>
                                            <input
                                                className="userEdit"
                                                type="text"
                                                value={email}
                                                onChange={event => setEmail(event.target.value)}
                                                required
                                            />
                                            <button className="btntick" onClick={() => setIsEditingEmail(null)}>✔</button>
                                        </>
                                    ) : (
                                        <>
                                            <span>{email}</span>
                                            <FiEdit3 className="editicon2" size={20} onClick={() => setIsEditingEmail(true)} />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="ut2">
                                <div className="userTitle">
                                    密碼
                                </div>
                                <div className="userInfo">
                                    {isEditingPassword ? (
                                        <>
                                            <input
                                                className="userEdit"
                                                type="password"
                                                value={password}
                                                onChange={event => setPassword(event.target.value)}
                                                required
                                            />
                                            <button className="btntick" onClick={() => setIsEditingPassword(null)}>✔</button>
                                        </>
                                    ) : (
                                        <>
                                            <span>{password}</span>
                                            <FiEdit3 className="editicon2" size={20} onClick={() => setIsEditingPassword(true)} />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="ut2">
                                <div className="userTitle">
                                    connect with google
                                </div>
                                <button className="connectbtn">Disconnect</button>
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