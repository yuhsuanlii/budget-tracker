import React from "react";
import '../style/keeperForm.css';
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";

const KeeperForm = () => {

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
            alert("請輸入金額");
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
        setShowForm(false);
    }

    return (
        <div>
            <div className="keeperContainer">
                <div></div>
                <div>
                    <span className="kmonth">
                        <BsCaretLeftFill  size={30} />
                        &nbsp;{date.substring(0, 7)}&nbsp;
                        <BsCaretRightFill size={30} />
                    </span>
                    <button className="kbtn" onClick={() => setShowForm(!showForm)}>
                        {showForm ? '關閉介面' : '新增一筆'}
                    </button>

                    {showForm && (

                        <div>
                            <div className="kform">
                                <div className="dashTop"></div>
                                <form onSubmit={handleSubmit}>
                                    <input className="formDate" type="date" value={date} onChange={event => setDate(event.target.value)} />
                                    <br />
                                    <select className="formCat" value={category.type} onChange={event => setCategory({ type: event.target.value, subType: category.subType })}>
                                        <option value="收入">收入</option>
                                        <option value="支出">支出</option>
                                    </select>

                                    {category.type === '收入' && (
                                        <select className="formSub" value={category.subType} onChange={event => setCategory({ type: category.type, subType: event.target.value })}>
                                            {/* <option value="">選擇類別</option> */}
                                            <option className="formOp" value="薪資">薪資</option>
                                            <option className="formOp" value="其他">其他</option>
                                        </select>
                                    )}

                                    {category.type === '支出' && (
                                        <select className="formSub" value={category.subType} onChange={event => setCategory({ type: category.type, subType: event.target.value })}>
                                            {/* <option value="">選擇類別</option> */}
                                            <option className="formOp" value="食物">食物</option>
                                            <option className="formOp" value="交通">交通</option>
                                            <option className="formOp" value="娛樂">娛樂</option>
                                            <option className="formOp" value="其他">其他</option>
                                        </select>
                                    )}
                                    <br />

                                    <input
                                        className="formNum"
                                        type="number"
                                        placeholder='金額'
                                        value={amount}
                                        onChange={event => setAmount(event.target.value)}
                                        required
                                    />

                                    <textarea
                                        className="formMemo"
                                        type="text"
                                        placeholder='備註'
                                        maxLength={12}
                                        value={description}
                                        onChange={event => setDescription(event.target.value)}
                                    />

                                    <button className="formBtn" type="submit">送出</button>
                                    {/* <button type="button" onClick={() => setShowForm(false)}>關閉</button> */}
                                </form>
                                <div className="dashBottom"></div>
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