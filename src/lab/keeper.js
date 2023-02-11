import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { BudgetTrackerProvider, useBudgetTracker } from '../hooks/useBudgetTracker';
import Home from './home';

const Keeper = () => {

    const {
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

    function handleSubmit(event) {
        event.preventDefault();
        if (!amount || !category.subType) {
            // 使用者輸入欄不能為空
            alert("請輸入完整資料");
            return;
        }
        // 繼續提交表單
        setExpenses([
            ...expenses,
            { id: expenses.length + 1, amount: parseInt(amount), description, category, date }
        ]);

        if (category.type === '收入') {
            setTotalIncome(totalIncome + parseInt(amount));
        } else {
            setTotalExpense(totalExpense + parseInt(amount));
        }

        if (category.type === '支出' && category.subType === '食物') {
            setCostFood(costFood + parseInt(amount));
        }
        if (category.type === '支出' && category.subType === '交通') {
            setCostTraffic(costTraffic + parseInt(amount));
        }
        if (category.type === '支出' && category.subType === '娛樂') {
            setCostPlay(costPlay + parseInt(amount));
        }
        if (category.type === '支出' && category.subType === '其他') {
            setCostOther(costOther + parseInt(amount));
        }

        setAmount(0);
        setDescription('');
        setCategory({ type: '支出', subType: '食物' });
        // setShowForm(false);
    }


    function handleUpdate(expense) {
        setExpenses(
            expenses.map(e => (e.id === expense.id ? { ...e, amount: '', description: '', category: '', date: '' } : e))
        );
        setExpenses(expenses.filter(e => e.id !== expense.id));


        if (expense.category.type === '收入') {
            setTotalIncome(totalIncome - expense.amount);
        } else {
            setTotalExpense(totalExpense - expense.amount);
            if (expense.category.type === '支出' && expense.category.subType === '食物') {
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
        // setShowForm(true);
    }

    function handleDelete(expense) {
        setExpenses(expenses.filter(e => e.id !== expense.id));

        if (expense.category.type === '收入') {
            setTotalIncome(totalIncome - expense.amount);
        } else {
            setTotalExpense(totalExpense - expense.amount);
            if (expense.category.type === '支出' && expense.category.subType === '食物') {
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

            <Home/>
            <Link to="/"><button>Home</button></Link>
            <Link to="/tracker"><button>Tracker</button></Link>

            <h1>Keeper</h1>
            <p>收入 - 支出 = 預算</p>
            <p>Total Income: {totalIncome}</p>
            <p>Total Expense: {totalExpense}</p>
            <p>Total: {totalIncome - totalExpense}</p>

            {/* <button onClick={() => setShowForm(!showForm)}>
                {showForm ? '關閉' : '新增'}
            </button> */}
            {/* {showForm && ( */}
            <form onSubmit={handleSubmit}>
                <input type="date" value={date} onChange={event => setDate(event.target.value)} />
                <select value={category.type} onChange={event => setCategory({ type: event.target.value, subType: category.subType })}>
                    <option value="收入">收入</option>
                    <option value="支出">支出</option>
                </select>
                {category.type === '收入' && (
                    <select value={category.subType} onChange={event => setCategory({ type: category.type, subType: event.target.value })}>
                        {/* <option value="">選擇類別</option> */}
                        <option value="薪資">薪資</option>
                        <option value="其他">其他</option>
                    </select>
                )}
                {category.type === '支出' && (
                    <select value={category.subType} onChange={event => setCategory({ type: category.type, subType: event.target.value })}>
                        {/* <option value="">選擇類別</option> */}
                        <option value="食物">食物</option>
                        <option value="交通">交通</option>
                        <option value="娛樂">娛樂</option>
                        <option value="其他">其他</option>
                    </select>
                )}
                <input
                    type="text"
                    placeholder='MEMO'
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
                <input
                    type="number"
                    value={amount}
                    onChange={event => setAmount(event.target.value)}
                />
                <button type="submit">送出</button>
                {/* <button type="button" onClick={() => setShowForm(false)}>關閉</button> */}
            </form>

            {/* )} */}

            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        {expense.date} - {expense.category.type} - {expense.category.subType} - {expense.description} : {expense.amount} -----
                        <button onClick={() => handleUpdate(expense)}>修改</button>
                        <button onClick={() => handleDelete(expense)}>刪除</button>
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
};

export default Keeper;
