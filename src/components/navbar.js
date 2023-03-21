import React from "react";
import '../style/navbar.css';
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiBook } from "react-icons/bi";
import { AiOutlineBarChart } from "react-icons/ai";
import { IoMdPower } from "react-icons/io";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {

    const logout = async () => {
        localStorage.clear();
        await signOut(auth);
        window.location.href = '/';
    }

    return (
        <div>
            <div>
                <nav class="navbar">
                    <ul class="navbar-nav">
                        <li class="logo">
                            <label class="nav-link">
                                <Link to="/" className="link">
                                    <span class="link-text"><span className="username">MENU</span></span>
                                </Link>
                                <RxHamburgerMenu size={30} color="#000" />
                            </label>
                        </li>

                        <Link to="/user" className="link">
                            <label class="nav-link">
                                <CgProfile size={30} />
                                <span class="link-text">USER</span>
                            </label>
                        </Link>

                        <Link to="/keeper" className="link">
                            <label class="nav-link">
                                <BiBook size={30} />
                                <span class="link-text">KEEPER</span>
                            </label>
                        </Link>

                        <Link to="/tracker" className="link">
                            <label class="nav-link">
                                <HiOutlineClipboardDocumentList size={30} />
                                <span class="link-text">TRACKER</span>
                            </label>
                        </Link>

                        <Link to="/chart" className="link">
                            <label class="nav-link">
                                <AiOutlineBarChart size={30} />
                                <span class="link-text">CHART</span>
                            </label>
                        </Link>

                        <div className="link" onClick={logout}>
                            <label class="nav-link">
                                <IoMdPower size={30} />
                                <span class="link-text">LOGOUT</span>
                            </label>
                        </div>

                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;