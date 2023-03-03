import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style/keeperPage.css';
import Navbar from "../components/navbar";
import KeeperForm from "../components/keeperForm";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, where, query, setDoc, doc, deleteDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";


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
                console.log(currentUser.uid);
                localStorage.setItem("uid", currentUser.uid);
            }
        });

        // onSnapshot(collection(db, "keeper"), (snapshot) => {
        //     setExpenses(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        // });

        return () => unsubscribe();
    }, []);

    // console.log(expenses.map(doc => ({ id: doc.id })));


    // function handleUpdate(expense) {
    //     setExpenses(
    //         expenses.map(e => (e.id === expense.id ? { ...e, amount: '', description: '', category: '', date: '' } : e))
    //     );
    //     setExpenses(expenses.filter(e => e.id !== expense.id));


    //     if (expense.category.type === '收入') {
    //         setTotalIncome(totalIncome - expense.amount);
    //     } else {
    //         setTotalExpense(totalExpense - expense.amount);
    //         if (expense.category.type === '支出' && expense.category.subType === '飲食') {
    //             setCostFood(costFood - expense.amount);
    //         }
    //         if (expense.category.type === '支出' && expense.category.subType === '交通') {
    //             setCostTraffic(costTraffic - expense.amount);
    //         }
    //         if (expense.category.type === '支出' && expense.category.subType === '娛樂') {
    //             setCostPlay(costPlay - expense.amount);
    //         }
    //         if (expense.category.type === '支出' && expense.category.subType === '其他') {
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

    //     if (expense.category.type === '收入') {
    //         setTotalIncome(totalIncome - expense.amount);
    //     } else {
    //         setTotalExpense(totalExpense - expense.amount);
    //         if (expense.category.type === '支出' && expense.category.subType === '飲食') {
    //             setCostFood(costFood - expense.amount);
    //         }
    //         if (expense.category.type === '支出' && expense.category.subType === '交通') {
    //             setCostTraffic(costTraffic - expense.amount);
    //         }
    //         if (expense.category.type === '支出' && expense.category.subType === '娛樂') {
    //             setCostPlay(costPlay - expense.amount);
    //         }
    //         if (expense.category.type === '支出' && expense.category.subType === '其他') {
    //             setCostOther(costOther - expense.amount);
    //         }
    //     }
    // }

    // useEffect(() => {

    //     const startDate = new Date(date);
    //     startDate.setDate(1);

    //     console.log(startDate)

    //     const endDate = new Date(date);
    //     endDate.setMonth(endDate.getMonth() + 1);
    //     endDate.setDate(0);

    //     const q = query(
    //         collection(db, 'keeper'),
    //         where('uid', '==', localStorage.getItem("uid")),
    //         // where('category', '==', "收入"),
    //         where('date', '>=', date),
    //         where('date', '<=', endDate)
    //     );
    //     const unsubscribe = onSnapshot(q, (snapshot) => {
    //         setExpenses(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //     });
    //     return unsubscribe;
    // }, []);
    // const formatDate = (date) => {
    //     const year = date.getFullYear();
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //     const day = date.getDate().toString().padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // }

    const handleSelect = async () => {

        const fd = localStorage.getItem("firstDay");
        const ld = localStorage.getItem("lastDay");
        // const startDate = formatDate(startOfMonth(new Date(2023, 2))) ; // March 1st, 2023
        // const endDate = formatDate(endOfMonth(new Date(2023, 2))); // March 31st, 2023

        console.log(fd, ld);

        const collectionRef1 = collection(db, 'keeper');
        const q1 = query(
            collectionRef1,
            where('uid', '==', localStorage.getItem("uid")),
            where('category', '==', "支出"),
            where("date", ">=", fd),
            where("date", "<=", ld)
        );
        const snapshot1 = await getDocs(q1);
        const totalAmount = snapshot1.docs.reduce((acc, doc) => acc + doc.data().amount, 0);
        console.log(`Total expenses for March 2023: $${totalAmount}`);

        const results = snapshot1.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        results.forEach(async (result) => {
            console.log(result.amount)
        });

    }

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
    //     getTotal("支出");
    //     getTotal("收入");
    // }, [fd, ld]);

    const fetchTotalCost = (subCategory, setCost) => {
        const q = query(
          collection(db, 'keeper'),
          where('uid', '==', localStorage.getItem("uid")),
          where('category', '==', "支出"),
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
          where('category', '==', "收入"),
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
        fetchTotalCost('飲食', setCostFood);
        fetchTotalCost('交通', setCostTraffic);
        fetchTotalCost('娛樂', setCostPlay);
        fetchTotalCost('其他', setCostOther);
        fetchTotalCost('治裝', setCostApparel);
        fetchTotalCost('居住', setCostHousing);
        fetchTotalCost('教育', setCostEducate);
        fetchTotalCost('儲蓄', setCostSavings);
      }, [fd, ld, costFood, costTraffic, costPlay, costOther, 
        costApparel, costHousing, costEducate, costSavings, localStorage.getItem("uid")]);
      
      useEffect(() => {
        fetchTotalEarn('薪資', setEarnSalary);
        fetchTotalEarn('獲利', setEarnStock);
        fetchTotalEarn('禮物', setEarnGift);
        fetchTotalEarn('其他', setEarnOther);
      }, [fd, ld, earnSalary, earnStock, earnGift, earnOther, localStorage.getItem("uid")]);

    useEffect(() => {
        // totalExpense
        const q = query(
            collection(db, 'keeper'),
            where('uid', '==', localStorage.getItem("uid")),
            where('category', '==', "支出"),
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
            where('category', '==', "收入"),
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
        //     where('category', '==', "支出"),
        //     where('subCategory', '==', "飲食"),
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
        const costFood = parseInt(localStorage.getItem('cost飲食'));
        const costTraffic = parseInt(localStorage.getItem('cost交通'));
        const costPlay = parseInt(localStorage.getItem('cost娛樂'));
        const costOther = parseInt(localStorage.getItem('cost其他'));
        const costApparel = parseInt(localStorage.getItem('cost治裝'));
        const costHousing = parseInt(localStorage.getItem('cost居住'));
        const costEducate = parseInt(localStorage.getItem('cost教育'));
        const costSavings = parseInt(localStorage.getItem('cost儲蓄'));
        const earnStock = parseInt(localStorage.getItem('earn獲利'));
        const earnGift = parseInt(localStorage.getItem('earn禮物'));
        const earnOther = parseInt(localStorage.getItem('earn其他'));

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
         localStorage.getItem("uid"),totalExpense, totalIncome]);


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

        if (!amount) {
            // 使用者輸入欄不能為空
            alert("請輸入金額");
            return;
        }
        if (!category.subType) {
            // 使用者輸入欄不能為空
            alert("請選擇類別");
            return;
        }
        if (category.type === '支出' && category.subType !== '飲食' && category.subType !== '交通' && category.subType !== '娛樂' && category.subType !== '其他'
            && category.subType !== '服飾' && category.subType !== '居住' && category.subType !== '教育' && category.subType !== '儲蓄') {
            alert("請選擇類別");
            return;
        }
        if (category.type === '收入' && category.subType !== '薪資' && category.subType !== '獲利' && category.subType !== '禮物' && category.subType !== '其他') {
            alert("請選擇類別");
            return;
        }

        const docRef = doc(db, "keeper", listId);
        const payload = {
            uid: localStorage.getItem("uid"),
            date: date,
            category: category.type,
            subCategory: category.subType,
            amount: amount,
            memo: description
        }
        await setDoc(docRef, payload);

        setShowEditForm(false);
        setCategory({ type: '支出', subType: '' });
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
                                <option value="支出">支出</option>
                                <option value="收入">收入</option>
                            </select>

                            {category.type === '支出' && (
                                <select className="formSub" value={category.subType} onChange={event => setCategory({ type: category.type, subType: event.target.value })}>
                                    <option value="">選擇類別</option>
                                    <option className="formOp" value="飲食">飲食</option>
                                    <option className="formOp" value="交通">交通</option>
                                    <option className="formOp" value="娛樂">娛樂</option>
                                    <option className="formOp" value="其他">其他</option>

                                    {/* <option className="formOp" value="治裝">治裝</option>
                                            <option className="formOp" value="居住">居住</option>
                                            <option className="formOp" value="教育">教育</option>
                                            <option className="formOp" value="儲蓄">儲蓄</option> */}
                                </select>
                            )}
                            {category.type === '收入' && (
                                <select className="formSub" value={category.subType} onChange={event => setCategory({ type: category.type, subType: event.target.value })}>
                                    <option value="">選擇類別</option>
                                    <option className="formOp" value="薪資">薪資</option>
                                    <option className="formOp" value="獲利">獲利</option>
                                    <option className="formOp" value="其他">其他</option>
                                </select>
                            )}
                            <br />

                            <input
                                className="formNum"
                                type="number"
                                placeholder='金額'
                                // value={amount}
                                onChange={event => setAmount(parseInt(event.target.value))}
                                required
                            />

                            <textarea
                                className="formMemo"
                                type="text"
                                placeholder='備註(0-10字)'
                                maxLength={10}
                                // value={description}
                                onChange={event => setDescription(event.target.value)}
                            />

                            <button className="formBtn2" type="submit">更新</button>
                            {/* <button type="button" onClick={() => setShowForm(false)}>關閉</button> */}
                        </form>
                    </div>
                    <div className="formbkg"></div>
                </div>
            )}

        </div>
    )
}

export default KeeperPage;