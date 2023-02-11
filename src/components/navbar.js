import React from "react";
import '../style/navbar.css';
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiBook } from "react-icons/bi";
import { AiOutlineBarChart } from "react-icons/ai";
import { IoMdPower } from "react-icons/io";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";


const Navbar = () => {
    return (
        <div>
            <div>
                <nav class="navbar">
                    <ul class="navbar-nav">

                        <li class="logo">
                            <label class="nav-link">
                                <span class="link-text"><span className="username">MENU</span></span>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
                                </svg> */}
                                <RxHamburgerMenu size={30} color="#000" />
                            </label>
                        </li>

                        <Link to="/" className="link">
                            <label class="nav-link">
                                <CgProfile size={30} />
                                <span class="link-text">Portfolio</span>
                            </label>
                        </Link>

                        <Link to="/keeper" className="link">
                            <label class="nav-link">
                                <BiBook size={30} />
                                <span class="link-text">Keeper</span>
                            </label>
                        </Link>

                        <Link to="/tracker" className="link">
                            <label class="nav-link">
                                <HiOutlineClipboardDocumentList size={30} />
                                <span class="link-text">Tracker</span>
                            </label>
                        </Link>

                        <Link to="/" className="link">
                            <label class="nav-link">
                                <AiOutlineBarChart size={30} />
                                <span class="link-text">Chart</span>
                            </label>
                        </Link>


                        <Link to="/" className="link">
                            <label class="nav-link">
                                <IoMdPower size={30} />
                                <span class="link-text">Logout</span>
                            </label>
                        </Link>

                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;