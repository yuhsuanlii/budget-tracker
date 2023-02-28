import React from "react";
import '../style/keeperPage.css';
import Navbar from "../components/navbar";
import KeeperForm from "../components/keeperForm";
import { Link } from "react-router-dom";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { FaBarcode, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";

const KeeperPage = () => {

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
                console.log(currentUser.uid);
                const q = query(
                    collection(db, 'keeper'),
                    where('uid', '==', currentUser.uid)
                );
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    setExpenses(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                });
                return unsubscribe;
            }
        });

        // onSnapshot(collection(db, "keeper"), (snapshot) => {
        //     setExpenses(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        // });

        return () => unsubscribe();
    }, []);

    function handleUpdate(expense) {
        setExpenses(
            expenses.map(e => (e.id === expense.id ? { ...e, amount: '', description: '', category: '', date: '' } : e))
        );
        setExpenses(expenses.filter(e => e.id !== expense.id));


        if (expense.category.type === '收入') {
            setTotalIncome(totalIncome - expense.amount);
        } else {
            setTotalExpense(totalExpense - expense.amount);
            if (expense.category.type === '支出' && expense.category.subType === '飲食') {
                setCostFood(costFood - expense.amount);
            }
            if (expense.category.type === '支出' && expense.category.subType === '交通') {
                setCostTraffic(costTraffic - expense.amount);
            }
            if (expense.category.type === '支出' && expense.category.subType === '娛樂') {
                setCostPlay(costPlay - expense.amount);
            }
            if (expense.category.type === '支出' && expense.category.subType === '其他') {
                setCostOther(costOther - expense.amount);
            }
        }



        setAmount(expense.amount);
        setDescription(expense.description);
        setCategory(expense.category);
        setShowForm(true);
    }

    function handleDelete(expense) {
        setExpenses(expenses.filter(e => e.id !== expense.id));

        if (expense.category.type === '收入') {
            setTotalIncome(totalIncome - expense.amount);
        } else {
            setTotalExpense(totalExpense - expense.amount);
            if (expense.category.type === '支出' && expense.category.subType === '飲食') {
                setCostFood(costFood - expense.amount);
            }
            if (expense.category.type === '支出' && expense.category.subType === '交通') {
                setCostTraffic(costTraffic - expense.amount);
            }
            if (expense.category.type === '支出' && expense.category.subType === '娛樂') {
                setCostPlay(costPlay - expense.amount);
            }
            if (expense.category.type === '支出' && expense.category.subType === '其他') {
                setCostOther(costOther - expense.amount);
            }
        }
    }


    return (
        <div>
            <Navbar />
            <KeeperForm />
            <div className="receiptContainer">
                <div></div>
                <div>
                    <div class="klist">
                        <div class="tab"></div>
                        {/* <div class="paid"><p>Receipt Paid successfully</p></div> */}
                        <div class="receipt">
                            <div class="paper">
                                <div class="title">Account Book</div>
                                {/* <button class="excel">Export Excel</button> */}
                                <br /><br />
                                <div className="category">
                                    <span>日期</span>
                                    <span>項目</span>
                                    <span>類別</span>
                                    <span>金額</span>
                                    <span>備註</span>
                                    <span></span>
                                    <span></span>

                                </div>
                                <div className="table">
                                    <div>
                                        {/* <tr><td>2 x Coffee</td><td class="right">$10</td></tr>
                                        <tr><td>1 x Rice</td><td class="right">$30</td></tr>
                                        <tr><td>5 x Milk</td><td class="right">$90</td></tr> */}
                                        {/* <ul> */}
                                        {/* {expenses.map((expense, index) => (
                                                <li key={index} className="lilist">
                                                    <div className="list">
                                                        <div>{expense.date.substring(8, 10)}</div>
                                                        <div>{expense.category.type}</div>
                                                        <div>{expense.category.subType}</div>
                                                        <div>${expense.amount}</div>
                                                        <div className="description">{expense.description}</div>
                                                        <div><FaPencilAlt className="listEdit" size={25} color='#698269' onClick={() => handleUpdate(expense)} /></div>
                                                        <div>
                                                            <FaTrashAlt className="listDelete" size={25} color='#AA5656' onClick={() => handleDelete(expense)} />
                                                        </div>
                                                    </div>
                                                </li>

                                            ))} */}

                                        {expenses.map((expense) => (
                                            <li key={expense.id} className="lilist">
                                                <div className="list">
                                                    <div>&nbsp;{expense.date.split("-")[2]}</div>
                                                    <div>{expense.category}</div>
                                                    <div>{expense.subCategory}</div>
                                                    <div>${expense.amount}</div>
                                                    <div className="description">{expense.memo}</div>
                                                    <div>
                                                        <FaPencilAlt className="listEdit" size={25} color='#698269' />
                                                    </div>
                                                    <div>
                                                        <FaTrashAlt className="listDelete" size={25} color='#AA5656' />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                        {/* </ul> */}
                                    </div>

                                    <div className="tnbtn">
                                        <Link to="/tracker">
                                            <input className="" type="button" value="Track Now" />
                                        </Link>
                                    </div>

                                </div>
                                <div class="sign center">
                                    <span className="barcode">00020230223000</span>
                                    <br />
                                    <div class="thankyou">
                                        A penny saved is a penny earned
                                    </div>
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

export default KeeperPage;