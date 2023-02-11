import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { BudgetTrackerProvider, useBudgetTracker } from '../hooks/useBudgetTracker';
import '../style/progressBar.css'
import Home from './home';

const Tracker = () => {

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


    // const handleEdit = id => {
    //     setSelectedBudgetId(id);
    // };

    // function handleBudget(event) {
    //     event.preventDefault();
    //     if (!budget) {
    //         alert("請輸入完整資料");
    //         return;
    //     }
    //     setCosts([
    //         ...costs,
    //         { id: costs.length + 1, budget: parseInt(budget), bcategory }
    //     ]);

    //     if (bcategory.type === '支出' && bcategory.subType === '食物') {
    //         setFood(food + parseInt(budget));
    //     }
    //     if (bcategory.type === '支出' && bcategory.subType === '交通') {
    //         setTraffic(traffic + parseInt(budget));
    //     }
    //     if (bcategory.type === '支出' && bcategory.subType === '娛樂') {
    //         setPlay(play + parseInt(budget));
    //     }
    //     if (bcategory.type === '支出' && bcategory.subType === '其他') {
    //         setOther(other + parseInt(budget));
    //     }

    //     setAllocatedBudget(allocatedBudget + parseInt(budget));
    //     setBudget(0);

    // }
    return (
        <div>

            <Home />
            <Link to="/"><button>Home</button></Link>
            <Link to="/keeper"><button>Keeper</button></Link>

            <h1>Tracker</h1>
            {/* <p>剩餘待分配預算：{totalIncome - allocatedBudget}</p> */}
            <p>剩餘待分配預算：{totalIncome - food - traffic - play - other}</p>

            {/* <form onSubmit={handleBudget}>
                分配預算：
                <label value={bcategory.type} onChange={event => setbCategory({ type: event.target.value, subType: bcategory.subType })}>
                    <label value="支出"></label>
                </label>
                {bcategory.type === '支出' && (
                    <select value={bcategory.subType} onChange={event => setbCategory({ type: bcategory.type, subType: event.target.value })}>
                        <option value="食物">食物</option>
                        <option value="交通">交通</option>
                        <option value="娛樂">娛樂</option>
                        <option value="其他">其他</option>
                    </select>
                )}
                <input
                    type="number"
                    value={budget}
                    onChange={event => setBudget(event.target.value)}
                />
                <button type="submit">設定預算</button>
            </form> */}

            <p>食物｜預算：
                {isEditingFood ? (
                    <>
                        <input
                            type="number"
                            value={food}
                            onChange={event => setFood(event.target.value)}
                        />
                        <button onClick={() => setIsEditingFood(null)}>確認</button>
                    </>
                ) : (
                    <span onClick={() => setIsEditingFood(true)}>{food}</span>
                )} 已使用：{costFood} 剩餘：{food - costFood}
            </p>

            {/* <div className='hide'>
                <div className='pfood'>
                    <div className="progress">
                        <div className='bar'>
                            <div className="data">50%</div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="progress-bar">
                <span className="progress-bar__inner" style={{ width: ((costFood / food) * 100) * 3 }}>
                    <span className='progress-bar__percent'>{Math.round((costFood / food) * 100)}%</span>
                </span>
            </div>

            <p>交通｜預算：
                {isEditingTraffic ? (
                    <>
                        <input
                            type="number"
                            value={traffic}
                            onChange={event => setTraffic(event.target.value)}
                        />
                        <button onClick={() => setIsEditingTraffic(null)}>確認</button>
                    </>
                ) : (
                    <span onClick={() => setIsEditingTraffic(true)}>{traffic}</span>
                )} 已使用：{costTraffic} 剩餘：{traffic - costTraffic}
            </p>

            <div className="progress-bar">
                <span className="progress-bar__inner" style={{ width: ((costTraffic / traffic) * 100) * 3 }}>
                    <span className='progress-bar__percent'>{Math.round((costTraffic / traffic) * 100)}%</span>
                </span>
            </div>

            <p>娛樂｜預算：
                {isEditingPlay ? (
                    <>
                        <input
                            type="number"
                            value={play}
                            onChange={event => setPlay(event.target.value)}
                        />
                        <button onClick={() => setIsEditingPlay(null)}>確認</button>
                    </>
                ) : (
                    <span onClick={() => setIsEditingPlay(true)}>{play}</span>
                )} 已使用：{costPlay} 剩餘：{play - costPlay}
            </p>

            <div className="progress-bar">
                <span className="progress-bar__inner" style={{ width: ((costPlay / play) * 100) * 3 }}>
                    <span className='progress-bar__percent'>{Math.round((costPlay / play) * 100)}%</span>
                </span>
            </div>

            <p>其他｜預算：
                {isEditingOther ? (
                    <>
                        <input
                            type="number"
                            value={other}
                            onChange={event => setOther(event.target.value)}
                        />
                        <button onClick={() => setIsEditingOther(null)}>確認</button>
                    </>
                ) : (
                    <span onClick={() => setIsEditingOther(true)}>{other}</span>
                )} 已使用：{costOther} 剩餘：{other - costOther}
            </p>

            <div className="progress-bar">
                <span className="progress-bar__inner" style={{ width: ((costOther / other) * 100) * 3 }}>
                    <span className='progress-bar__percent'>{Math.round((costOther / other) * 100)}%</span>
                </span>
            </div>

            {/* <p>食物｜預算：
                {selectedBudgetId === "food" ? (
                    <>
                        <input
                            type="number"
                            value={food}
                            onChange={event => setFood(event.target.value)}
                        />
                        <button onClick={() => setSelectedBudgetId(null)}>確認</button>
                    </>
                ) : (
                    <>
                        {food}
                        <button onClick={() => handleEdit("food")}>修改</button>
                    </>
                )}
                已使用：{costFood} 剩餘：{food - costFood}
            </p> */}

            {/* <p>交通｜預算：{traffic} 已使用：{costTraffic} 剩餘：{traffic - costTraffic}</p>
            <p>娛樂｜預算：{play} 已使用：{costPlay} 剩餘：{play - costPlay}</p>
            <p>其他｜預算：{other} 已使用：{costOther} 剩餘：{other - costOther}</p> */}

            {/* <ul>
                {costs.map((cost, index) => (
                    <li key={index}>
                        預算{cost.bcategory.subType} : {cost.budget}
                    </li>
                ))}
            </ul> */}


        </div>
    );

};

export default Tracker;
