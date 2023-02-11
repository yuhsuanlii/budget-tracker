import React, { useState } from 'react';

const BudgetTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState({ type: '支出', subType: '食物' });
    // const [showForm, setShowForm] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const [costs, setCosts] = useState([]); // 設定預算的陣列
    const [budget, setBudget] = useState(0); // 設定預算金額

    const [allocatedBudget, setAllocatedBudget] = useState(0); // 已分配出去的預算
    const [bcategory, setbCategory] = useState({ type: '支出', subType: '食物' });

    const [food, setFood] = useState(0);
    const [traffic, setTraffic] = useState(0);
    const [play, setPlay] = useState(0);
    const [other, setOther] = useState(0);

    const [costFood, setCostFood] = useState(0);
    const [costTraffic, setCostTraffic] = useState(0);
    const [costPlay, setCostPlay] = useState(0);
    const [costOther, setCostOther] = useState(0);

    const [isEditingFood, setIsEditingFood] = useState(false);

    const [selectedBudgetId, setSelectedBudgetId] = useState(null);

    const handleEdit = id => {
        setSelectedBudgetId(id);
    };

    function handleBudget(event) {
        event.preventDefault();
        if (!budget) {
            alert("請輸入完整資料");
            return;
        }
        setCosts([
            ...costs,
            { id: costs.length + 1, budget: parseInt(budget), bcategory }
        ]);

        if (bcategory.type === '支出' && bcategory.subType === '食物') {
            setFood(food + parseInt(budget));
        }
        if (bcategory.type === '支出' && bcategory.subType === '交通') {
            setTraffic(traffic + parseInt(budget));
        }
        if (bcategory.type === '支出' && bcategory.subType === '娛樂') {
            setPlay(play + parseInt(budget));
        }
        if (bcategory.type === '支出' && bcategory.subType === '其他') {
            setOther(other + parseInt(budget));
        }

        setAllocatedBudget(allocatedBudget + parseInt(budget));
        setBudget(0);

    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!amount || !description || !category.subType) {
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

        // setAmount(0);
        setDescription('');
        setCategory({ type: '支出', subType: '食物' });
        // setShowForm(false);
    }

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     if (!amount || !description || !category.subType) {
    //         alert("請輸入完整資料");
    //         return;
    //     }
    //     const costHooks = {
    //         '食物': setCostFood,
    //         '交通': setCostTraffic,
    //         '娛樂': setCostPlay,
    //         '其他': setCostOther,
    //     };

    //     setExpenses([
    //         ...expenses,
    //         { id: expenses.length + 1, amount: parseInt(amount), description, category, date }
    //     ]);

    //     setTotalIncome(totalIncome + (category.type === '收入' ? parseInt(amount) : 0));
    //     setTotalExpense(totalExpense + (category.type === '支出' ? parseInt(amount) : 0));

    //     const hook = costHooks[category.subType];
    //     category.type === '支出' && hook && hook(costFood + parseInt(amount));

    //     setAmount(0);
    //     setDescription('');
    //     setCategory({ type: '支出', subType: '食物' });
    // }


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
            <h1>Expenses</h1>
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

            <br />
            <hr />
            <br />

            <p>剩餘待分配預算：{totalIncome - allocatedBudget}</p>
            <p>剩餘待分配預算new：{totalIncome - food - traffic - play - other}</p>

            <form onSubmit={handleBudget}>
                分配預算：
                <label value={bcategory.type} onChange={event => setbCategory({ type: event.target.value, subType: bcategory.subType })}>
                    <label value="支出"></label>
                </label>
                {bcategory.type === '支出' && (
                    <select value={bcategory.subType} onChange={event => setbCategory({ type: bcategory.type, subType: event.target.value })}>
                        {/* <option value="">選擇類別</option> */}
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
            </form>

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
                    // <input onChange={setIsEditingFood(true)}>{food}</input>
                )} 已使用：{costFood} 剩餘：{food - costFood}
            </p>

            <p>食物｜預算：
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
            </p>
            <p>交通｜預算：{traffic} 已使用：{costTraffic} 剩餘：{traffic - costTraffic}</p>
            <p>娛樂｜預算：{play} 已使用：{costPlay} 剩餘：{play - costPlay}</p>
            <p>其他｜預算：{other} 已使用：{costOther} 剩餘：{other - costOther}</p>

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

export default BudgetTracker;
