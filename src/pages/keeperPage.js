import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style/keeperPage.css';
import Navbar from "../components/navbar";
import KeeperForm from "../components/keeperForm";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, where, query, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";


const KeeperPage = () => {

    const {
        firstDay, setFirstDay,
        lastDay, setLastDay,

        uid, setUid,
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

        costApparel, setCostApparel,
        costHousing, setCostHousing,
        costEducate, setCostEducate,
        costSavings, setCostSavings,

        earnSalary, setEarnSalary,
        earnStock, setEarnStock,
        earnGift, setEarnGift,
        earnOther, setEarnOther } = useBudgetTracker();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                window.location.href = '/';
            } else {
                // console.log(currentUser.uid);
                localStorage.setItem("uid", currentUser.uid);
            }
        });

        // onSnapshot(collection(db, "keeper"), (snapshot) => {
        //     setExpenses(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        // });

        return () => unsubscribe();
    }, []);

    // function handleUpdate(expense) {
    //     setExpenses(
    //         expenses.map(e => (e.id === expense.id ? { ...e, amount: '', description: '', category: '', date: '' } : e))
    //     );
    //     setExpenses(expenses.filter(e => e.id !== expense.id));


    //     if (expense.category.type === '??????') {
    //         setTotalIncome(totalIncome - expense.amount);
    //     } else {
    //         setTotalExpense(totalExpense - expense.amount);
    //         if (expense.category.type === '??????' && expense.category.subType === '??????') {
    //             setCostFood(costFood - expense.amount);
    //         }
    //         if (expense.category.type === '??????' && expense.category.subType === '??????') {
    //             setCostTraffic(costTraffic - expense.amount);
    //         }
    //         if (expense.category.type === '??????' && expense.category.subType === '??????') {
    //             setCostPlay(costPlay - expense.amount);
    //         }
    //         if (expense.category.type === '??????' && expense.category.subType === '??????') {
    //             setCostOther(costOther - expense.amount);
    //         }
    //     }



    //     setAmount(expense.amount);
    //     setDescription(expense.description);
    //     setCategory(expense.category);
    //     setShowForm(true);
    // }

    // function handleDelete(expense) {
    //     setExpenses(expenses.filter(e => e.id !== expense.id));

    //     if (expense.category.type === '??????') {
    //         setTotalIncome(totalIncome - expense.amount);
    //     } else {
    //         setTotalExpense(totalExpense - expense.amount);
    //         if (expense.category.type === '??????' && expense.category.subType === '??????') {
    //             setCostFood(costFood - expense.amount);
    //         }
    //         if (expense.category.type === '??????' && expense.category.subType === '??????') {
    //             setCostTraffic(costTraffic - expense.amount);
    //         }
    //         if (expense.category.type === '??????' && expense.category.subType === '??????') {
    //             setCostPlay(costPlay - expense.amount);
    //         }
    //         if (expense.category.type === '??????' && expense.category.subType === '??????') {
    //             setCostOther(costOther - expense.amount);
    //         }
    //     }
    // }


    const fd = localStorage.getItem("firstDay");
    const ld = localStorage.getItem("lastDay");
    // const getTotal = (category) => {
    //     const q = query(
    //         collection(db, 'keeper'),
    //         where('uid', '==', localStorage.getItem("uid")),
    //         where('category', '==', category),
    //         where('date', '>=', fd),
    //         where('date', '<=', ld),
    //     );
    //     onSnapshot(q, (snapshot) => {
    //         const totalAmount = snapshot.docs.reduce((acc, doc) => acc + doc.data().amount, 0);
    //         console.log(`Total ${category} for March 2023: $${totalAmount}`);
    //         localStorage.setItem(`total${category}`, totalAmount);
    //     });
    // }

    // useEffect(() => {
    //     getTotal("??????");
    //     getTotal("??????");
    // }, [fd, ld]);

    const fetchTotalCost = (subCategory, setCost) => {
        const q = query(
            collection(db, 'keeper'),
            where('uid', '==', localStorage.getItem("uid")),
            where('category', '==', "??????"),
            where('subCategory', '==', subCategory),
            where('date', '>=', fd),
            where('date', '<=', ld),
        );
        onSnapshot(q, (snapshot) => {
            const totalCost = snapshot.docs.reduce((acc, doc) => acc + doc.data().amount, 0);
            localStorage.setItem(`cost${subCategory}`, totalCost);
            setCost(totalCost)
        });
    };

    const fetchTotalEarn = (subCategory, setEarn) => {
        const q = query(
            collection(db, 'keeper'),
            where('uid', '==', localStorage.getItem("uid")),
            where('category', '==', "??????"),
            where('subCategory', '==', subCategory),
            where('date', '>=', fd),
            where('date', '<=', ld),
        );
        onSnapshot(q, (snapshot) => {
            const totalEarn = snapshot.docs.reduce((acc, doc) => acc + doc.data().amount, 0);
            localStorage.setItem(`earn${subCategory}`, totalEarn);
            setEarn(totalEarn)
        });
    };

    useEffect(() => {
        fetchTotalCost('??????', setCostFood);
        fetchTotalCost('??????', setCostTraffic);
        fetchTotalCost('??????', setCostPlay);
        fetchTotalCost('??????', setCostOther);
        fetchTotalCost('??????', setCostApparel);
        fetchTotalCost('??????', setCostHousing);
        fetchTotalCost('??????', setCostEducate);
        fetchTotalCost('??????', setCostSavings);
    }, [fd, ld, costFood, costTraffic, costPlay, costOther,
        costApparel, costHousing, costEducate, costSavings, localStorage.getItem("uid")]);

    useEffect(() => {
        fetchTotalEarn('??????', setEarnSalary);
        fetchTotalEarn('??????', setEarnStock);
        fetchTotalEarn('??????', setEarnGift);
        fetchTotalEarn('??????', setEarnOther);
    }, [fd, ld, earnSalary, earnStock, earnGift, earnOther, localStorage.getItem("uid")]);

    useEffect(() => {
        // totalExpense
        const q = query(
            collection(db, 'keeper'),
            where('uid', '==', localStorage.getItem("uid")),
            where('category', '==', "??????"),
            where('date', '>=', fd),
            where('date', '<=', ld),
        );
        onSnapshot(q, (snapshot) => {
            // setExpenses(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            const totalExpense = snapshot.docs.reduce((acc, doc) => acc + doc.data().amount, 0);
            // console.log(`Total expenses for March 2023: $${totalExpense}`);
            localStorage.setItem("totalExpense", totalExpense);
            setTotalExpense(totalExpense)
        });

        // totalIncome
        const q1 = query(
            collection(db, 'keeper'),
            where('uid', '==', localStorage.getItem("uid")),
            where('category', '==', "??????"),
            where('date', '>=', fd),
            where('date', '<=', ld),
        );
        onSnapshot(q1, (snapshot1) => {
            // setExpenses(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            const totalIncome = snapshot1.docs.reduce((acc, doc) => acc + doc.data().amount, 0);
            // console.log(`Total income for March 2023: $${totalIncome}`);
            localStorage.setItem("totalIncome", totalIncome);
            setTotalIncome(totalIncome)
        });

        // const q3 = query(
        //     collection(db, 'keeper'),
        //     where('uid', '==', localStorage.getItem("uid")),
        //     where('category', '==', "??????"),
        //     where('subCategory', '==', "??????"),
        //     where('date', '>=', fd),
        //     where('date', '<=', ld),
        // );
        // onSnapshot(q3, (snapshot) => {
        //     const costFood = snapshot.docs.reduce((acc, doc) => acc + doc.data().amount, 0);
        //     localStorage.setItem("costFood", costFood);
        //     setCostFood(costFood)
        // });

    }, [fd, ld, totalExpense, totalIncome, localStorage.getItem("uid")]);

    useEffect(() => {
        const docId = localStorage.getItem('firstDay') + localStorage.getItem('uid');
        const totalRef = doc(db, "total", docId);
        const totalExpense = parseInt(localStorage.getItem('totalExpense'));
        const totalIncome = parseInt(localStorage.getItem('totalIncome'));
        const costFood = parseInt(localStorage.getItem('cost??????'));
        const costTraffic = parseInt(localStorage.getItem('cost??????'));
        const costPlay = parseInt(localStorage.getItem('cost??????'));
        const costOther = parseInt(localStorage.getItem('cost??????'));
        const costApparel = parseInt(localStorage.getItem('cost??????'));
        const costHousing = parseInt(localStorage.getItem('cost??????'));
        const costEducate = parseInt(localStorage.getItem('cost??????'));
        const costSavings = parseInt(localStorage.getItem('cost??????'));
        const earnStock = parseInt(localStorage.getItem('earn??????'));
        const earnGift = parseInt(localStorage.getItem('earn??????'));
        const earnOther = parseInt(localStorage.getItem('earn??????'));

        const payload = {
            totalExpense: totalExpense,
            totalIncome: totalIncome,
            costFood: costFood,
            costTraffic: costTraffic,
            costPlay: costPlay,
            costOther: costOther,
            costApparel: costApparel,
            costHousing: costHousing,
            costEducate: costEducate,
            costSavings: costSavings,
            earnSalary: earnSalary,
            earnStock: earnStock,
            earnGift: earnGift,
            earnOther: earnOther
        }
        updateDoc(totalRef, payload);
    }, [fd, ld, costFood, costTraffic, costPlay, costOther,
        costApparel, costHousing, costEducate, costSavings,
        localStorage.getItem("uid"), totalExpense, totalIncome]);


    const [listId, setListId] = useState("");

    const handleShowEdit = async (id, date, category, subCategory, amount, memo) => {
        setShowForm(false);
        setListId(id);
        setShowEditForm(!showEditForm);
        setDate(date);
        setCategory({ type: category, subType: subCategory });
        setAmount(amount);
        setDescription(memo);
    }

    const handleDayChange = async (event) => {
        const date1 = new Date(date);
        const firstDay = new Date(date1.getFullYear(), date1.getMonth(), 1);
        const lastDay = new Date(date1.getFullYear(), date1.getMonth() + 1, 0);

        setFirstDay(formatDate(firstDay));
        setLastDay(formatDate(lastDay))

        localStorage.setItem("firstDay", firstDay);
        localStorage.setItem("lastDay", lastDay);

        return setDate(event.target.value);
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        console.log(listId);

        if (!amount || isNaN(amount) || amount === "") {
            // ??????????????????????????????
            alert("???????????????");
            return;
        }
        if (!category.subType) {
            // ??????????????????????????????
            alert("???????????????");
            return;
        }
        if (category.type === '??????' && category.subType !== '??????' && category.subType !== '??????' && category.subType !== '??????' && category.subType !== '??????'
            && category.subType !== '??????' && category.subType !== '??????' && category.subType !== '??????' && category.subType !== '??????') {
            alert("???????????????");
            return;
        }
        if (category.type === '??????' && category.subType !== '??????' && category.subType !== '??????' && category.subType !== '??????' && category.subType !== '??????') {
            alert("???????????????");
            return;
        }

        const docRef = doc(db, "keeper", listId);
        const payload = {
            uid: localStorage.getItem("uid"),
            date: date,
            category: category.type,
            subCategory: category.subType,
            amount: parseInt(amount),
            memo: description
        }
        await setDoc(docRef, payload);

        setShowEditForm(false);
        setCategory({ type: '??????', subType: '' });
        setAmount('');
        setDescription('');
    }

    const handleDelete = async (id) => {
        const docRef = doc(db, "keeper", id);
        await deleteDoc(docRef);
    }

    return (
        <div>
            <Navbar />
            <KeeperForm />
            <div className="receiptContainer">
                <div></div>
                <div>
                    <div className="klist">
                        <div className="tab"></div>
                        {/* <div className="paid"><p>Receipt Paid successfully</p></div> */}
                        <div className="receipt">
                            <div className="paper">
                                <div className="title">Account Book</div>
                                {/* <button className="excel" onClick={handleSelect}>Export Excel</button> */}
                                <br /><br />
                                <div className="category">
                                    <span>??????</span>
                                    <span>??????</span>
                                    <span>??????</span>
                                    <span>??????</span>
                                    <span>??????</span>
                                    <span></span>
                                    <span></span>

                                </div>
                                <div className="table">
                                    <div>
                                        {/* <tr><td>2 x Coffee</td><td className="right">$10</td></tr>
                                        <tr><td>1 x Rice</td><td className="right">$30</td></tr>
                                        <tr><td>5 x Milk</td><td className="right">$90</td></tr> */}
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
                                                    <div className="date">&nbsp;{expense.date.split("-")[2]}</div>
                                                    <div>{expense.category}</div>
                                                    <div>{expense.subCategory}</div>
                                                    <div>${expense.amount}</div>
                                                    <div className="description">{expense.memo}&nbsp;</div>
                                                    <div>

                                                        {/*  */}
                                                        <FaPencilAlt size={25} color='#698269' className="listEdit"
                                                            onClick={() => handleShowEdit(expense.id, expense.date, expense.category, expense.subCategory, expense.amount, expense.memo)}>
                                                            {showEditForm ? "hi" : "hello"}
                                                        </FaPencilAlt>

                                                        {/*  */}
                                                    </div>
                                                    <div>
                                                        <FaTrashAlt className="listDelete" size={25} color='#AA5656' onClick={() => handleDelete(expense.id)} />
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
                                <div className="sign center">
                                    <span className="barcode">00020230223000</span>
                                    <br />
                                    <div className="thankyou">
                                        A penny saved is a penny earned
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>

            {showEditForm && (
                <div>
                    <div className="form">
                        <button className="closeWindow" onClick={() => setShowEditForm(false)}>X</button>
                        <form onSubmit={handleUpdate}>
                            <input
                                className="formDate"
                                type="date"
                                min="2020-01-01"
                                value={date}
                                onChange={handleDayChange} />
                            <br />
                            <select className="formCat" value={category.type} onChange={event => setCategory({ type: event.target.value, subType: category.subType })}>
                                <option value="??????">??????</option>
                                <option value="??????">??????</option>
                            </select>

                            {category.type === '??????' && (
                                <select className="formSub" value={category.subType} onChange={event => setCategory({ type: category.type, subType: event.target.value })}>
                                    <option value="">????????????</option>
                                    <option className="formOp" value="??????">??????</option>
                                    <option className="formOp" value="??????">??????</option>
                                    <option className="formOp" value="??????">??????</option>
                                    <option className="formOp" value="??????">??????</option>
                                    <option className="formOp" value="??????">??????</option>
                                    <option className="formOp" value="??????">??????</option>
                                    <option className="formOp" value="??????">??????</option>
                                    <option className="formOp" value="??????">??????</option>
                                </select>
                            )}
                            {category.type === '??????' && (
                                <select className="formSub" value={category.subType} onChange={event => setCategory({ type: category.type, subType: event.target.value })}>
                                    <option value="">????????????</option>
                                    <option className="formOp" value="??????">??????</option>
                                    <option className="formOp" value="??????">??????</option>
                                    <option className="formOp" value="??????">??????</option>
                                </select>
                            )}
                            <br />

                            <input
                                className="formNum"
                                type="text"
                                value={amount}
                                placeholder='??????'
                                minLength={1} maxLength={8}
                                onChange={event => setAmount(event.target.value)}
                                required
                            />

                            <textarea
                                className="formMemo"
                                type="text"
                                value={description}
                                placeholder='??????(0-10???)'
                                maxLength={10}
                                // value={description}
                                onChange={event => setDescription(event.target.value)}
                            />

                            <button className="formBtn2" type="submit">??????</button>
                            {/* <button type="button" onClick={() => setShowForm(false)}>??????</button> */}
                        </form>
                    </div>
                    <div className="formbkg"></div>
                </div>
            )}

        </div>
    )
}

export default KeeperPage;