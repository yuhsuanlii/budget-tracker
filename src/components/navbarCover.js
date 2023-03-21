import React from "react";
import '../style/navbar.css';
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { MdOutlineCreate } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useBudgetTracker } from "../hooks/useBudgetTracker";

const NavbarCover = () => {

    const { 
 
        showLoginForm, setShowLoginForm,
        showLogin, setShowLogin

     } = useBudgetTracker();

    const handleLoginClick2 = () => {
        setShowLoginForm(true);
        setShowLogin(true);
    };

    const handleSignupClick2 = () => {
        setShowLoginForm(true);
        setShowLogin(false);
    };

    return (
        <div>
            <div>
                <nav class="navbar">
                    <ul class="navbar-nav">
                        <li class="logo">
                            <label class="nav-link">
                                <Link to="/" className="link">
                                    <span class="link-text"><span className="username">HELLO</span></span>
                                </Link>
                                <RxHamburgerMenu size={30} color="#000" />
                            </label>
                        </li>

                        <div className="link2" onClick={handleLoginClick2}>
                            <label class="nav-link">
                                <IoMdLogIn size={30} />
                                <span class="link-text">LOGIN</span>
                            </label>
                        </div>

                        <div className="link2" onClick={handleSignupClick2}>
                            <label class="nav-link">
                                <MdOutlineCreate size={30} />
                                <span class="link-text">SINGUP</span>
                            </label>
                        </div>

                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default NavbarCover;