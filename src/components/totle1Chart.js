import React from "react";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import Chart from 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";


const Totle1Chart = () => {
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

    let totalCost = costFood + costTraffic + costPlay + costOther;

    const data = {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
        datasets: [
            {
                type: 'line',
                label: '月結餘',
                data: [170, 400, 250, 300, 80, 130],
                backgroundColor: '#562B08aa',
                borderWidth: 3,
                borderColor: '#562B08',
                pointBorderWidth: 7,
                pointHoverBorderWidth: 10,
            },
            {
                type: 'bar',
                label: '總收入',
                data: [550, 800, 750, 900, 450, 760],
                backgroundColor: '#61876Eaa',
                hoverBackgroundColor: '#61876E',
                borderWidth: 3,
                borderColor: '#61876Eaa',
            },
            {
                type: 'bar',
                label: '總支出',
                data: [745, 677, 583, 267, 599, 900],
                backgroundColor: '#B05B3Baa',
                hoverBackgroundColor: '#B05B3B',
                borderWidth: 3,
                borderColor: '#B05B3Baa',
            },

        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
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
            {/* {totalCost > 0 ? ( */}
            <Bar data={data} options={options} />
            {/* <Line data={data} options={options} /> */}
            {/* ) : (
                <div className="nodata2">No data to display</div>
            )} */}
        </div>
    )
}

export default Totle1Chart;