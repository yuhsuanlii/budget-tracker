import React from "react";
import '../style/loginForm.css';
import NavbarCover from "./navbarCover";
import Navbar from "./navbar";
import { useBudgetTracker } from "../hooks/useBudgetTracker";
import { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, displayName, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth, singInWithGoogle } from "../firebase";

const LoginForm = () => {

    const {

        user, setUser,
        showLoginForm, setShowLoginForm,
        showLogin, setShowLogin
        
    } = useBudgetTracker();

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleSignupClick = () => {
        setShowLogin(false);
    };

    // firebase auth

    const [signupUsername, setSignupUsername] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupGender, setSignupGender] = useState("");
    const [signupBirthday, setSignupBirthday] = useState("");

    const [loginEmail, setLoginEmail] = useState("test@test.com");
    const [loginPassword, setLoginPassword] = useState("test1234");

    const [signupNotice, setSignupNotice] = useState("");
    const [loginNotice, setLoginNotice] = useState("");

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setLoginNotice("登入成功")
                // console.log(currentUser);
                setLoggedIn(true);
                setShowLoginForm(false);
                // window.location.href = '/keeper';
            } else {
                console.log(currentUser);
                setLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const signup = async () => {
        if (!signupUsername || !signupGender || !signupBirthday) {
            setSignupNotice("請輸入所有欄位");
        } else {
            try {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    signupEmail,
                    signupPassword
                );

                console.log(user);

                const userData = {
                    username: signupUsername,
                    gender: signupGender,
                    birthday: signupBirthday
                };

                // const username = userData.username;
                // const email = userData.email;
                // const gender = userData.gender;
                // const birthday = userData.birthday;

                // localStorage.setItem("username", username);
                // localStorage.setItem("email", email);
                // localStorage.setItem("gender", gender);
                // localStorage.setItem("birthday", birthday);

                await updateProfile(user.user, {
                    displayName: JSON.stringify(userData)
                });

                console.log(user.user);
                console.log(userData);
                setSignupNotice("註冊成功");
                window.location.href = '/keeper';
            } catch (error) {
                setSignupNotice(error.message.split('/')[1].split(')')[0]);
                console.log(error.message);
            }
        }
    }

    const login = async () => {

        if (!loginEmail || !loginPassword) {
            setLoginNotice("請輸入所有欄位");
        } else {
            try {
                const user = await signInWithEmailAndPassword(
                    auth,
                    loginEmail,
                    loginPassword
                );

                console.log(user);
                console.log(signupUsername, signupGender, signupBirthday);
                setLoginNotice("登入成功")
                window.location.href = '/keeper';
            } catch (error) {
                setLoginNotice(error.message.split('/')[1].split(')')[0]);
                console.log(error.message);
            }
        }
    }

    const logout = async () => {
        localStorage.clear();
        await signOut(auth);
        window.location.href = '/';
    }

    const handleResetPassword = () => {
        if (!loginEmail) {
            setLoginNotice("請輸入電子信箱");
        } else {
            const auth = getAuth();
            sendPasswordResetEmail(auth, loginEmail)
                .then(() => {
                    setLoginNotice('重設密碼信件已寄出');
                    console.log('Password reset email sent');
                }).catch((error) => {
                    setLoginNotice(error.message.split('/')[1].split(')')[0]);
                    console.log(error.message);
                });
        }
    };

    return (
        <div>
            {loggedIn ? (
                <Navbar />
            ) : (
                <NavbarCover />
            )}
            <div className="keeperContainer">
                <div></div>
                <div className="kb">
                    <span className="projectName">
                    </span>
                    {loggedIn ? (
                        // 已登入
                        <>
                            <button className="lbtn" onClick={logout}>
                                登出系統
                            </button>
                        </>
                    ) : (
                        // 未登入
                        <>
                            <button className="lbtn" onClick={() => setShowLoginForm(!showLoginForm)}>
                                {showLoginForm ? '關閉介面' : '點此登入'}
                            </button>
                        </>
                    )}

                    {showLoginForm && (
                        <>
                            {showLogin ? (
                                <>
                                    <div className="kform2">
                                        <div className="login">
                                            <button className="loginbtn" onClick={handleLoginClick}>login</button>
                                        </div>
                                        <div className="signup">
                                            <button className="signupbtn" onClick={handleSignupClick}>signup</button>
                                        </div>
                                        <div>
                                            {/* 登入表單 */}

                                            <input
                                                type="email"
                                                className="loginEmail"
                                                placeholder="電子信箱"
                                                value={loginEmail}
                                                onChange={(event) => setLoginEmail(event.target.value)}
                                                required
                                            />
                                            <div className="pw">
                                                <div></div>
                                                <input
                                                    type="password"
                                                    className="loginPassword"
                                                    placeholder="密碼"
                                                    value={loginPassword}
                                                    onChange={(event) => setLoginPassword(event.target.value)}
                                                    required
                                                />
                                                <button className="rpbtn" onClick={handleResetPassword}>忘記密碼</button>
                                                <div></div>
                                            </div>
                                            <button className="loginFormBtn" onClick={login}>登入</button>
                                            <div className="notice">{loginNotice}</div>

                                            <div className="dashlogin"></div>
                                            <div className="loginThird">
                                                <div className="loginWith">or login with </div>
                                                <div className="loginGoogle" onClick={singInWithGoogle}>
                                                    <FcGoogle size={30} className='iconG' />
                                                </div>
                                            </div>
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
                                            {/* 註冊表單 */}

                                            <div className="signupLayout">
                                                <div></div>
                                                <input
                                                    className="signupUsername"
                                                    type="text"
                                                    // value={username}
                                                    placeholder="名稱"
                                                    required={true} minLength={1} maxLength={10}
                                                    onChange={(event) => setSignupUsername(event.target.value)}
                                                />
                                                <select
                                                    className="signupGender"
                                                    value={signupGender}
                                                    placeholder="性別"
                                                    onChange={(event) => setSignupGender(event.target.value)}>
                                                    <option value="">性別</option>
                                                    <option value="男">男</option>
                                                    <option value="女">女</option>
                                                </select>
                                                <div></div>
                                            </div>
                                            <input
                                                className="signupBirthday"
                                                placeholder="生日"
                                                type="date"
                                                min="" max={new Date().toISOString().split("T")[0]}
                                                onChange={(event) => setSignupBirthday(event.target.value)}>
                                            </input>
                                            <input
                                                type="email"
                                                className="signupEmail"
                                                placeholder="電子信箱"
                                                // value={email}
                                                onChange={(event) => setSignupEmail(event.target.value)}
                                                required
                                            />
                                            <input
                                                type="password"
                                                className="signupPassword"
                                                placeholder="密碼(至少6位)"
                                                // value={password}
                                                onChange={(event) => setSignupPassword(event.target.value)}
                                                required
                                            />
                                            <button className="loginFormBtn" onClick={signup}>註冊</button>
                                            {/* <div>{user?.email}</div> */}
                                            <div className="notice">{signupNotice}</div>
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