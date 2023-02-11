import React from "react";
import '../style/keeperPage.css'
import Home from "../components/navbar";
import KeeperForm from "../components/keeperForm";
import { Link } from "react-router-dom";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { FaBarcode, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const KeeperPage = () => {

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
        setShowForm(true);
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
            <Home />
            <KeeperForm/>
            <div className="receiptContainer">
                <div></div>
                <div>
                    <div class="klist">
                        <div class="tab"></div>
                        <div class="paid"><p>Receipt Paid successfully</p></div>
                        <div class="receipt">
                            <div class="paper">
                                <div class="title">Account Book</div>
                                <button class="excel">Export Excel</button>
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
                                <table className="table">
                                    <tbody>
                                        {/* <tr><td>2 x Coffee</td><td class="right">$10</td></tr>
                                        <tr><td>1 x Rice</td><td class="right">$30</td></tr>
                                        <tr><td>5 x Milk</td><td class="right">$90</td></tr> */}
                                        <tr>
                                            {expenses.map((expense, index) => (
                                                <li key={index} className="lilist">
                                                    <div className="list">
                                                        <div>Day {expense.date.substring(8, 10)}</div>
                                                        <div>{expense.category.type}</div>
                                                        <div>{expense.category.subType}</div>
                                                        <div>$ {expense.amount}</div>
                                                        <div className="description">{expense.description}</div>
                                                        <div><FaPencilAlt className="listEdit" size={25} color='#698269' onClick={() => handleUpdate(expense)} /></div>
                                                        <div>
                                                            <FaTrashAlt className="listDelete" size={25} color='#AA5656' onClick={() => handleDelete(expense)} />
                                                        </div>
                                                    </div>
                                                </li>

                                            ))}
                                        </tr>
                                    </tbody>
                                    <tr><td colspan="2" class="center">
                                        <Link to="/tracker">
                                            <input className="tnbtn" type="button" value="Track Now" />
                                        </Link>
                                    </td></tr>
                                </table>
                                <div class="sign center">
                                    {/* <div class="barcode"></div> */}
                                    <FaBarcode size={40} /><FaBarcode size={40} /><FaBarcode size={40} /><FaBarcode size={40} />
                                    <br />
                                    <span className="barcode">00020230223000</span>
                                    <br />
                                    <div class="thankyou">
                                        Thank you for your purchase
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