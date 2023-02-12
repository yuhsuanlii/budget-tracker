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

    const handlePrevMonth = () => {
        const prevMonth = new Date(date);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setDate(prevMonth.toISOString().substring(0, 10));
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(date);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setDate(nextMonth.toISOString().substring(0, 10));
    };

    function handleSubmit(event) {
        event.preventDefault();
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

        if (category.type === '支出' && category.subType !== '飲食' && category.subType !== '交通' && category.subType !== '娛樂' && category.subType !== '其他') {
            alert("請選擇類別");
            return;
        }

        if (category.type === '收入' && category.subType !== '薪資' && category.subType !== '獲利' && category.subType !== '其他') {
            alert("請選擇類別");
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

        if (category.type === '支出' && category.subType === '飲食') {
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

        setAmount('');
        setDescription('');
        setCategory({ type: '支出', subType: '' });
        setShowForm(false);
    }

    return (
        <div>
            <div className="keeperContainer">
                <div></div>
                <div className="kb">
                    <span className="kmonth">
                        <BsCaretLeftFill className="preMonth" size={30} onClick={handlePrevMonth} />
                        &nbsp;{date.substring(0, 7)}&nbsp;
                        <BsCaretRightFill className="nextMonth" size={30} onClick={handleNextMonth} />
                    </span>
                    <button className="kbtn" onClick={() => setShowForm(!showForm)}>
                        {showForm ? '關閉介面' : '新增一筆'}
                    </button>

                    {showForm && (

                        <div>
                            <div className="kform">
                                <form onSubmit={handleSubmit}>
                                    <input className="formDate" type="date" value={date} onChange={event => setDate(event.target.value)} />
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