import React from "react";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const CostChart = () => {
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

        apparel, setApparel,
        housing, setHousing,
        educate, setEducate,
        savings, setSavings,

        earnSalary, setEarnSalary,
        earnStock, setEarnStock,
        earnGift, setEarnGift,
        earnOther, setEarnOther } = useBudgetTracker();

    let totalCost = costFood + costTraffic + costPlay + costOther + costApparel + costHousing + costEducate + costSavings;
    const data = {
        labels: ['飲食', '治裝', '居住', '交通', '教育', '娛樂', '儲蓄', '其他'],
        datasets: [
            {
                label: ' $ ',
                data: [costFood, costApparel, costHousing, costTraffic, costEducate, costPlay, costSavings, costOther],
                backgroundColor: ['#753422', '#B05B3B', '#D79771', '#FAD6A5',
                    '#7D5A50', '#B4846C', '#E5B299', '#FDF0E0'],
                hoverBackgroundColor: ['#753422', '#B05B3B', '#D79771', '#FAD6A5',
                    '#7D5A50', '#B4846C', '#E5B299', '#FDF0E0'],
                borderWidth: 0,
                hoverOffset: 30,

                // hoverBorderWidth: 5,
                // hoverBackgroundColor: '#FAFAF9',
                // hoverBorderColor:['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left',
                labels: {
                    // This more specific font property overrides the global property
                    // padding: 10,
                    // textAlign: 'left',
                    font: {
                        size: 16,
                        weight: 'bold',
                    },
                },
            },
        },
    };

    return (
        <div>
            {totalCost > 0 ? (
                <Pie data={data} options={options} className='pieChart' />
            ) : (
                <div className="nodata">No data to display</div>
            )}
        </div>
    )
}

export default CostChart;