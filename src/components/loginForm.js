import React from "react";
import '../style/loginForm.css';
import NavbarCover from "./navbarCover";
import { useBudgetTracker } from "../hooks/useBudgetTracker";
import { useState } from 'react';

const LoginForm = () => {

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
        costOther, setCostOther,

        showLogin, setShowLogin

    } = useBudgetTracker();

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     if (!amount) {
    //         // 使用者輸入欄不能為空
    //         alert("請輸入金額");
    //         return;
    //     }
    //     if (!category.subType) {
    //         // 使用者輸入欄不能為空
    //         alert("請選擇類別");
    //         return;
    //     }

    //     if (category.type === '支出' && category.subType !== '飲食' && category.subType !== '交通' && category.subType !== '娛樂' && category.subType !== '其他') {
    //         alert("請選擇類別");
    //         return;
    //     }

    //     if (category.type === '收入' && category.subType !== '薪資' && category.subType !== '獲利' && category.subType !== '其他') {
    //         alert("請選擇類別");
    //         return;
    //     }

    //     // 繼續提交表單
    //     setExpenses([
    //         ...expenses,
    //         { id: expenses.length + 1, amount: parseInt(amount), description, category, date }
    //     ]);

    //     if (category.type === '收入') {
    //         setTotalIncome(totalIncome + parseInt(amount));
    //     } else {
    //         setTotalExpense(totalExpense + parseInt(amount));
    //     }

    //     if (category.type === '支出' && category.subType === '飲食') {
    //         setCostFood(costFood + parseInt(amount));
    //     }
    //     if (category.type === '支出' && category.subType === '交通') {
    //         setCostTraffic(costTraffic + parseInt(amount));
    //     }
    //     if (category.type === '支出' && category.subType === '娛樂') {
    //         setCostPlay(costPlay + parseInt(amount));
    //     }
    //     if (category.type === '支出' && category.subType === '其他') {
    //         setCostOther(costOther + parseInt(amount));
    //     }

    //     setAmount('');
    //     setDescription('');
    //     setCategory({ type: '支出', subType: '' });
    //     // setShowForm(false);
    // }

    // const [showLogin, setShowLogin] = useState(true);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleSignupClick = () => {
        setShowLogin(false);
    };

    // const [isLogin, setIsLogin] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isLogin) {
            // 登入處理邏輯
            console.log('登入', email, password);
        } else {
            // 註冊處理邏輯
            console.log('註冊', email, password, confirmPassword);
        }
    };

    const handleToggle = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div>
            <NavbarCover />
            <div className="keeperContainer">
                <div></div>
                <div className="kb">
                    <span className="projectName">
                        Budget Tracker
                    </span>
                    <button className="kbtn" onClick={() => setShowLoginForm(!showLoginForm)}>
                        {showLoginForm ? '關閉介面' : '點此登入'}
                    </button>

                    {/* {showLoginForm && (
                        < div className="kform">
                            <h1>{isLogin ? '登入' : '註冊'}</h1>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {!isLogin && (
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password:</label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                )}
                                <button type="submit">{isLogin ? '登入' : '註冊'}</button>
                            </form>
                            <p>
                                {isLogin ? '還沒有帳號？' : '已經有帳號？'}
                                <button type="button" onClick={handleToggle}>
                                    {isLogin ? '註冊' : '登入'}
                                </button>
                            </p>

                        </div>
                    )} */}

                    {showLoginForm && (
                        <>
                            {showLogin ? (
                                <>
                                    <div className="kform2">
                                        <div className="login">
                                            <button className="loginbtn" onClick={handleLoginClick}>login</button>
                                        </div>
                                        <div className="signup">
                                            <button className="signupbtn" onClick={handleSignupClick}>signup</button>                                </div>
                                        <div>
                                            {/* <h1>登入</h1> */}
                                            {/* 登入表單 */}

                                        </div>
                                    </div>
                                    <div className="formbkg"></div>
                                </>
                            ) : (
                                <>
                                    <div className="kform3">
                                        <div className="login">
                                            <button className="loginbtn" onClick={handleLoginClick}>login</button>
                                        </div>
                                        <div className="signup">
                                            <button className="signupbtn" onClick={handleSignupClick}>
                                                signup
                                            </button>
                                        </div>
                                        <div>
                                            {/* <h1>註冊</h1> */}
                                            {/* 註冊表單 */}

                                        </div>
                                    </div>
                                    <div className="formbkg"></div>
                                </>
                            )}
                        </>
                    )}
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;