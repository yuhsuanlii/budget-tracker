import React, { useState, useEffect, useContext } from "react";
import '../style/keeperForm.css';
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";
import { db } from '../firebase';
import { addDoc, collection } from "firebase/firestore";
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { onSnapshot, where, query, deleteDoc, getDocs } from "firebase/firestore";


const KeeperForm = () => {

    const {
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
        costOther, setCostOther } = useBudgetTracker();

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const [firstDay, setFirstDay] = useState(() => {
        const now = new Date(date);
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        return formatDate(firstDay);
    });

    const [lastDay, setLastDay] = useState(() => {
        const now = new Date(date);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return formatDate(lastDay);
    });

    const handlePrevMonth = () => {
        const prevMonth = new Date(date);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        // setDate(prevMonth.toISOString().substring(0, 10));

        const firstDay = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1);
        const lastDay = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0);

        setDate(formatDate(prevMonth))
        setFirstDay(formatDate(firstDay));
        setLastDay(formatDate(lastDay))
        // console.log(formatDate(firstDay),formatDate(lastDay))
        return formatDate(firstDay), formatDate(lastDay);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(date);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        // setDate(nextMonth.toISOString().substring(0, 10));

        const firstDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
        const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
        setDate(formatDate(nextMonth));
        setFirstDay(formatDate(firstDay));
        setLastDay(formatDate(lastDay))
        // console.log(formatDate(firstDay),formatDate(lastDay))
        return formatDate(firstDay), formatDate(lastDay);
    };

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
    //     setShowForm(false);
    // }

    // useEffect(() => {
    //     const fetchTotalIncome = async () => {
    //         const totalIncomeDocRef = doc(db, "totalIncome", localStorage.getItem("uid"));
    //         const totalIncomeDocSnap = await getDoc(totalIncomeDocRef);

    //         if (totalIncomeDocSnap.exists()) {
    //             setTotalIncome(totalIncomeDocSnap.data().total);
    //         }
    //     };

    //     fetchTotalIncome();
    // }, []);

    useEffect(() => {

        console.log(firstDay, lastDay);

        localStorage.setItem("firstDay", firstDay);
        localStorage.setItem("lastDay", lastDay);

        localStorage.getItem('firstDay')

        const q = query(
            collection(db, 'keeper'),
            where('uid', '==', localStorage.getItem("uid")),
            where('date', '>=', localStorage.getItem('firstDay')),
            where('date', '<=', localStorage.getItem('lastDay')),
        );

        // const unsubscribe = 
        onSnapshot(q, (snapshot) => {
            setExpenses(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        // const totalExpense1 = expenses
        //     .filter((expense) => expense.category === "支出")
        //     .reduce((total, expense) => total + expense.amount, 0);


        // console.log(totalExpense1);

        // setExpenses(expenses);
        // setTotalExpense(totalExpense);
        // setTotalIncome(totalIncome);

        // return unsubscribe;
        setDate(date);

    }, [(localStorage.getItem("uid")), date, firstDay, lastDay]);


    useEffect(() => {
        const firstDay = localStorage.getItem('firstDay');
        const uid = localStorage.getItem('uid');

        if (firstDay && uid) {
            const docId = firstDay + uid;
            const totalRef = doc(db, "total", docId);
            const data = {
                totalExpense: 0,
                totalIncome: 0,
                costFood: 0,
                costTraffic: 0, 
                costPlay: 0,
                costOther: 0,
                costApparel: 0,
                costHousing: 0, 
                costEducate: 0, 
                costSavings: 0,
                earnSalary: 0,
                earnStock: 0,
                earnGift: 0,
                earnOther: 0
            };

            getDoc(totalRef)
                .then((totalDocSnapshot) => {
                    if (totalDocSnapshot.exists()) {
                        console.log("Document exists with data:", totalDocSnapshot.data());
                        setTotalExpense(totalDocSnapshot.data().totalExpense);
                        setTotalIncome(totalDocSnapshot.data().totalIncome);
                        setCostFood(totalDocSnapshot.data().costFood);
                    } else {
                        setDoc(totalRef, data)
                            .then(() => console.log("Document created successfully!"))
                            .catch((error) => console.error("Error creating document: ", error));
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
                });
        }
    }, [(localStorage.getItem("uid")), date, firstDay, lastDay]);


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

    const handleSubmit = async (event) => {

        event.preventDefault();
        if (!amount || isNaN(amount) || amount === "") {
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
            && category.subType !== '治裝' && category.subType !== '居住' && category.subType !== '教育' && category.subType !== '儲蓄') {
            alert("請選擇類別");
            return;
        }
        if (category.type === '收入' && category.subType !== '薪資' && category.subType !== '獲利' && category.subType !== '禮物' && category.subType !== '其他') {
            alert("請選擇類別");
            return;
        }

        const collectionRef = collection(db, "keeper");
        const payload = {
            uid: localStorage.getItem("uid"),
            date: date,
            category: category.type,
            subCategory: category.subType,
            amount: parseInt(amount),
            memo: description
        }
        // const docRef = 
        await addDoc(collectionRef, payload);
        // console.log(docRef.id);


        // 取得 total 文件的 docRef
        // const totalDocId = localStorage.getItem("firstDay") + localStorage.getItem("uid");
        // const totalDocRef = doc(db, "total", totalDocId);

        // // 取得原本的 total 文件資料
        // const totalDocSnapshot = await getDoc(totalDocRef);
        // let totalData;
        // if (totalDocSnapshot.exists()) {
        //     totalData = totalDocSnapshot.data();
        // } else {
        //     // 如果 total 文件不存在，則新增一個
        //     totalData = {
        //         totalExpense: 0,
        //         totalIncome: 0,
        //     };
        //     await setDoc(totalDocRef, totalData);
        // }

        // // 更新 total 文件
        // if (category.type === '支出') {
        //     totalData.totalExpense += Number(amount);
        // } else {
        //     totalData.totalIncome += Number(amount);
        // }
        // await updateDoc(totalDocRef, totalData);

        // original code
        
        // const docId = localStorage.getItem("firstDay") + localStorage.getItem("uid")
        // const totalRef = doc(db, "total", docId);
        // if(category.type === "支出"){
        //     const payloadTotal = {
        //         totalExpense: amount
        //     }
        //     await updateDoc(totalRef, payloadTotal);
        // }else if(category.type === "收入"){
        //     const payloadTotal = {
        //         totalIncome: amount
        //     }
        //     await updateDoc(totalRef, payloadTotal);
        // }

        const year = date.split("-")[0];
        const month = date.split("-")[1];
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);

        setAmount('');
        setDescription('');
        setCategory({ type: '支出', subType: '' });
        setShowForm(false);
        setFirstDay(formatDate(firstDay));
        setLastDay(formatDate(lastDay));
    }

    const handleClean = async () => {
        setShowEditForm(false);
        setShowForm(!showForm);
        setDate(new Date().toISOString().substring(0, 10));
        setCategory({ type: '支出', subType: '' });
        setAmount('');
        setDescription('');
    }

    return (
        <div>
            <div className="keeperContainer">
                <div></div>
                <div className="kb">
                    <span className="kmonth">
                        <BsCaretLeftFill className="preMonth" size={30} onClick={handlePrevMonth} />
                        &nbsp;{date.substring(0, 7)}&nbsp;
                        {/* &nbsp;{(localStorage.getItem('firstDay')).substring(0, 7)}&nbsp; */}
                        <BsCaretRightFill className="nextMonth" size={30} onClick={handleNextMonth} />
                    </span>
                    {/* <button className="kbtn" onClick={() => setShowForm(!showForm)}> */}

                    <button className="kbtn" onClick={handleClean}>
                        {showForm ? '新增一筆' : '新增一筆'}
                    </button>

                    {showForm && (
                        <div>
                            <div className="kform">
                                <button className="closeWindow" onClick={() => setShowForm(false)}>X</button>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        className="formDate"
                                        type="date"
                                        value={date}
                                        min="2020-01-01"
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
                                            <option className="formOp" value="治裝">治裝</option>
                                            <option className="formOp" value="居住">居住</option>
                                            <option className="formOp" value="交通">交通</option>
                                            <option className="formOp" value="教育">教育</option>
                                            <option className="formOp" value="娛樂">娛樂</option>
                                            <option className="formOp" value="儲蓄">儲蓄</option>
                                            <option className="formOp" value="其他">其他</option>
                                        </select>
                                    )}
                                    {category.type === '收入' && (
                                        <select className="formSub" value={category.subType} onChange={event => setCategory({ type: category.type, subType: event.target.value })}>
                                            <option value="">選擇類別</option>
                                            <option className="formOp" value="薪資">薪資</option>
                                            <option className="formOp" value="獲利">獲利</option>
                                            <option className="formOp" value="禮物">禮物</option>
                                            <option className="formOp" value="其他">其他</option>
                                        </select>
                                    )}
                                    <br />

                                    <input
                                         className="formNum"
                                         type="text"
                                         value={amount}
                                         placeholder='金額'
                                         minLength={1} maxLength={8}
                                         onChange={event => setAmount(parseInt(event.target.value))}
                                         required
                                    />

                                    <textarea
                                        className="formMemo"
                                        type="text"
                                        placeholder='備註(0-10字)'
                                        maxLength={10}
                                        value={description}
                                        onChange={event => setDescription(event.target.value)}
                                    />

                                    <button className="formBtn" type="submit">新增</button>
                                    {/* <button type="button" onClick={() => setShowForm(false)}>關閉</button> */}
                                </form>
                            </div>
                            <div className="formbkg"></div>
                        </div>
                    )}
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default KeeperForm;