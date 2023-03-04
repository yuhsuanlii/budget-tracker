import React from "react";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const EarnChart = () => {
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

    let totalEarn = earnSalary + earnStock + earnGift + earnOther;
    const data = {
        labels: ['薪資', '獲利', '禮物', '其他'],
        datasets: [
            {
                label: ' $ ',
                data: [earnSalary, earnStock, earnGift, earnOther],
                backgroundColor: ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1'],
                hoverBackgroundColor: ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1'],
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
            {totalEarn > 0 ? (
                <Pie data={data} options={options} className='pieChart' />
            ) : (
                <div className="nodata">No data to display</div>
            )}
        </div>
    )
}

export default EarnChart;